const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "buttonlabel",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`buttonlabel`, `Button Label`, [{
   setCustomId: 'buttoncolor',
   setMaxLength: 80,
   setMinLength: 1,
   setRequired: true,
   setLabel: "Button Label",
   setPlaceholder: "Put your desired button label",
   setStyle: TextInputStyle.Short
  }]))
 }
}