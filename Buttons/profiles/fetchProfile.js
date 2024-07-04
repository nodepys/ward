const { queryParams } = require("../../../db/db")

module.exports = {
    name: "fetchprofile",
    callback: async (client, interaction) => {
        let profile = await queryParams(`SELECT * FROM profiles WHERE id=? AND user_id=?`, [interaction.customId.split("|")[1], interaction.user.id])
        if (profile.length == 0) {
            return interaction.update(`Couldn't get the profile!`)
        } else {
            let embed = JSON.parse(profile[0].embed)
            return interaction.update({
                embeds: [embed],
                components: interaction.message.components
            })
        }
    }
}