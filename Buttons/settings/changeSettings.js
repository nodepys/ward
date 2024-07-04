const { queryParams } = require("../../../db/db")
const listSettings = require("../../utils/listSettings")

module.exports = {
    name: "settings",
    adminOnly: true,
    callback: async (client, interaction) => {
        await queryParams(`UPDATE autosecure SET ${interaction.customId.split("|")[1]}=${interaction.customId.split("|")[2]} WHERE user_id=?`, [client.username])
        return interaction.update(await listSettings(client.username))
    }
}