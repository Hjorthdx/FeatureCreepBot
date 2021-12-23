const SECONDS_IN_A_MINUTE = 60;
const MILLISECONDS_IN_A_SECOND = 1000;

export default class Timer {
    durationInMinutes: number;
    // Is this bad practice to use?
    startingTime!: Date;
    endTime!: Date;
    isOver: boolean = false;

    constructor(duration: number) {
        this.durationInMinutes = duration;
        
    }

    start = async () => {
        this.startingTime = new Date();
        this.endTime = new Date(this.startingTime.getDate() + this.durationInMinutes);
        await delay(this.durationInMinutes * SECONDS_IN_A_MINUTE * MILLISECONDS_IN_A_SECOND);
        this.isOver = true;
    }

    getRemainingTime = () => this.startingTime.getDate()- this.durationInMinutes;
}

export const delay = (duration: number) => {
    return new Promise( resolve => setTimeout(resolve, duration));
}