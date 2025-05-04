const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

// Hardcode your token directly here
const token = 'MTM2ODY5MTAzMjI3OTIyNDU2MA.GYHNCC.Y68-_HkKqMaHS79LGbob1bXNYcC33KqoWBQH8M';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!clear')) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("You don't have permission to use this command.");
    }

    const args = message.content.split(' ');
    const amount = Math.min(parseInt(args[1]) || 50, 150);

    try {
      const deleted = await message.channel.bulkDelete(amount, true);
      const reply = await message.channel.send(`Deleted ${deleted.size} messages.`);
      setTimeout(() => reply.delete(), 3000);
    } catch (err) {
      console.error(err);
      message.reply("Couldn't delete messages. They may be too old.");
    }
  }
});

client.login(token);
