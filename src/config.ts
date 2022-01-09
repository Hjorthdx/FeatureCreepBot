import * as dotenv from 'dotenv';
dotenv.config();

export default {
	botToken: process.env.BOT_TOKEN ?? '',
	scheduleCheckApi: process.env.SCHEDULE_CHECK_API ?? '',
};
