// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { TOKEN } = require("./config.json");
const generateImage = require("./generateImage");

const WELCOMECHANNELID = "970706351078666240";

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(WELCOMECHANNELID).send({
    content: `<@${member.id}> Bem vindo ao servidor!`,
    files: [img],
  });
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  if (message.content == "é os bola") {
    message.reply("é eles.");
  }

  if (message.content == "server") {
    message.reply(`Nome do servidor é: ${message.guild.name}`);
  }
});

// Login to Discord with your client's token
client.login(TOKEN);
