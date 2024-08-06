require('dotenv').config(); // 이 줄을 코드의 상단에 추가합니다.
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();
const port = 3000; // 원하는 포트 번호로 변경 가능

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers
  ]
});

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const GUILD_ID = '1269653237556969482';

client.on('ready', () => {
  console.log(`봇에 로그인함! ${client.user.tag}!`);
});

app.get('/online-members', async (req, res) => {
  try {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    await guild.members.fetch(); // 모든 멤버 정보를 가져옵니다.

    const onlineMembers = guild.members.cache.filter(member => 
      member.presence?.status === 'online' || 
      member.presence?.status === 'idle' || 
      member.presence?.status === 'dnd'
    );

    const onlineMembersList = onlineMembers.map(member => ({
      username: member.user.username,
      discriminator: member.user.discriminator,
      status: member.presence?.status
    }));

    res.json({ onlineMembers: onlineMembersList });
    console.log(`Found ${onlineMembers.size} online members`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/v1-test', async (req, res) => {
  try {
    const guild = client.guilds.cache.get(GUILD_ID);
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    await guild.members.fetch(); // 모든 멤버 정보를 가져옵니다.

    const onlineMembers = guild.members.cache.filter(member => 
      member.presence?.status === 'online' || 
      member.presence?.status === 'idle' || 
      member.presence?.status === 'dnd'
    );

    const onlineMembersList = onlineMembers.map(member => ({
      username: member.user.username,
      discriminator: member.user.discriminator,
      status: member.presence?.status
    }));
    const membersList = guild.members.cache.map(member => ({
      username: member.user.username,
      discriminator: member.user.discriminator,
      status: member.presence?.status,
      activity: member.presence?.activities[0] ? {
        name: member.presence.activities[0].name,
        type: member.presence.activities[0].type
      } : null,
      activities: member.presence?.activities,
      user: member.user,
      presence: member.presence
    }));
    res.json({ membersList: membersList });
    console.log(`Found ${onlineMembers.size} online members`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

client.login(DISCORD_TOKEN);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



 