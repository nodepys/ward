const { ButtonStyle, ButtonBuilder } = require("discord.js")

module.exports = (type, obj) => {
  switch (type) {
    case "oauth":
      return new ButtonBuilder()
        .setEmoji("✅")
        .setStyle(ButtonStyle.Link)
        .setLabel(`Link`)
        .setURL(obj.url)
    case "howto":
      return new ButtonBuilder().
        setCustomId("howto|").
        setEmoji("📙").
        setLabel("How to?").
        setStyle(ButtonStyle.Primary)
    case "link account":
      return new ButtonBuilder()
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success)
        .setLabel(`Link Account`)
        .setCustomId(`link account`)
    case "code":
      return new ButtonBuilder()
        .setEmoji("✅")
        .setStyle(ButtonStyle.Success)
        .setLabel(`Submit Code`)
        .setCustomId(`submit`)
      return
    default:
      console.log(`Invalid button type ${type}`)
      break;
  }
}