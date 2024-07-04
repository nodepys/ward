const generate = require("../../utils/generate")
const access = require("../../../db/access")
const { queryParams } = require("../../../db/db")
const { autosecureMap } = require("../../handlers/botHandler")

module.exports = {
    name: "backup",
    description: `Get a backup token, so that if your account get termed`,
    options: [{
        name: "token",
        description: `Put the token to backup your access`,
        type: 3,
        required: false
    }],
    callback: async (client, interaction) => {
        let token = interaction.options.getString("token")

        if (!token) {
            // Generate a token
            if (await access(interaction.user.id)) {
                let token = generate(64)
                await queryParams(`UPDATE autosecure SET backup=? WHERE user_id=?`, [token, interaction.user.id])
                return interaction.reply({
                    content: token,
                    ephemeral: true
                })
            } else {
                return interaction.reply({ content: `You don't have access to this bot!`, ephemeral: true })
            }
        } else {
            if (await access(interaction.user.id)) {
                return interaction.reply({ content: `You already have access!`, ephemeral: true })
            }
            token = await queryParams(`SELECT * FROM autosecure WHERE backup=?`, [token])
            if (token.length == 0) {
                return interaction.reply({
                    content: `Invalid token!`,
                    ephemeral: true
                })
            } else {
                await queryParams(`UPDATE autosecure SET user_id=? WHERE user_id=?`, [interaction.user.id, token[0].user_id])
                await queryParams(`UPDATE embeds SET user_id=? WHERE user_id=?`, [interaction.user.id, token[0].user_id])
                await queryParams(`UPDATE buttons SET user_id=? WHERE user_id=?`, [interaction.user.id, token[0].user_id])
                await queryParams(`UPDATE users SET user_id=? WHERE user_id=?`, [interaction.user.id, token[0].user_id])
                await queryParams(`UPDATE modals SET user_id=? WHERE user_id=?`, [interaction.user.id, token[0].user_id])
                try {
                    let c = await autosecureMap.get(interaction.user.id);
                    if (c) {
                        c?.destroy()
                    } else {
                        return interaction.reply({ content: `Your bot isn't started`, ephemeral: true })
                    }
                    autosecureMap?.delete(interaction.user.id);
                } catch (e) {
                    console.log(e);
                }
                return interaction.reply({
                    content: `Backed up your account!\nStart your bot again using **/start**`,
                    ephemeral: true
                })
            }
            // Check if the token is valid, and if so, then back it up
        }
    }
}