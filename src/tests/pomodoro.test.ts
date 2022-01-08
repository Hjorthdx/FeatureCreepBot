import { Collection, GuildMember, Snowflake, VoiceChannel, VoiceState, CommandInteraction, MemberMention, Client, GuildManager, Guild, GuildChannelManager, ThreadChannel, GuildChannel, TextChannel } from 'discord.js';
import flushPromises from 'flush-promises';
import PomodoroTimer from '../application/pomodoroTimer';
import Timer from '../application/timer';
import { Pomodoro } from '../commands/pomodoro';

describe('Pomodoro isTimeForPomodoro', () => {
	const pomodoro = new Pomodoro();

	it('oldVoiceState and newVoiceState is null', () => {
		const expected = false;
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is null and newVoiceState channel is not null with no members', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is null and newVoiceState channel is not null with a single member', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is null and newVoiceState channel is not null with enough members', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with no members and newVoiceState channel is null', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with a single member and newVoiceState channel is null', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with enough members and newVoiceState channel is null', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with no members and newVoiceState channel is not null with no members', () => {
		const expected = false;
		const oldVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const newVoiceState = {
			channel: {} as VoiceChannel,
		} as VoiceState;
		const actual = pomodoro.isTimeForPomodoro(oldVoiceState, newVoiceState);
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with a single member and newVoiceState channel is not null with no members', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with enough members and newVoiceState channel is not null with no members', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with no members and newVoiceState channel is not null with a single member', () => {
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
		expect(actual).toEqual(expected);
	});

	it('oldVoiceState channel is not null with no members and newVoiceState channel is not null with enough members', () => {
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
		expect(actual).toEqual(expected);
	});
});

describe('Pomodoro shouldAReminderBeSent', () => {
	const pomodoro = new Pomodoro();

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('No reminder message sent', () => {
		const expected = true;
		const actual = pomodoro.shouldAReminderBeSent();
		expect(actual).toEqual(expected);
	});

	it('Reminder message is too recent', () => {
		const expected = false;
		pomodoro.lastMessageSent = new Date(Date.now());
		const actual = pomodoro.shouldAReminderBeSent();
		expect(actual).toEqual(expected);
	});

	it('Reminder message is not too recent', () => {
		const expected = true;
		pomodoro.lastMessageSent = new Date(2021, 12, 24);
		const actual = pomodoro.shouldAReminderBeSent();
		expect(actual).toEqual(expected);
	});
});

