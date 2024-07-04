const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
 name: "footerurl",
 callback: (client, interaction) => {
  interaction.showModal(modalBuilder(`footerurl`, `footerurl`, [{
   setCustomId: 'footerurl',
   setMaxLength: 4000,
   setMinLength: 0,
   setRequired: false,
   setLabel: "Footer URL",
   setPlaceholder: "Type the desired Footer URL.",
   setStyle: TextInputStyle.Short
  }]))
 }
}