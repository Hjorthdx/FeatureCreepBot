import { Discord, Slash, SlashGroup, SlashOption, On, ArgsOf } from 'discordx';
import { Client, CommandInteraction, TextChannel, VoiceState } from 'discord.js';
import axios from 'axios';
import PomodoroManager, { PomodoroError } from '../application/pomodoroManager';
import PomodoroTimer from '../application/pomodoroTimer';
import Timer from '../application/timer';

@Discord()
@SlashGroup('pomodoro')
export class Pomodoro {
	pomodoroManager = new PomodoroManager();
	groupSize = 1; // Update when done.
	lastMessageSent: Date | undefined;

	@On('voiceStateUpdate')
	async onVoiceStateUpdate([oldVoiceState, newVoiceState]: ArgsOf<'voiceStateUpdate'>, client: Client) {
		if (!this.isTimeForPomodoro(oldVoiceState, newVoiceState)) {
			console.log('It is not time for a pomodoro');
			return;
		}

		const currentGuild = client.guilds.cache.find((guild) => guild.id === newVoiceState.guild.id);
		if (currentGuild === undefined) {
			return;
		}
		const firstTextChannel = currentGuild.channels.cache.find((channel) => channel.type === 'GUILD_TEXT') as TextChannel;
		console.log(this.shouldAReminderBeSent());
	}

	// Remember to add this again
	// !await this.isScheduleBooked()
	isTimeForPomodoro = (oldVoiceState: VoiceState, newVoiceState: VoiceState) => {
		return (
			!oldVoiceState.channel &&
			newVoiceState.channel &&
			newVoiceState.channel!.members.size >= this.groupSize
		);
	};

	shouldAReminderBeSent = () => {
		if (this.lastMessageSent) {
			const futureTime = new Date();
			futureTime.setMinutes(this.lastMessageSent.getMinutes() + 1);
			if (new Date(Date.now()) >= futureTime) {
				this.lastMessageSent = new Date(Date.now());
				return true;
			} else {
				return false;
			}
		} else {
			this.lastMessageSent = new Date(Date.now());
			return true;
		}
	}

	/*
	// Make env file work and insert link here.
	isScheduleBooked = async () => {
		const response = await axios.get('');
		if (response.status === 200) {
			console.log(response.data)
			return response.data;
		} else {
			console.log('The api did not return status code 200');
			return false;
		}
	};*/

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
