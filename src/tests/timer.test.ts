import Timer from "../application/timer";

describe('Timer', () => {
    beforeEach(() => {
		jest.useFakeTimers('modern');
		jest.setSystemTime(new Date(2021, 12, 24));
	});

	afterAll(() => {
		jest.useRealTimers();
	});

    /* start */
    it('Timer start calculateTimes gets called once', () => {
        const mockTimer = new Timer(1);
        const calculateTimesSpy = jest.spyOn(mockTimer, 'calculateTimes');
        mockTimer.start();

        expect(calculateTimesSpy).toHaveBeenCalled();
    });

    it('Timer start handleTimerInterval gets called once', () => {
        const mockTimer = new Timer(1);
        const handleTimerIntervalSpy = jest.spyOn(mockTimer, 'handleTimerInterval');
        mockTimer.start();

        expect(handleTimerIntervalSpy).toHaveBeenCalled();
    });

    /* calculateTimes */
    it('Timer calculateTimes startingTime is current time', () => {
        const expected = new Date();
        const mockTimer = new Timer(1);
        mockTimer.calculateTimes();
        const actual = mockTimer.startingTime;

        expect(actual).toEqual(expected);
    });

    it('Timer calculateTimes endTime is current time plus a (positive) duration', () => {
        const expected = new Date();
        expected.setMinutes(new Date().getMinutes() + 1);
        const mockTimer = new Timer(1);
        mockTimer.calculateTimes();
        const actual = mockTimer.endTime;

        expect(actual).toEqual(expected);
    });

    it('Timer calculateTimes endTime is current time plus a (negative) duration', () => {
        const expected = new Date();
        expected.setMinutes(new Date().getMinutes() + -1);
        const mockTimer = new Timer(-1);
        mockTimer.calculateTimes();
        const actual = mockTimer.endTime;

        expect(actual).toEqual(expected);
    });

    /* handleTimerInterval */
    it('Timer handleTimerInterval endTime is in future', () => {
        const expected = false;
        const mockTimer = new Timer(1);
        mockTimer.endTime = new Date();
        mockTimer.handleTimerInterval();
        const actual = mockTimer.isOver;

        expect(actual).toEqual(expected);
    });

    // Have to advance timers before it is run.
    // isOver doesn't get advanced if you swap the order of the last two lines before expect.
    it('Timer handleTimerInterval endTime is in past', () => {
        const expected = true;
        const mockTimer = new Timer(1);
        mockTimer.endTime = new Date(2021, 12, 23);
        mockTimer.handleTimerInterval();
        jest.advanceTimersByTime(1000);
        const actual = mockTimer.isOver;

        expect(actual).toEqual(expected);
    });

    it('Timer handleTimerInterval endTime is in now', () => {
        const expected = true;
        const mockTimer = new Timer(1);
        mockTimer.handleTimerInterval();
        mockTimer.endTime = new Date(Date.now());
        jest.advanceTimersByTime(1000);
        const actual = mockTimer.isOver;
        expect(actual).toEqual(expected);
    });

    /* getRemainingTime */
    it('Timer getRemainingTime endTime is current time', () => {
        const expected = new Date(new Date().getTime() - new Date().getTime());
        const mockTimer = new Timer(1);
        mockTimer.endTime = new Date();
        
        const actual = mockTimer.getRemainingTime();
        expect(actual).toEqual(expected);
    });

    it('Timer getRemainingTime endTime is in the past', () => {
        const expected = new Date(new Date(2021, 12, 23).getTime() - new Date().getTime());
        const mockTimer = new Timer(1);
        mockTimer.endTime = new Date(2021, 12, 23);
        
        const actual = mockTimer.getRemainingTime();
        expect(actual).toEqual(expected);
    });

    it('Timer getRemainingTime endTime is in the future', () => {
        const mockEndTime = new Date();
        mockEndTime.setMinutes(new Date().getMinutes() + 1);
        const expected = new Date(mockEndTime.getTime() - new Date().getTime());
        const mockTimer = new Timer(1);
        mockTimer.endTime = mockEndTime;
        
        const actual = mockTimer.getRemainingTime();
        expect(actual).toEqual(expected);
    });
});