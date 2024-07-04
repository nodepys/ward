const { ApplicationCommandOptionType, ActionRow, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
module.exports = (panel) => {
 let Secure = new ButtonBuilder()
 let Logging = new ButtonBuilder()
 if (panel?.autosecure == "1") {
  Secure.setLabel(`Disable autosecure`).setCustomId("disableautosecure").setEmoji("⚠️").setStyle(ButtonStyle.Danger)
 } else {
  Secure.setLabel(`Enable autosecure`).setCustomId("enableautosecure").setEmoji("✅").setStyle(ButtonStyle.Success)
 }
 if (panel?.logging == "1") {
  Logging.setLabel("Disable logging").setCustomId("disablelogging").setEmoji("⚠️").setStyle(ButtonStyle.Danger)
 } else {
  Logging.setLabel(`Enable logging`).setCustomId("enablelogging").setEmoji("✅").setStyle(ButtonStyle.Success)
 }
 return {
  embeds: [{
   title: `Settings`,
   description: `Autosecure: ${panel?.autosecure == 1 ? ":white_check_mark:" : ":x:"}\nLogging: ${panel?.logging == 1 ? ":white_check_mark:" : ":x:"}`,
   color: 0x00ff00,
  }],
  components: [new ActionRowBuilder().addComponents(Secure).addComponents(Logging)],
  ephemeral: true
 }
}