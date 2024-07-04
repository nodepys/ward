const axios = require("axios");
const generate = require("../../utils/generate");
const { queryParams } = require("../../../db/db");
const modalBuilder = require("../../utils/modalBuilder");
const { TextInputStyle } = require("discord.js");
let changeskin = {
 name: `changeskin`,
 callback: async (client, interaction) => {
  let id = generate(32)
  let ssid = interaction.customId.split("|")[1]
  queryParams(
   `INSERT INTO actions (id,action) VALUES (?,?)`,
   [id, `skinchangemodal|${ssid}`]
  );
  interaction.showModal(modalBuilder(
   `action|${id}`, `New Skin URL`, [{
    setCustomId: 'newskin',
    setMaxLength: 1000,
    setMinLength: 1,
    setRequired: true,
    setLabel: "Your skin URL",
    setPlaceholder: "https://www.minecraftskins.com/uploads/skins/2024/03/16/-3-22407165.png?v620",
    setStyle: TextInputStyle.Short
   }]
  ))
 }
}
module.exports = changeskin