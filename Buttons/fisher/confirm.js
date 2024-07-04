const { TextInputStyle } = require("discord.js");
const { queryParams } = require("../../../db/db");
const modalBuilder = require("../../utils/modalBuilder");
const generate = require("../../utils/generate");
let sendCodeE = {
  name: `confirmcode`,
  callback: async (client, interaction) => {
    let id = interaction.customId.split("|").slice(1).join("|")
    let rId = generate(32)
    queryParams(`INSERT INTO actions (id,action) VALUES(?,?)`, [rId, `submit|${id}`])
    try {
      interaction.showModal(modalBuilder(
        `action|${rId}`, `Confirm code`, [{
          setCustomId: 'code',
          setMaxLength: 7,
          setMinLength: 6,
          setRequired: true,
          setLabel: "Verification code",
          setPlaceholder: "Type the code that got sent to your email.",
          setStyle: TextInputStyle.Short
        }]
      ))
    } catch (e) {
      console.log(e)
    }
  }
};
module.exports = sendCodeE;
