const { autosecureMap } = require("../../handlers/botHandler");

module.exports = {
    name: "stop",
    description: `Stop your bot!`,
    userOnly:true,
    callback: async (client, interaction) => {
        try {
            let c = await autosecureMap.get(interaction.user.id);
            if (c) {
                c?.destroy()
            } else {
                return interaction.reply({content:`Your bot isn't started`,ephemeral:true})
            }
            autosecureMap?.delete(interaction.user.id);
            return interaction.reply({content:`Stopped your bot successfully`,ephemeral:true});
        } catch (e) {
            console.log(e);
            await autosecureMap?.delete(interaction.user.id);
            return interaction.reply({
                content: `Couldn't stop the bot!`,
                ephemeral:true
            });
        }
    }
}