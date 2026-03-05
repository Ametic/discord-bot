const fs = require('fs');
const path = require('path');

function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath);

    for (const file of commandFiles) {
        if (!file.endsWith('.js')) continue;

        const command = require(`../commands/${file}`);

        if (command.data && command.execute) {
            client.commands.set(command.data.name, command);
            console.log(`Załadowano komendę: ${command.data.name}`);
        } else {
            console.warn(`Komenda ${file} nie ma data lub execute`);
        }
    }
}

module.exports = { loadCommands };