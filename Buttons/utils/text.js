const { Client } = require("discord.js");
const modalBuilder = require("../../utils/modalBuilder");

let text = {
 name: `text`,
 userOnly: true,
 callback: async (client, interaction) => {
  let id = interaction.customId.split("|").slice(1).join("|")
  interaction.showModal(modalBuilder(
   `text|${id}`, `Message`, [
   {
    setCustomId: 'message',
    setMaxLength: 2000,
    setMinLength: 0,
    setRequired: true,
    setLabel: "Message",
    setPlaceholder: "Your message",
    setStyle: 2
   }
  ]
  ))
 }
};
module.exports = text;
