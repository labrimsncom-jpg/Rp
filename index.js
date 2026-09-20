require("dotenv").config();
const { Client, GatewayIntentBits, SlashCommandBuilder, Events } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ping = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Vérifie que le bot est en ligne");

client.once(Events.ClientReady, async () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  await client.application.commands.set([ping.toJSON()]);
  console.log("📦 /ping enregistrée (globale)");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "ping") {
    await interaction.reply(`🏓 Pong ! Latence : ${client.ws.ping} ms`);
  }
});

client.login(process.env.DISCORD_TOKEN);
