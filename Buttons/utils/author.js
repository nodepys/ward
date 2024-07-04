const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "author",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`author`, `Author`, [{
   setCustomId: 'author',
   setMaxLength: 256,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Author Name",
   setPlaceholder: "Type the desired Author Name.",
   setStyle: TextInputStyle.Short
  }]))
 }
}