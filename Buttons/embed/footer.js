const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "footer",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`footer`, `footer`, [{
   setCustomId: 'footer',
   setMaxLength: 2048,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Footer",
   setPlaceholder: "Type the desired Footer.",
   setStyle: TextInputStyle.Short
  }]))
 }
}