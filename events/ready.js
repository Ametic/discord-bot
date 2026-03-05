module.exports = {
    name: 'clientReady',
    once: true,
    execute(client) {
        console.log(`Zalogowano jako ${client.user.tag}`);
    }
};