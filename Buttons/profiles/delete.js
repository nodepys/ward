const { queryParams } = require("../../../db/db")
const listProfiles = require("../../utils/listProfiles")

module.exports = {
    name: "deleteprofile",
    callback: async (client, interaction) => {
        let id = interaction.customId.split("|")[1]
        await queryParams(`DELETE FROM profiles WHERE id=? AND user_id=?`, [id, interaction.user.id])
        return interaction.update(await listProfiles(interaction.user.id, 1))
    }
}