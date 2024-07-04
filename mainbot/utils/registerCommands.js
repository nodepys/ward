const { REST,Routes } = require("discord.js")
module.exports = async (clientid, commands, token) => {
    const rest = new REST().setToken(token)
    try {
        await rest.put(
            Routes.applicationCommands(clientid),
            { body: commands }
        );
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
}