const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "title",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`title`, `Title`, [{
   setCustomId: 'title',
   setMaxLength: 256,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Embed title",
   setPlaceholder: "Type the desired embed title.",
   setStyle: TextInputStyle.Paragraph
  }]))
 }
}