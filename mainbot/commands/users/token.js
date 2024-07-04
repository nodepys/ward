const { queryParams } = require("../../../db/db")

module.exports = {
    name: "token",
    description: `Change your token!`,
    options: [{
        name: "token",
        description: `Change the token`,
        type: 3,
        required: true
    }],
    userOnly: true,
    callback: async (client, interaction) => {
        let token = interaction.options.getString("token")
        try {
            await queryParams(`UPDATE autosecure SET token=? WHERE user_id=?`, [token,interaction.user.id])
            return interaction.reply({
                content:`Changed your bot token!`,
                ephemeral: true
            })
        } catch (e) {
            return interaction.reply({ content: `Failed to update your token!`, ephemeral: true })
        }
    }
}