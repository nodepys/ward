const { queryParams } = require("../../../db/db")

module.exports = {
 name: "deletebutton",
 adminOnly: true,
 callback: async (client, interaction) => {
  let type = interaction.customId.split("|")[1]
  await queryParams(`DELETE FROM buttons WHERE user_id=? AND type=?`, [client.username, type])
  return interaction.update({ content: `Deleted your button!` })
 }
}