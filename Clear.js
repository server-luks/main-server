const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

// Your bot token (yes, hardcoded as requested — NOT RECOMMENDED for public repos!)
const token = 'YOUR_BOT_TOKEN_HERE';

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
    // Only allow users with MANAGE_MESSAGES permission
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.reply("You don't have permission to use this command.");
    }

    // Parse amount (default to 50 if not specified)
    const args = message.content.split(' ');
    const amount = Math.min(parseInt(args[1]) || 50, 150);

    try {
      const deleted = await message.channel.bulkDelete(amount, true);
      message.channel.send(`Deleted ${deleted.size} messages.`)
        .then(msg => setTimeout(() => msg.delete(), 3000)); // Auto-delete bot's confirmation
    } catch (err) {
      console.error(err);
      message.reply('Failed to delete messages. Make sure they are not older than 14 days.');
    }
  }
});

client.login(token);
