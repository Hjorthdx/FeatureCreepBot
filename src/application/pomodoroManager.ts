import PomodoroTimer from './pomodoroTimer';
import Timer from "./timer";

export interface PomodoroError {
    status: string;
    error: string;
}

export default class PomodoroManager {
    listOfPomodoroTimers: PomodoroTimer[];

    constructor() {
        this.listOfPomodoroTimers = [];
    }

    startNewPomodoro = (workDuration: number | undefined, breakDuration: number | undefined): PomodoroTimer | PomodoroError => {
        const workResult = this.checkIfValidInput(workDuration);
        const breakResult = this.checkIfValidInput(breakDuration);
        if (workResult.status !== 'OK' && breakResult.status !== 'OK') {
            return { error: `Work: ${workResult.error}\nBreak: ${breakResult.error}` } as PomodoroError;
        }
        if (workResult.status !== 'OK') {
            return workResult;
        }
        if(breakResult.status !== 'OK') {
            return breakResult;
        }
        
        const newPomodoro = new PomodoroTimer(workDuration!, breakDuration!);
        this.listOfPomodoroTimers.push(newPomodoro);
        return newPomodoro;
    }

    private checkIfValidInput = (duration: number | undefined) => {
        if (duration === undefined) {
            return { error: 'Duration was not specified' } as PomodoroError;
        }
        if (duration! <= 0) {
            return { error: 'Duration was 0 or negative' } as PomodoroError;
        }
        return { status: 'OK' } as PomodoroError;
    } 

    startNewBreak = (duration: number | undefined): Timer | PomodoroError => {
        const result = this.checkIfValidInput(duration);
        if (result.status !== 'OK') {
            return result;
        }
        const newTimer = new Timer(duration!);
        return newTimer;
    }

    isListOfPomodoroTimersEmpty = () => this.listOfPomodoroTimers.length == 0;
}