const getLocalCmds = require('../../utils/getLocalCmds');
const { join } = require('path');
const { queryParams } = require('../../../db/db');
const cliColor = require('cli-color');
module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return
  let exceptions = ["status", "emails"]
  if (!interaction.guild) {
    if (!exceptions.includes(interaction.commandName))

      return interaction.reply({
        embeds: [{
          title: `Error`,
          description: `Can't use commands in DMS!`,
          color: 0xff0000
        }],
        ephemeral: true
      })
  }
  const localCommands = getLocalCmds(join(__dirname, "..", "..", "Commands"))
  try {
    const cmdObj = localCommands.find((cmd) => cmd.name === interaction.commandName)
    if (!cmdObj) return



    if (cmdObj.ownerOnly) {
      if (interaction.user.id != client.username) {return interaction.reply({ content: `Invalid permissions!`, ephemeral: true })}
    }
    if (cmdObj.adminOnly) {
      let users = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, interaction.user.id])
      if ((users.length == 0 || !users[0]?.admin) && client.username != interaction.user.id) {
        return interaction.reply({ content: `Invalid permissions!`, ephemeral: true })
      }
    }
    if (cmdObj.userOnly) {
      let users = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, interaction.user.id])
      if (users.length == 0 && client.username != interaction.user.id) {
        return interaction.reply({ content: `You don't have access to this bot!`, ephemeral: true })
      }
    }
    console.log(`/${cliColor.yellow(cmdObj.name)} ${interaction.user.username} ${new Date().toISOString()}`)
    // console.log(`${cmdObj.name}|${interaction.user.username}|Command|${new Date().toISOString()}`)
    await cmdObj.callback(client, interaction)


  } catch (e) {
    console.log(e)
  }
}