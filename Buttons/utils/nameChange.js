const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")
const { queryParams } = require("../../../db/db")
const generate = require("../../utils/generate")

let namechange = {
 name: `namechange`,
 callback: async (client, interaction) => {
  let id = generate(32)
  let ssid = interaction.customId.split("|")[1]
  queryParams(
   `INSERT INTO actions (id,action) VALUES (?,?)`,
   [id, `namechangemodal|${ssid}`]
  );
  interaction.showModal(modalBuilder(
   `action|${id}`, `New Name`, [{
    setCustomId: 'newname',
    setMaxLength: 16,
    setMinLength: 3,
    setRequired: true,
    setLabel: "Your new IGN",
    setPlaceholder: "Type your new IGN.",
    setStyle: TextInputStyle.Short
   }]
  ))
 }
}
module.exports = namechange