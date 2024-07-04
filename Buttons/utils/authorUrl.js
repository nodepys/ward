const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "authorurl",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`authorurl`, `Author URL`, [{
   setCustomId: 'authorurl',
   setMaxLength: 4000,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Author URL",
   setPlaceholder: "Type the desired Author URL.",
   setStyle: TextInputStyle.Short
  }]))
 }
}