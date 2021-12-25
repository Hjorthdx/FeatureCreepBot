import { Collection, GuildMember, Snowflake } from 'discord.js';
import PomodoroManager, { PomodoroError } from '../application/pomodoroManager';
import PomodoroTimer from '../application/pomodoroTimer';
import Timer from '../application/timer';

describe('PomodoroManager', () => {
	const pomodoroManager = new PomodoroManager();
    
	// Now all the new Date() that gets created should get the same time and the tests should always behave the same.
	beforeEach(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(2021, 12, 24));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	/* startNewPomodoro */
	// Json stringify? Is that a bad thing to do? Idk how else to verify they are equal. toStrictEqual, toMatchObject doesn't pass.
	it('PomodoroManager startNewPomodoro creates correct timer when both work and break duration is specified and is positive', () => {
		const expected = new PomodoroTimer(1, 2, new Collection<Snowflake, GuildMember>());
		const actual = pomodoroManager.startNewPomodoro(1, 2, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewPomodoro returns PomdoroError when both work and break duration is specified and is negative', () => {
		const expected = { error: 'Work: Duration was 0 or negative\nBreak: Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(-1, -2, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro returns PomodoroError when neither duration is specified', () => {
		const expected = { error: 'Work: Duration was not specified\nBreak: Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(undefined, undefined, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro returns PomodoroError when only work duration is specified and is positive', () => {
		const expected = { error: 'Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(5, undefined, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro returns PomodoroError when only work duration is specified and is negative', () => {
		const expected = { error: 'Work: Duration was 0 or negative\nBreak: Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(-5, undefined, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro returns PomodoroError when only break duration is specified and is positive', () => {
		const expected = { error: 'Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(undefined, 1, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro returns PomodoroError when only break duration is specified and is negative', () => {
		const expected = { error: 'Work: Duration was not specified\nBreak: Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(undefined, -1, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro creates correct timer when work duration is negative and break duration is positive', () => {
		const expected = { error: 'Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(-5, 1, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewPomodoro creates correct timer when work duration is positive and break duration is negative', () => {
		const expected = { error: 'Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(5, -1, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewPomodoro creates correct timer when work and break duration is same length and positive', () => {
		const expected = new PomodoroTimer(1, 1, new Collection<Snowflake, GuildMember>());
		const actual = pomodoroManager.startNewPomodoro(1, 1, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewPomodoro creates correct timer when work and break duration is same length and negative', () => {
		const expected = { error: 'Work: Duration was 0 or negative\nBreak: Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(-1, -1, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewPomodoro creates correct timer when both work and break duration is 0', () => {
		const expected = { error: 'Work: Duration was 0 or negative\nBreak: Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(0, 0, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro creates correct timer when only work duration is specified and is 0', () => {
		const expected = { error: 'Work: Duration was 0 or negative\nBreak: Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(0, undefined, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomodoro creates correct timer when only break duration is specified and is 0', () => {
		const expected = { error: 'Work: Duration was not specified\nBreak: Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewPomodoro(undefined, 0, new Collection<Snowflake, GuildMember>());
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewPomdoro adds new pomodoro to listOfPomodoroTimers', () => {
		const newPomodoroTimer = new PomodoroTimer(1, 1, new Collection<Snowflake, GuildMember>());
		const expected = [newPomodoroTimer];
		pomodoroManager.listOfPomodoroTimers = [];
		pomodoroManager.startNewPomodoro(1, 1, new Collection<Snowflake, GuildMember>());
		expect(JSON.stringify(expected[0])).toEqual(JSON.stringify(pomodoroManager.listOfPomodoroTimers[0]));
	});

	/* isListOfPomodoroTimersEmpty */
	it('PomodoroManager isListOfPomodoroTimersEmpty returns correct bool when list is empty', () => {
		const expected = true;
		pomodoroManager.listOfPomodoroTimers = [];
		const actual = pomodoroManager.isListOfPomodoroTimersEmpty();
		expect(expected).toEqual(actual);
	});
	
	it('PomodoroManager isListOfPomodoroTimersEmpty returns correct bool when list is not empty', () => {
		const expected = false;
		pomodoroManager.startNewPomodoro(1, 1, new Collection<Snowflake, GuildMember>());
		const actual = pomodoroManager.isListOfPomodoroTimersEmpty();
		expect(expected).toEqual(actual);
	});

	/* startNewBreak */
	it('PomodoroManager startNewBreak creates correct timer when duration is positive', () => {
		const expected = new Timer(1);
		const actual = pomodoroManager.startNewBreak(1);
		expect(JSON.stringify(expected)).toEqual(JSON.stringify(actual));
	});

	it('PomodoroManager startNewBreak returns PomodoroError when duration is undefined', () => {
		const expected = { error: 'Duration was not specified' } as PomodoroError;
		const actual = pomodoroManager.startNewBreak(undefined);
		expect(expected).toEqual(actual);
	});

	it('PomodoroManager startNewBreak returns PomodoroError when duration is negative', () => {
		const expected = { error: 'Duration was 0 or negative' } as PomodoroError;
		const actual = pomodoroManager.startNewBreak(-1);
		expect(expected).toEqual(actual);
	});
});
