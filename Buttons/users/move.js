const usersMsg = require("../../utils/usersMsg")

module.exports = {
    name: "moveusers",
    ownerOnly:true,
    callback: async (client, interaction) => {
        return interaction.update(await usersMsg(client.username, interaction.customId.split("|")[1]))
    }
}