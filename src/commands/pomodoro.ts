import { Discord, Slash, SlashGroup, SlashOption, On, ArgsOf } from 'discordx';
import { Client, CommandInteraction, TextChannel, VoiceState, VoiceChannel } from 'discord.js';
import axios from 'axios';
import PomodoroManager, { PomodoroError } from '../application/pomodoroManager';
import PomodoroTimer from '../application/pomodoroTimer';
import Timer from '../application/timer';

@Discord()
@SlashGroup('pomodoro')
export class Pomodoro {
	pomodoroManager = new PomodoroManager();
	groupSize = 3; // Update when done.
	lastMessageSent: Date | undefined;

	@On('voiceStateUpdate')
	async onVoiceStateUpdate([oldVoiceState, newVoiceState]: ArgsOf<'voiceStateUpdate'>, client: Client) {
		if (!this.isTimeForPomodoro(oldVoiceState, newVoiceState)) {
			console.log('It is not time for a pomodoro');
			return;
		}

		if (this.shouldAReminderBeSent()) {
			const currentGuild = client.guilds.cache.find((guild) => guild.id === newVoiceState.guild.id);
			if (currentGuild === undefined) {
				return;
			}
			const firstTextChannel = currentGuild.channels.cache.find((channel) => channel.type === 'GUILD_TEXT') as TextChannel;

			firstTextChannel.send(
				'Possible pomodoro opportunity!\nUse /pomodoro start "work length" "break length" to start a pomodoro!'
			);
		}
	}

	// Remember to add this again
	// !await this.isScheduleBooked()
	// Checks if newVoiceState.channel is not null because else the function can return null instead of a boolean.
	// I'm not sure if I can do anything about this, cause it did look cleaner when it just said newVoiceState.channel
	isTimeForPomodoro = (oldVoiceState: VoiceState, newVoiceState: VoiceState): boolean => {
		return (
			!oldVoiceState.channel && newVoiceState.channel !== null && newVoiceState.channel?.members?.size >= this.groupSize
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
	};

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
		// A pomodoro timer should have a list of users that it's connected to and then they should get tagged everytime the timer changes state i.e. from work to break or done.
		// getRoomUserIsIn has been made and works as intended I think. It still needs to be tested ofc, but base is made. Inserts the code next time and then text is properly =)
		this.getRoomUserIsIn(interaction.client, interaction.guildId, interaction.member.user.id);
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

	getRoomUserIsIn = (client: Client, guildID: string, userID: string) => {
		const currentGuild = client.guilds.cache.find((guild) => guild.id === guildID);
		if (currentGuild === undefined) {
			return;
		}
		const userConnectedRoom = currentGuild.channels.cache.find((channel) => channel.type === 'GUILD_VOICE' && channel.members.has(userID)) as VoiceChannel;
		console.log(userConnectedRoom);
	};

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
