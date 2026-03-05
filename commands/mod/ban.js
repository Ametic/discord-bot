const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

async function banUser(guild, user, reason, moderator) {
    const member = await guild.members.fetch(user.id).catch(() => null);

    if (member) {
        if (!member.bannable) {
            throw new Error('Nie mogę zbanować, mam za niską rangę!');
        }
    }
    await guild.members.ban(user, {
        reason: `${reason} | Banujący: ${moderator.tag}`
    });
    return {
        success: true,
        user: user.tag,
        reason: reason
    };
}

function banEmbed(target, reason, moderator) {
    return new EmbedBuilder()
      .setTitle('Użytkownik zbanowany!')
      .setDescription(`**${target.tag}** został zbanowany z serwera.`)
      .addFields(
        { name: 'Powód:', value: reason, inline: true },
        { name: 'Banujący:', value: moderator.tag, inline: true }
      )
      .setColor(0xFF0000)
      .setTimestamp()
      .setThumbnail(target.displayAvatarURL({ dynamic: true }));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banuje użytkownika z serwera')
    .addUserOption(option =>
      option
        .setName('target')
        .setDescription('Użytkownik do zbanowania')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Powód bana')
        .setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'Brak powodu';
    const member = interaction.options.getMember('target');

    if (member && member.roles.highest.position >= interaction.member.roles.highest.position) {
        return interaction.reply({
            content: 'Nie możesz zbanować tego użytkownika',
            ephemeral: true
        });
    }

    try {
        await banUser(interaction.guild, target, reason, interaction.user);

        const embed = banEmbed(target, reason, interaction.user);

        await interaction.reply({ embeds: [embed] });
    } catch (err) {
        console.error(err);
        await interaction.reply({
            content: `Błąd: ${error.message}`,
            ephemeral: true
        });
    }
  },
  banUser,
  banEmbed
};