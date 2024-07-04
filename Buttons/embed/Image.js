const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "image",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`image`, `image`, [{
   setCustomId: 'image',
   setMaxLength: 4000,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Image",
   setPlaceholder: "Type the desired Image.",
   setStyle: TextInputStyle.Short
  }]))
 }
}