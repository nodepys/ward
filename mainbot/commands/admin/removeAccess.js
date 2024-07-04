const { ApplicationCommandOptionType, WebhookClient } = require("discord.js")
const { queryParams } = require("../../../db/db")
const { notifierWebhook } = require("../../../config.json")
const access = require("../../../db/access")
const { autosecureMap } = require("../../handlers/botHandler")
module.exports = {
    name: "removeaccess",
    description: "Take away access from someone",
    options: [
        {
            name: "user",
            description: "User to take away access from",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    callback: async (client, interaction) => {
        let user = interaction.options.getUser("user")
        if (await access(user.id)) {
            try {
                let webhook = new WebhookClient({ url: notifierWebhook })
                webhook.send({ content: `<@${interaction.user.id}> took away access from <@${user.id}>` })
                await queryParams(`DELETE FROM autosecure WHERE user_id=?`, [user.id])
                try {
                    let c = await autosecureMap.get(user.id);
                    if (c) {
                        c?.destroy()
                    }
                    autosecureMap?.delete(interaction.user.id);
                } catch (e) {
                    console.log(e)
                }
                return interaction.reply({
                    content: `Took away access from <@${user.id}>`,
                    ephemeral: true
                })
            }catch(e){
                console.log(e)
            }
            }else {
            return interaction.reply({
                content: `<@${user.id}> doesn't have access!`,
                ephemeral: true
            })
        }
    }
}