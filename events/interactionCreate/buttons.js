const getButtons = require("../../utils/getButtons");
const { queryParams } = require("../../../db/db");
const cliColor = require('cli-color');
module.exports = async (client, interaction) => {
  if (!interaction.isButton()) return;
  const Buttons = getButtons(__dirname);
  try {
    let button = Buttons.find((button) => button.name === interaction.customId.split("|")[0])
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
      button = Buttons.find((button) => button.name === interaction.customId.split("|")[0]);
    }
    if (!button) return;
    if (button.ownerOnly) {
      if (interaction.user.id != client.username) {
        if (client.username != interaction.user.id) return interaction.reply({ content: `Invalid permissions!`, ephemeral: true })
      }
    }

    if (button.adminOnly) {
      let users = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, interaction.user.id])
      if ((users.length == 0 || !users[0]?.admin) && client.username != interaction.user.id) {
        return interaction.reply({ content: `Invalid permissions!`, ephemeral: true })
      }
    }
    if (button.userOnly) {
      let users = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, interaction.user.id])
      if (users.length == 0 && client.username != interaction.user.id) {
        return interaction.reply({ content: `You don't have access to this bot!`, ephemeral: true })
      }
    }
    console.log(`B]${cliColor.yellow(button.name)} ${cliColor.blue(interaction.user.username)} ${cliColor.red(interaction.customId)}`);
    await button.callback(client, interaction);
  } catch (e) {
    console.log(e);
  }
};
