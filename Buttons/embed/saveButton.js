const { queryParams } = require("../../../db/db")

module.exports = {
 name: "savebutton",
 adminOnly: true,
 callback: async (client, interaction) => {
  let type = interaction.customId.split("|")[1]
  let button
  if (type == "oauth") {
   button = interaction.message.components[0].components[1].data
   delete button.custom_id
   button.type = 2
   button.style = 5
  } else {
   button = interaction.message.components[0].components[2].data
   button.custom_id = type
  }
  let exist = await queryParams(`SELECT * FROM buttons WHERE user_id=? AND type=?`, [client.username, type])
  if (exist.length == 0) {
   await queryParams(`INSERT INTO buttons(user_id,type,button) VALUES(?,?,?)`, [client.username, type, JSON.stringify(button)])
   return interaction.update({ content: `Saved your button` })
  } else {
   await queryParams(`UPDATE buttons SET button=? WHERE user_id=?`, [JSON.stringify(button), client.username])
   return interaction.update({ content: `Saved your button` })
  }
 }
}