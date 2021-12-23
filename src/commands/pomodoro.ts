import { Discord, Slash, SlashGroup, SlashOption } from 'discordx';
import { CommandInteraction } from 'discord.js';
import PomodoroManager, { PomodoroError } from '../application/pomodoroManager';
import PomodoroTimer from '../application/pomodoroTimer';

@Discord()
@SlashGroup('pomodoro')
export class Pomodoro {
	pomodoroManager = new PomodoroManager();

	@Slash('start', { description: 'Start a new pomodoro' })
	async start(
		@SlashOption('worklength', { description: 'Work duration in minutes', required: true }) workDuration: number,
		@SlashOption('breaklength', { description: 'Break duration in minutes', required: true }) breakDuration: number,
		interaction: CommandInteraction
	) {
		const newPomodoro: PomodoroTimer | PomodoroError = this.pomodoroManager.startNewPomodoro(workDuration, breakDuration);
        if ('error' in newPomodoro) {
            await interaction.reply(`Error occured! ${newPomodoro.error}`);
            return;
        }

		await interaction.reply('Pomodoro started!');
		await newPomodoro.workTimer.start();
		// Play sound here when implemented =)

		await interaction.followUp('Work is over!');
		await newPomodoro.breakTimer.start();
		// Play sound here when implemented =)

		await interaction.followUp('Break is over!');
	}

	@Slash('break', { description: 'Starts a break. Useful when only a single timer is needed' })
	async break(
		@SlashOption('breaklength', { description: 'Break duration in minutes' }) breakDuration: number,
		interaction: CommandInteraction
	) {
        const newBreak = this.pomodoroManager.startNewBreak(breakDuration);
        if ('error' in newBreak) {
            await interaction.reply(`Error occured!\n${newBreak.error}`);
            return;
        }
        await interaction.reply('Break started!');
        await newBreak.start();
        // Play sound here when implemented =)

        await interaction.followUp('Break ended!');
    }
}
