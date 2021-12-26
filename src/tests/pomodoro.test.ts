import { Collection, GuildMember, Snowflake, VoiceChannel, VoiceState, CommandInteraction, MemberMention } from 'discord.js';
import PomodoroTimer from '../application/pomodoroTimer';
import { Pomodoro } from '../commands/pomodoro';

describe('Pomodoro', () => {
	const pomodoro = new Pomodoro();

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

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
				members: {} as Collection<Snowflake, GuildMember>,
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
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const expected = true;
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

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is null', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
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
		const newVoiceState = {
			channel: null,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with enough members and newVoiceState channel is null', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with no members', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: {} as VoiceChannel,
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
		const newVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with enough members and newVoiceState channel is not null with no members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const expected = false;
		const oldVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with a single member', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		mockMembers.set('mockKey1', {} as GuildMember);
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(expected).toEqual(actual);
	});

	it('Pomodoro isTimeForPomodoro oldVoiceState channel is not null with no members and newVoiceState channel is not null with enough members', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
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
	/*
	it('Pomodoro handlePomodoroInterval work time with no members', () => {
		const expected = '\nTime left of current work timer: 23:59:59';
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

	it('Pomodoro handlePomodoroInterval work time with a member', () => {
		const expected = '<@!mockKey1>\nTime left of current work timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockSnowFlake = 'mockKey1';
		const mockMembers = new Collection<Snowflake, GuildMember>();
		const mockMember = {
			toString: () => {
				return `<@!${mockSnowFlake}>` as MemberMention;
			}
		} as GuildMember;
		mockMembers.set(mockSnowFlake, mockMember);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
	
		expect(expected).toEqual(actual);
	});

	it('Pomodoro handlePomodoroInterval work time with multiple members', () => {
		const expected = '<@!mockKey1><@!mockKey2>\nTime left of current work timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockMembers = new Collection<Snowflake, GuildMember>();
		const mockMember1 = {
			toString: () => {
				return `<@!mockKey1>` as MemberMention;
			}
		} as GuildMember;
		mockMembers.set('mockKey1', mockMember1);
		const mockMember2 = {
			toString: () => {
				return `<@!mockKey2>` as MemberMention;
			}
		} as GuildMember;
		mockMembers.set('mockKey2', mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
	
		expect(expected).toEqual(actual);
	});*/

	// This does not work for some reason. I can't figure out why right now. I've spent too long on it for now so I think I just need a break from it.
	// For some reason actual is always empty...
	it('Pomodoro handlePomodoroInterval break time with no members and first run is true', () => {
		const expected = '\nTime left of current break timer: 23:59:59';
		let actual = '';
		let x = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {
				x = options;
			}) as unknown,
		} as CommandInteraction;
		
		//let mockEndTime = new Date();
		//mockEndTime.setMinutes(new Date(Date.now()).getMinutes() + 1);

		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		//mockTimer.breakTimer.endTime = mockEndTime;
		mockTimer.workTimer.isOver = true;

		//mockTimer.startBreakTimer();
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		expect(expected).toEqual(actual);
	});

	/*
	it('Pomodoro handlePomodoroInterval break time with no members and first run is true sends followUp message', () => {

	});

	it('Pomodoro handlePomodoroInterval break time with no members and first run is not true', () =>{

	});


	it('Pomdoro handlePomdoroInterval break time with a member and first run is true', () => {

	});

	it('Pomodoro handlePomodoroInterval break time with a member and first run is true sends followUp message', () => {

	});

	it('Pomodoro handlePomodoroInterval break time with a member and first run is not true', () => {

	});


	it('Pomodoro handlePomodoroInterval break time with multiple members and first run is true', () => {

	});

	it('Pomodoro handlePomodoroInterval break time with multiple members and first run is true sends followUp message', () => {

	});

	it('Pomodoro handlePomdoroInterval break time with multiple members and first run is not true', () => {

	});


	it('Pomodoro handlePomodoroInterval timer is completely done with no members', () => {

	});

	it('Pomodoro handlePomodoroInterval timer is completely done with a member', () => {

	});

	it('Pomodoro handlePomodoroInterval timer is completely done with multiple members', () => {

	});*/

	// Future cases to do:
	/* 
		Something with sending the followUp message aswell.

	*/
});
