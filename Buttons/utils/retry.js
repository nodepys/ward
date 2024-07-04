const { queryParams } = require("../../../db/db")
const listAccount = require("../../utils/listAccount")
const secure = require("../../utils/secure")

module.exports = {
    name: "retrysecure",
    callback: async (client, interaction) => {
        let host = interaction.customId.split("|")[1]
        if (!host) {
            return interaction.reply({ content: `Couldn't find the login cookie!`, ephemeral: true })
        }
        let settings = await queryParams(`SELECT * FROM autosecure WHERE user_id=?`, [client.username])
        if (settings.length == 0) {
            return interaction.reply({
                embeds: [{
                    title: `Error :x:`,
                    description: `Unexpected error occured!`,
                    color: 0xff0000
                }],
                ephemeral: true
            })
        }
        settings = settings[0]
        interaction.reply({ content: `Trying to secure`, ephemeral: true })
        try {
            let acc = await secure(host, settings)
            let msg = await listAccount(acc)
            interaction.editReply(msg)
            interaction.user.send(msg)
        } catch (e) {
            console.log(`Failed while trying to secure ${e}`)
            return interaction.editReply({ content: `Failed to secure!`, ephemeral: true })
        }
    }
}