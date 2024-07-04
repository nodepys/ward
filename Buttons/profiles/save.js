const { queryParams } = require("../../../db/db")

module.exports = {
    name: "saveprofile",
    callback: async (client, interaction) => {
        let profiles = await queryParams(`SELECT * FROM profiles WHERE user_id=?`, [interaction.user.id])
        if (profiles.length >= 5) {
            return interaction.update(`You already reached the maximum number of profiles **5**!`)
        } else {
            let embed = JSON.stringify(interaction.message.embeds[0].data)
            await queryParams(`INSERT INTO profiles(user_id,embed) VALUES(?,?)`, [interaction.user.id, embed])
            return interaction.update(`Saved your embed!`)
        }
    }
}