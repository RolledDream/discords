const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js')

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', msg => {
    console.log(msg.author)
    // console.log(`Message received from: ${msg.author.tag}`);
    // console.log(`User ID: ${msg.author.id}`);
    // console.log(`Username: ${msg.author.username}`);
    // console.log(`Discriminator: ${msg.author.discriminator}`);
    // console.log(`Avatar URL: ${msg.author.displayAvatarURL()}`);
  if (msg.content === '이런') {
    msg.reply('18181818181818181818118181');
    msg.reply("이 히느야?");
  }
  
});

client.login('MTI2OTY0ODk0OTEyMDMzNTkwNA.GNn8VT.A_NpzCdTgddchOt14DIsAEd060Oi_kTAOq4wDs')
  .then(() => {
    console.log('Bot logged in successfully');
  })
  .catch(err => {
    console.error('Failed to login:', err);
  });