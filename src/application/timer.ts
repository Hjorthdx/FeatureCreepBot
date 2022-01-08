export default class Timer {
	durationInMinutes: number;
	// Is this bad practice to use?
	startingTime: Date;
	endTime: Date;
	isOver: boolean = false;

	constructor(duration: number) {
		this.durationInMinutes = duration;
		this.startingTime = new Date();
		this.endTime = new Date();
	}

	start = async () => {
		this.calculateTimes();
		this.handleTimerInterval();
	};

	calculateTimes = () => {
		this.startingTime = new Date();
		this.endTime = new Date();
		this.endTime.setMinutes(this.startingTime.getMinutes() + this.durationInMinutes);
	};

	handleTimerInterval = () => {
		const timerInterval = setInterval(() => {
			if (new Date(Date.now()) >= this.endTime) {
				this.isOver = true;
				clearInterval(timerInterval);
			}
		}, 1000);
	};

	getRemainingTime = () => new Date(this.endTime.getTime() - new Date(Date.now()).getTime());
}
