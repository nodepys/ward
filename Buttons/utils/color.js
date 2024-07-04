const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "color",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`color`, `color`, [{
   setCustomId: 'color',
   setMaxLength: 6,
   setMinLength: 1,
   setRequired: true,
   setLabel: "Color",
   setPlaceholder: "Type the desired Color.",
   setStyle: TextInputStyle.Short
  }]))
 }
}