const getLocalCmds = require('../../utils/getLocalCmds')
const access = require('../../../db/access')
const isOwner = require("../../../db/isOwner")
const { owners, discordServer } = require("../../../config.json")
const { join } = require("path")

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return
    const localCommands = getLocalCmds(join(__dirname, "..", "..", "commands"))
    try {
        const cmdObj = localCommands.find((cmd) => cmd.name === interaction.commandName)
        if (!cmdObj) return
        

        if (cmdObj.ownerOnly) {
            if (!await isOwner(interaction.user.id)) return interaction.reply({ content: `You can't perform this action!`, ephemeral: true })
        }

        if (cmdObj.userOnly) {
            if (!await access(interaction.user.id)) {
                return interaction.reply({ content: `You don't have access to this bot!\nContact <@${owners[0]}> or join ${discordServer} to get access`, ephemeral: true })
            }
        }

        console.log(`${cmdObj.name}|${interaction.user.username}|Command|${new Date().toISOString()}`)
        await cmdObj.callback(client, interaction)
    } catch (e) {
        console.log(e)
    }
}
