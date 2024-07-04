const { queryParams } = require("../../../db/db")

module.exports = {
    name: "delete",
    adminOnly: true,
    callback: async (client, interaction) => {
        let type = interaction.customId.split("|")[1]
        await queryParams(`DELETE FROM embeds WHERE type=? AND user_id=?`, [type, client.username])
        return interaction.update({ content: `Deleted your ${type} embed!`, ephemeral: true })
    }
}