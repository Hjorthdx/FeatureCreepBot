import { Discord, Slash, SlashGroup, SlashOption, On, ArgsOf } from 'discordx';
import { Client, CommandInteraction, TextChannel, VoiceState } from 'discord.js';
import PomodoroManager, { PomodoroError } from '../application/pomodoroManager';
import PomodoroTimer from '../application/pomodoroTimer';
import Timer from '../application/timer';

@Discord()
@SlashGroup('pomodoro')
export class Pomodoro {
	pomodoroManager = new PomodoroManager();

	@On('voiceStateUpdate')
	async onVoiceStateUpdate([oldVoiceState, newVoiceState]: ArgsOf<'voiceStateUpdate'>, client: Client) {
		// Not done yet.
		if (oldVoiceState.channel === undefined && newVoiceState.channel !== undefined) {
			return;
		}
		// Just testing stuff here to see how to find things.
		// Seems to be able to send a message like this.
		// Insert again when .env works =)
		const myGuild = client.guilds.cache.find(guild => guild.id === '');
		if (myGuild === undefined) {
			return;
		}
		const myChannel = myGuild.channels.cache.find(channel => channel.id === '') as TextChannel;
		if (myChannel === undefined) {
			return;
		}
		myChannel.send('Test');
		
	}

	@Slash('start', { description: 'Start a new pomodoro' })
	async start(
		@SlashOption('worklength', { description: 'Work duration in minutes', required: true }) workDuration: number,
		@SlashOption('breaklength', { description: 'Break duration in minutes', required: true }) breakDuration: number,
		interaction: CommandInteraction
	) {
		const newPomodoro: PomodoroTimer | PomodoroError = this.pomodoroManager.startNewPomodoro(workDuration, breakDuration);
		if ('error' in newPomodoro) {
			await interaction.reply(`Error occured! ${newPomodoro.error}`);
			return;
		}
		await interaction.reply(`Pomodoro started with work duration: ${workDuration} and break duration: ${breakDuration}!`);
		await newPomodoro.startWorkTimer();
		let firstRun = true;
		const x = setInterval(async () => {
			if (newPomodoro.isBreakTimerOver()) {
				await interaction.editReply(`Break is now over =)`);
				clearInterval(x);
			} else if (newPomodoro.isWorkTimerOver()) {
				// Needs a first run bool else I have to start a timer every time? That's so ugly...
				if (firstRun) {
					newPomodoro.startBreakTimer();
					firstRun = false;
				}
				await interaction.editReply(
					`Time left of current break timer: ${this.getFormattedDateString(newPomodoro.breakTimer)}`
				);
			} else {
				await interaction.editReply(
					`Time left of current work timer: ${this.getFormattedDateString(newPomodoro.workTimer)}`
				);
			}
		}, 1000);
	}

	getFormattedDateString = (timer: Timer) => timer.getRemainingTime().toISOString().substring(11, 19);

	@Slash('break', { description: 'Starts a break. Useful when only a single timer is needed' })
	async break(
		@SlashOption('breaklength', { description: 'Break duration in minutes' }) breakDuration: number,
		interaction: CommandInteraction
	) {
		const newBreak = this.pomodoroManager.startNewBreak(breakDuration);
		if ('error' in newBreak) {
			await interaction.reply(`Error occured!\n${newBreak.error}`);
			return;
		}
		await interaction.reply('Break started!');
		await newBreak.start();
		// Play sound here when implemented =)

		await interaction.followUp('Break ended!');
	}
}
