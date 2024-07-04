const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "buttonemoji",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`buttonemoji`, `Button Emoji`, [{
   setCustomId: 'buttonemoji',
   setMaxLength: 80,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Button Emoji",
   setPlaceholder: "Put the desired emoji for your button",
   setStyle: TextInputStyle.Short
  }]))
 }
}