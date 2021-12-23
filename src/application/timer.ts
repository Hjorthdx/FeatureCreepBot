const SECONDS_IN_A_MINUTE = 60;
const MILLISECONDS_IN_A_SECOND = 1000;

// .getDate is wrong I think. There's something to do here to fix it.
// And should start actually sleep it? Because if it should then it should happen on a different thread atleast.
	// Should it just have the endTime and then something else will check if it's done?
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
		this.endTime = new Date();
		this.endTime.setMinutes(this.startingTime.getMinutes() + this.durationInMinutes);
		const x = setInterval(() => {
			if (new Date(Date.now()) >= this.endTime) {
				this.isOver = true;
				clearInterval(x);
			}
		}, 1000);
		
		//await delay(this.durationInMinutes * SECONDS_IN_A_MINUTE * MILLISECONDS_IN_A_SECOND);
	};

	getRemainingTime = () => new Date(this.endTime.getTime() - new Date(Date.now()).getTime());
}

export const delay = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));
