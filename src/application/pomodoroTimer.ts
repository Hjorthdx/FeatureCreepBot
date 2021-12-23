import Timer from "./timer";

export default class PomodoroTimer {
    workTimer: Timer;
    breakTimer: Timer;

    constructor(workDuration: number, breakDuration: number) {
        this.workTimer = new Timer(workDuration);
        this.breakTimer = new Timer(breakDuration);
    }

    getEndWorkTime = () => this.workTimer.getRemainingTime();

    getEndBreakTime = () => this.breakTimer.getRemainingTime();

    isWorkTimer = () => this.workTimer.isOver;

}