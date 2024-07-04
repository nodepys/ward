const { queryParams } = require("../../../db/db")

module.exports = {
    name: "save",
    adminOnly: true,
    callback: async (client, interaction) => {
        let embed = interaction.message.embeds[0].data
        let type = interaction.customId.split("|")[1]
        let d = await queryParams(`SELECT * FROM embeds WHERE user_id=? AND type=? LIMIT 1`, [client.username, type])
        if (d.length == 0) {
            await queryParams(`INSERT INTO embeds(user_id,type,embed) VALUES(?,?,?)`, [client.username, type, JSON.stringify(embed)])
            return interaction.update({ content: `Saved your ${type} embed!`, ephemeral: true })
        } else {
            await queryParams(`UPDATE embeds SET embed=? WHERE user_id=? AND type=?`, [JSON.stringify(embed), client.username, type])
            return interaction.update({ content: `Updated your ${type} embed!`, ephemeral: true })
        }
    }
}