const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const CHANNEL_ID = process.env.CHANNEL_ID;

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = await client.guilds.fetch(GUILD_ID);
  const channel = await guild.channels.fetch(CHANNEL_ID);

 const connection = joinVoiceChannel({
  channelId: channel.id,
  guildId: guild.id,
  adapterCreator: channel.guild.voiceAdapterCreator,
  selfDeaf: true,
  selfMute: true
});

connection.on('error', console.error);
  
  console.log('Joined voice channel.');
});

client.login(TOKEN);
