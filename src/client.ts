import path from 'path';
import { Intents, Interaction } from 'discord.js';
import { Client } from 'discordx';
import { importx } from '@discordx/importer';
import config from './config';

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
	botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
	silent: false,
});

client.once('ready', async () => {
	await client.initApplicationCommands({
		guild: { log: true },
		global: { log: true },
	});
	await client.initApplicationPermissions();

	console.log('Client initialized');
});

client.on('interactionCreate', (interaction: Interaction) => {
	client.executeInteraction(interaction);
});

// Doesn't work I think
client.on('unhandledRejection', (error) => console.error('Promise rejection:', error));

importx(path.join(__dirname, 'commands', '**/*.{ts,js}')).then(() => {
	client.login(config.botToken);
});
