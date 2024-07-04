const usersMsg = require("../../utils/usersMsg")

module.exports = {
    name: "forwardusers",
    callback: async (client, interaction) => {
        return interaction.update(await usersMsg(interaction.user.id, interaction.customId.split("|")[1]))
    }
}