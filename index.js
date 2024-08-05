require('dotenv').config(); // 이 줄을 코드의 상단에 추가합니다.

const Discord = require('discord.js');
const { GatewayIntentBits } = require('discord.js');

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
  console.log(msg.author);
  if (msg.content === '이런') {
    msg.reply('18181818181818181818118181');
    msg.reply("이 히느야.?");
  }
});

client.login(process.env.DISCORD_TOKEN) // 환경 변수에서 토큰을 읽어옵니다.
  .then(() => {
    console.log('Bot logged in successfully');
  })
  .catch(err => {
    console.error('Failed to login:', err);
  });
