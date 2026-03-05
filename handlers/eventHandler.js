const fs = require('fs');
const path = require('path');

function loadEvents(client) {
    const eventsPath = path.join(__dirname, '../events');
    const eventFiles = fs.readdirSync(eventsPath);

    for (const file of eventFiles) {
        if (!file.endsWith('.js')) continue;

        const event = require(`../events/${file}`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }

        console.log(`Załadowano event: ${event.name}`);
    }
}

module.exports = { loadEvents };