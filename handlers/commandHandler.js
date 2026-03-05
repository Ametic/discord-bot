const fs = require('fs');
const path = require('path');

function loadCommands(client) {
    const commandsPath = path.join(__dirname, '../commands');
    function loadFromDir(directory) {
        const items = fs.readdirSync(directory, { withFileTypes: true });

        for (const item of items ) {
            const itemPath = path.join(directory, item.name);
            if (item.isDirectory()) {
                loadFromDir(itemPath);
            } else if (item.name.endsWith('.js')) {
                const command = require(itemPath);
                if (command.data && command.execute) {
                    client.commands.set(command.data.name, command);
                    console.log(`Załadowano komendę: ${command.data.name}`);
                } else {
                    console.warn(`Komenda ${item.name} nie ma data lub execute`);
                }
            }
        }
    }

    loadFromDir(commandsPath);
}

module.exports = { loadCommands };