const usersMsg = require("../../utils/usersMsg")

module.exports = {
    name: "backusers",
    callback: async (client, interaction) => {
        return interaction.update(await usersMsg(interaction.user.id, interaction.customId.split("|")[1]))
    }
}