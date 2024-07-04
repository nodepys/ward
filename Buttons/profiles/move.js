const listProfiles = require("../../utils/listProfiles")

module.exports = {
    name: "moveprofile",
    callback: async (client, interaction) => {
        interaction.update(await listProfiles(interaction.user.id, interaction.customId.split("|")[1]))
    }
}