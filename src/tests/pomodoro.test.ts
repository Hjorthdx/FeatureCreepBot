import { Collection, GuildMember, Snowflake, VoiceChannel, VoiceState, CommandInteraction } from 'discord.js';
import PomodoroTimer from '../application/pomodoroTimer';
import { Pomodoro } from "../commands/pomodoro";

describe('Pomodoro', () => {
    const pomodoro = new Pomodoro();

	/* isTimeForPomodoro */
	it('Pomodoro isTimeForPomodoro oldVoiceState and newVoiceState is null', () => {
		const expected = false;
        const oldVoiceState = {
			channel: null,
		} as VoiceState;
        const newVoiceState = {
            channel: null,
        } as VoiceState;
        const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
        expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is null and newVoiceState channel is not null with no members', () => {
		const expected = false;
        const oldVoiceState = {
			channel: null,
		} as VoiceState;
        const newVoiceState = {
            channel: {
                members: {
					
				} as Collection<Snowflake, GuildMember>,
            } as VoiceChannel,
        } as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is null and newVoiceState channel is not null with a single member', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		mockMembers.set('mockKey', {} as GuildMember);
		const expected = false;
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is null and newVoiceState channel is not null with enough members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for(let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		};
		const expected = true;
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState ={
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is null', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {

			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: null
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with a single member and newVoiceState channel is null', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		mockMembers.set('mockKey1', {} as GuildMember);
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: null
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with enough members and newVoiceState channel is null', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for(let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		};
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: null
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with no members', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {
				
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: {

			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with a single member and newVoiceState channel is not null with no members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		mockMembers.set('mockKey1', {} as GuildMember);
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: {

			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with enough members and newVoiceState channel is not null with no members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for(let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		};
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: {

			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with a single member', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		mockMembers.set('mockKey1', {} as GuildMember);
		const expected = false;
		const oldVoiceState = {
			channel: {
				
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with enough members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for(let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		};
		const expected = false;
		const oldVoiceState = {
			channel: {
				
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState ={
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	/* shouldAReminderBeSent */	
	it('Pomodoro shouldAReminderBeSent no reminder message sent', () => {
		const expected = true;
		const actual = pomodoro.shouldAReminderBeSent();
		expect(expected).toEqual(actual);
	});

	it('Pomodoro shouldAReminderBeSent reminder message is too recent', () => {
		const expected = false;
		pomodoro.lastMessageSent = new Date(Date.now());
		const actual = pomodoro.shouldAReminderBeSent();
		expect(expected).toEqual(actual);
	});

	it('Pomodoro shouldARreminderBeSent reminder message is not too recent', () => {
		const expected = true;
        pomodoro.lastMessageSent = new Date(2021, 12, 24);
		const actual = pomodoro.shouldAReminderBeSent();
		expect(expected).toEqual(actual);
	});
	
	/* handlePomodoroInterval */
	it('Pomodoro handlePomodoroInterval returns correct string when work time with no users', () => {
		jest.useFakeTimers();
		const expected = `\nTime left of current work timer: 23:59:59\n`;
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		expect(expected).toEqual(actual);
	});

	// Future cases to do:
	/* 
		work time with a user
		work time with multiple users
		break time first run no users
		break time first run with a user
		break time first run with multiple users
		break time not first run no users
		break time not first run with a user
		break time not first run with multiple users
		timer is completely done with no users
		timer is completely done with a user
		timer is copletely done with multiple users
	*/
});