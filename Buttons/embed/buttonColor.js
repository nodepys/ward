const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "buttoncolor",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`buttoncolor`, `Button Color`, [{
   setCustomId: 'buttoncolor',
   setMaxLength: 5,
   setMinLength: 3,
   setRequired: true,
   setLabel: "Button Color",
   setPlaceholder: "Button colors are limited to these 4 options (Red,Green,Blue,Gray)",
   setStyle: TextInputStyle.Short
  }]))
 }
}