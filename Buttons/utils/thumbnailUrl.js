const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "thumbnail",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`thumbnail`, `thumbnail`, [{
   setCustomId: 'thumbnail',
   setMaxLength: 4000,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Thumbnail",
   setPlaceholder: "Type the desired thumbnail.",
   setStyle: TextInputStyle.Short
  }]))
 }
}