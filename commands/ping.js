const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Checks the bot latency.'),

  async execute(interaction, client) {
    await interaction.reply({
        content: 'Checking ping...',
        withResponse: true
    });

    const message = await interaction.fetchReply();

    const latency = message.createdTimestamp - interaction.createdTimestamp;
    const apiPing = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle('Ping')
      .setColor(0x0099ff)
      .addFields(
        { name: 'Bot latency:', value: `${latency}ms`, inline: true },
        { name: 'API latency:', value: `${apiPing}ms`, inline: true })
      .setTimestamp()

    await interaction.editReply({
        content: null,
        embeds: [embed]
    });
  }
};