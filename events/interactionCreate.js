module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);
                interaction.reply({
                  content: 'Error.',
                  ephemeral: true
                });
            }
        }
        if (interaction.isButton()) {
            if (interaction.customId === 'next_cat') {
                const catCommand = client.commands.get('cat');
                if (!catCommand || !catCommand.sendCat) return;

                await interaction.deferUpdate();

                try {
                    await catCommand.sendCat(interaction);
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
};