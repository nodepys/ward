const { ApplicationCommandOptionType, WebhookClient, Client } = require("discord.js")
const { queryParams } = require("../../../db/db")
const { notifierWebhook } = require("../../../config.json")
const access = require("../../../db/access")
const isOwner = require("../../../db/isOwner")
module.exports = {
    name: "giveaccess",
    description: "Give access to someone to use a module",
    options: [
        {
            name: "user",
            description: "User to give access",
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
    callback: async (client, interaction) => {
        if (!await isOwner(interaction.user.id)) return interaction.reply({
            embeds: [{
                title: `Error :x:`,
                description: `Invalid permissions`,
                color: 0xff0000
            }],
            ephemeral: true
        })

        let user = interaction.options.getUser("user")

        if (!await access(user.id)) {

            try {
                try {
                    let webhook = new WebhookClient({ url: notifierWebhook })
                    await webhook.send({ content: `<@${interaction.user.id}> Gave <@${user.id}> access to autosecure` })
                } catch (e) {
                    console.log(`Invalid notifier webhook!`)
                }
                await queryParams(`INSERT INTO autosecure(user_id) VALUES(?)`, [user.id])

                interaction.reply({
                    content: `Gave <@${user.id}> access to autosecure!`,
                    ephemeral: true
                })

                let command, command2, command3 = null;

                (await client.application.commands.fetch()).forEach(cmd => {
                    if (cmd.name === `guide`) {
                        command = cmd
                    } else if (cmd.name === `token`) {
                        command2 = cmd
                    } else if (cmd.name === `start`) {
                        command3 = cmd
                    }
                })

                user.send({ content: `<@${interaction.user.id}> Gave you access to auto secure!\nUse the command </${command?.name}:${command?.id}> to know how to get your token!\nAfter that put your token in the bot using the command </${command2.name}:${command2?.id}>\nAnd then start your bot using the command </${command3.name}:${command3?.id}>` })

            } catch (e) {

                console.log(e)

                return interaction.reply({ content: `Failed to give <@${user.id}> access to autosecure!`, ephemeral: true })

            }
        } else {
            return interaction.reply({
                content: `<@${user.id}> already has access to autosecure!`,
                ephemeral: true
            })
        }
    }
}