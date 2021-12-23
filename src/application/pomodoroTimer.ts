import Timer from "./timer";

export default class PomodoroTimer {
    private _workTimer: Timer;
    public get workTimer(): Timer {
        return this._workTimer;
    }

    private _breakTimer: Timer;
    public get breakTimer(): Timer {
        return this._breakTimer;
    }

    constructor(workDuration: number, breakDuration: number) {
        this._workTimer = new Timer(workDuration);
        this._breakTimer = new Timer(breakDuration);
    }

    getEndWorkTime = () => this._workTimer.getRemainingTime();

    getEndBreakTime = () => this._breakTimer.getRemainingTime();

    isWorkTimerOver = () => this._workTimer.isOver;

    isBreakTimerOver = () => this._breakTimer.isOver;

    // start methods ? Necessary?
    startWorkTimer = () => this._workTimer.start();

    startBreakTimer = () => this._breakTimer.start();

}