describe('Pomodoro handlePomodoroInterval', () => {
	const pomodoro = new Pomodoro();
	let mockMembers: Collection<string, GuildMember>;
	let mockMember1: GuildMember;
	let mockMember2: GuildMember;

	beforeEach(() => {
		jest.useFakeTimers();
		mockMembers = new Collection<Snowflake, GuildMember>();
		mockMember1 = {
			toString: () => {
				return `<@!mockKey1>` as MemberMention;
			},
		} as GuildMember;
		mockMember2 = {
			toString: () => {
				return `<@!mockKey2>` as MemberMention;
			},
		} as GuildMember;
	});

	afterAll(() => {
		jest.useRealTimers();
	});
	
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
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval work time with a member', () => {
		const expected = '<@!mockKey1>\nTime left of current work timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);

		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval work time with multiple members', () => {
		const expected = '<@!mockKey1><@!mockKey2>\nTime left of current work timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set('mockKey1', mockMember1);
		mockMembers.set('mockKey2', mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);

		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with no members and first run is true', async () => {
		const expected = '\nTime left of current break timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with no members and first run is true sends followUp message', async () => {
		const expected = '\nThe work is now over. Please enjoy your break!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with no members and first run is not true', async () => {
		const expected = '\nTime left of current break timer: 23:59:58';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(2000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomdoroInterval break time with a member and first run is true', async () => {
		const expected = '<@!mockKey1>\nTime left of current break timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with a member and first run is true sends followUp message', async () => {
		const expected = '<@!mockKey1>\nThe work is now over. Please enjoy your break!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with a member and first run is not true', async () => {
		const expected = '<@!mockKey1>\nTime left of current break timer: 23:59:58';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(2000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with multiple members and first run is true', async () => {
		const expected = '<@!mockKey1><@!mockKey2>\nTime left of current break timer: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval break time with multiple members and first run is true sends followUp message', async () => {
		const expected = '<@!mockKey1><@!mockKey2>\nThe work is now over. Please enjoy your break!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomdoroInterval break time with multiple members and first run is not true', async () => {
		const expected = '<@!mockKey1><@!mockKey2>\nTime left of current break timer: 23:59:58';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.startBreakTimer = jest.fn(async () => {});
		mockTimer.workTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(2000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with no members', () => {
		const expected = '\nThe pomodoro is now complete.\nPlease consider starting a new timer if continued work';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with a member', () => {
		const expected = '<@!mockKey1>\nThe pomodoro is now complete.\nPlease consider starting a new timer if continued work';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with multiple members', () => {
		const expected =
			'<@!mockKey1><@!mockKey2>\nThe pomodoro is now complete.\nPlease consider starting a new timer if continued work';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
			followUp: jest.fn((options: string) => {}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with no members and followUp message is valid', async () => {
		const expected = '\nThe break is now over!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new PomodoroTimer(1, 1, new Collection());
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with a member and followUp message is valid', async () => {
		const expected = '<@!mockKey1>\nThe break is now over!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});

	it('Pomodoro handlePomodoroInterval timer is completely done with multiple members and followUp message is valid', async () => {
		const expected = '<@!mockKey1><@!mockKey2>\nThe break is now over!';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {}) as unknown,
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockTimer = new PomodoroTimer(1, 1, mockMembers);
		mockTimer.breakTimer.isOver = true;
		pomodoro.handlePomodoroInterval(mockCommandInteraction, mockTimer);
		jest.advanceTimersByTime(1000);
		await flushPromises();
		expect(actual).toEqual(expected);
	});
});

describe('Pomodoro handleBreakInterval', () => {
	const pomodoro = new Pomodoro();
	let mockMembers: Collection<string, GuildMember>;
	let mockMember1: GuildMember;
	let mockMember2: GuildMember;

	beforeEach(() => {
		jest.useFakeTimers();
		mockMembers = new Collection<Snowflake, GuildMember>();
		mockMember1 = {
			toString: () => {
				return `<@!mockKey1>` as MemberMention;
			},
		} as GuildMember;
		mockMember2 = {
			toString: () => {
				return `<@!mockKey2>` as MemberMention;
			},
		} as GuildMember;
	});

	it('Break time with no members', () => {
		const expected = '\nTime left of current break: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Break time with one member', () => {
		const expected = '<@!mockKey1>\nTime left of current break: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Break time with multiple members', () => {
		const expected = '<@!mockKey1><@!mockKey2>\nTime left of current break: 23:59:59';
		let actual = '';
		const mockCommandInteraction = {
			editReply: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Timer is done with no members', () => {
		const expected = '\nBreak ended!';
		let actual = '';
		const mockCommandInteraction = {
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		mockTimer.isOver = true;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Timer is done with one member', () => {
		const expected = '<@!mockKey1>\nBreak ended!';
		let actual = '';
		const mockCommandInteraction = {
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		mockMembers.set(mockMember1.toString(), mockMember1);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		mockTimer.isOver = true;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});

	it('Timer is done with multiple members', () => {
		const expected = '<@!mockKey1><@!mockKey2>\nBreak ended!';
		let actual = '';
		const mockCommandInteraction = {
			followUp: jest.fn((options: string) => {
				actual = options;
			}) as unknown,
		} as CommandInteraction;
		const mockTimer = new Timer(1);
		mockMembers.set(mockMember1.toString(), mockMember1);
		mockMembers.set(mockMember2.toString(), mockMember2);
		const mockVoiceChannel = {
			members: mockMembers,
		} as VoiceChannel;
		mockTimer.isOver = true;
		pomodoro.handleBreakInterval(mockCommandInteraction, mockTimer, mockVoiceChannel);
		jest.advanceTimersByTime(1000);
		expect(actual).toEqual(expected);
	});
});

describe('Pomodoro getRoomUserIsIn', () => {
	const pomodoro = new Pomodoro();
	const mockUserID = 'mockUserID';
	const mockGuildID = 'mockGuildID';
	const mockMember = {
		id: mockUserID,
	} as GuildMember;
	let mockChannelsCache: Collection<string, GuildChannel | ThreadChannel>;
	let mockGuildsCache: Collection<string, Guild>;
	let mockClient: Client<boolean>;
	let mockGuild: Guild;
	let mockMembers: Collection<string, GuildMember>;
	let mockChannel: VoiceChannel;

	beforeEach(() => {
		mockChannelsCache = new Collection<string, GuildChannel | ThreadChannel>();
		mockGuildsCache = new Collection<string, Guild>();
		mockClient = {
			guilds: {
				cache: mockGuildsCache,
			} as GuildManager,
			channels: {
				cache: mockChannelsCache,
			} as GuildChannelManager,
		} as unknown as Client;
		mockGuild = {
			id: mockGuildID,
			channels: {
				cache: mockChannelsCache,
			} as GuildChannelManager
		} as Guild;
		mockMembers = new Collection<string, GuildMember>();
		mockChannel = {
			type: 'GUILD_VOICE',
			members: mockMembers,
		} as VoiceChannel;
	})
	it('Returns undefined when current guild is undefined', () => {
		const expected = undefined;
		const actual = pomodoro.getRoomUserIsIn(mockClient, mockGuildID, mockUserID);
		expect(actual).toEqual(expected);
	});

	it('Returns undefined when user is not in a room', () => {
		const expected = undefined;
		mockClient.guilds.cache.set('mockGuildKey', mockGuild);
		mockClient.channels.cache.set('mockChannelKey', mockChannel);
		const actual = pomodoro.getRoomUserIsIn(mockClient, mockGuildID, mockUserID);
		expect(actual).toEqual(expected);
	});

	it('Returns the room user is in', () => {
		const expected = mockChannel;
		mockChannel.members.set('mockUserID', mockMember);
		mockClient.guilds.cache.set('mockGuildKey', mockGuild);
		mockClient.channels.cache.set('mockChannelKey', mockChannel);
		const actual = pomodoro.getRoomUserIsIn(mockClient, mockGuildID, mockUserID);
		expect(actual).toEqual(expected);
	});
});

describe('Pomodoro onVoiceStateUpdate', () => {
	const pomodoro = new Pomodoro();
	const mockGuildID = 'mockGuildID';
	let mockChannelsCache: Collection<string, GuildChannel | ThreadChannel>;
	let mockGuild: Guild;
	let mockGuildsCache: Collection<string, Guild>;
	let mockClient: Client<boolean>;
	let mockChannel: TextChannel;

	beforeEach(() => {
		mockChannelsCache = new Collection<string, GuildChannel | ThreadChannel>();
		mockGuild = {
			id: mockGuildID,
			channels: {
				cache: mockChannelsCache,
			} as GuildChannelManager
		} as Guild;
		mockGuildsCache = new Collection<string, Guild>();
		mockClient = {
			guilds: {
				cache: mockGuildsCache,
			} as GuildManager,
			channels: {
				cache: mockChannelsCache,
			} as GuildChannelManager,
		} as unknown as Client;
	});


	it('Calls isTimeForPomodoro', () => {
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
		} as VoiceState;

		const isTimeForPomodoroSpy = jest.spyOn(pomodoro, 'isTimeForPomodoro');
		pomodoro.onVoiceStateUpdate(oldVoiceState, newVoiceState, mockClient);

		expect(isTimeForPomodoroSpy).toHaveBeenCalledTimes(1);
	});

	it('shouldAReminderBeSent is not called if it is not time for pomodoro', () => {
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: null,
		} as VoiceState;

		const shouldAReminderBeSentSpy = jest.spyOn(pomodoro, 'shouldAReminderBeSent');
		pomodoro.onVoiceStateUpdate(oldVoiceState, newVoiceState, mockClient);

		expect(shouldAReminderBeSentSpy).toHaveBeenCalledTimes(0);
	});

	it('shouldAReminderBeSent is called if it is time for pomodoro', () => {
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
		} as VoiceState;

		const shouldAReminderBeSentSpy = jest.spyOn(pomodoro, 'shouldAReminderBeSent');
		pomodoro.onVoiceStateUpdate(oldVoiceState, newVoiceState, mockClient);

		expect(shouldAReminderBeSentSpy).toHaveBeenCalledTimes(1);
	});

	it('Sends a pomodoro opportunity message if a reminder should be sent', () => {
		let actual = '';
		const mockMembers = new Collection<Snowflake, GuildMember>();
		for (let i = 0; i < pomodoro.groupSize; i++) {
			mockMembers.set(`${i}`, {} as GuildMember);
		}
		const oldVoiceState = {
			channel: null,
		} as VoiceState;
		const newVoiceState = {
			channel: {
				members: mockMembers,
			} as VoiceChannel,
			guild: {
				id: 'mockGuildID',
			} as Guild
		} as VoiceState;
		mockChannel = {
			type: 'GUILD_TEXT',
			send: jest.fn((message: string) => {
				actual = message;
			}) as unknown
		} as TextChannel;

		mockClient.guilds.cache.set('mockGuildKey', mockGuild);
		mockClient.channels.cache.set('mockChannelKey', mockChannel);
		pomodoro.lastMessageSent = new Date(2021, 12, 24);
		const sendSpy = jest.spyOn(mockChannel, 'send');
		pomodoro.onVoiceStateUpdate(oldVoiceState, newVoiceState, mockClient);
		expect(sendSpy).toHaveBeenCalledTimes(1);
	});
});

describe('Pomodoro start', () => {
	const pomodoro = new Pomodoro();


});

describe('Pomodoro break', () => {
	const pomodoro = new Pomodoro();
});
