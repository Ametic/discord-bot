// Ładuje rzeczy z Discorda (slash komendy, embed, przyciski)
const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

// Funkcja ładująca kotka z API
async function getRandomCat() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  return data[0].url;
}

async function sendCat(interaction) {
    const catImage = await getRandomCat(); // ZAŁADUJ FUNKCJE getRandomCat();

    const embed = new EmbedBuilder()
      .setTitle('Random kitty :3')
      .setImage(catImage)
      .setColor(0xFEE75C)
      .setTimestamp();

    const button = new ButtonBuilder()
      .setCustomId('next_cat')
      .setLabel('One more please :3')
      .setStyle(ButtonStyle.Success)
      .setEmoji('🐱');

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.editReply({
      content: null,
      embeds: [embed],
      components: [row]
    });
}

// Nowa komenda /cat
module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Sends a random cat picture!'),

  async execute(interaction) {
    // Fancy efekt "ładowania"
    await interaction.reply({ content: 'Breeding the cats...'});
    await sendCat(interaction);
    },
    sendCat
};