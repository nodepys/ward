const getModals = require('../../utils/getModals');
const { queryParams } = require('../../../db/db');
const clicolor = require("cli-color")
module.exports = async (client, interaction) => {
  if (!interaction.isModalSubmit()) return
  const Modals = getModals(__dirname)
  try {

    let modal = Modals.find((modal) => modal.name === interaction.customId.split("|")[0])
    if (interaction.customId.includes("|cc")) {
      modal = Modals.find((mod) => mod.name === `verify code`)
    }
    if (interaction.customId.split("|")[0] == "action") {
      let action = await queryParams(`SELECT * FROM actions WHERE id=?`, [
        interaction.customId.split("|")[1],
      ]);
      if (action.length == 0)
        return interaction.reply({
          embeds: [
            {
              title: `Error :x:`,
              description: `Please try again later!`,
              color: 0xff0000,
            },
          ],
          ephemeral: true,
        });
      interaction.customId = action[0].action
      modal = Modals.find((modal) => modal.name === interaction.customId.split("|")[0])

    }
    if (!modal) return

    if (modal.ownerOnly) {
      if (interaction.user.id != client.username) {
        if (client.username != interaction.user.id) return interaction.reply({ content: `Invalid permissions!`, ephemeral: true })
      }
    }
    if (modal.userOnly) {
      let users = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, interaction.user.id])
      if (users.length == 0 && client.username != interaction.user.id) {
        return interaction.reply({ content: `You don't have access to this bot!`, ephemeral: true })
      }
    }
    console.log(`M]${clicolor.yellow(modal.name)} ${clicolor.blue(interaction.user.username)} ${clicolor.red(interaction.customId)}`)
    await modal.callback(client, interaction)
  } catch (e) {
    console.log(e)
  }
}