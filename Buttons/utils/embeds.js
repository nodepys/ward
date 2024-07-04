const verificationMessage = require("../../utils/settings/verificationMessage");
let disableautosecure = {
    name: `embeds`,
    adminOnly: true,
    callback: async (client, interaction) => {
        let type = interaction.customId.split("|")[1]
        return interaction.reply(await verificationMessage(client.username, type))
    }
};
module.exports = disableautosecure;
