const autosecure = require("../../../autosecure/autosecure");
const { queryParams } = require("../../../db/db");
const checkToken = require("../../utils/checkToken");
const { autosecureMap } = require("../../handlers/botHandler");

module.exports = {
    name: "start",
    description: `Start your bot!`,
    userOnly: true,
    callback: async (client, interaction) => {
        let panel = await queryParams(
            `SELECT * FROM autosecure WHERE user_id=? LIMIT 1`,
            [interaction.user.id]
        );
        if (panel.length == 0) {
            return interaction.reply({
                content: `Unexpexcted error occured!`,
                ephemeral: true,
            });
        }
        panel = panel[0];
        if (!(await checkToken(panel.token))) {
            return interaction.reply({ content: `Invalid bot token!`, ephemeral: true });
        }
        if (autosecureMap.has(`${interaction.user.id}`)) {
            let as = autosecureMap.get(`${interaction.user.id}`)
            return interaction.reply({
                content: `Bot is already running! [Click me to invite your bot](https://discord.com/oauth2/authorize?client_id=${as?.user?.id}&permissions=8&scope=bot+applications.commands)`,
                ephemeral: true
            });
        }
        try {
            let as = await autosecure(panel.token, interaction.user.id)
            if (as) {
                autosecureMap.set(
                    `${interaction.user.id}`,
                    as
                );
            } else {
                console.log(`[x] Invalid bot intents ${interaction.user.id}`)
                return interaction.reply({ content: `Please enable intents first (Click the guide button if you want to know how!)`, ephemeral: true })
            }
            interaction.reply({ content: `Started your bot successfully [Invite your bot](https://discord.com/oauth2/authorize?client_id=${as.user.id}&permissions=8&scope=bot+applications.commands)`, ephemeral: true });
        } catch (e) {
            console.log(e)
            interaction.reply({ content: `Unexpected error has occurred`, ephemeral: true });
        }
    }
}