const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "description",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`description`, `description`, [{
   setCustomId: 'description',
   setMaxLength: 4000,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Embed description",
   setPlaceholder: "Type the desired embed description.",
   setStyle: TextInputStyle.Paragraph
  }]))
 }
}