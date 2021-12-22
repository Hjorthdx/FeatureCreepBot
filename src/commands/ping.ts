import { Discord, Slash, SlashGroup } from "discordx";
import { CommandInteraction } from "discord.js";

@Discord()
@SlashGroup('allourpingcommandstest')
export class ping {
    @Slash('ping', { description: 'Responds pong' })
    async ping(interaction: CommandInteraction) {
        await interaction.reply('pong');
    }
}