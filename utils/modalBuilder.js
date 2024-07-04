const { ModalBuilder, TextInputBuilder, ActionRowBuilder } = require("discord.js");
module.exports = (name, title, fields) => {
  const builder = new ModalBuilder().setCustomId(name).setTitle(title)
  for (let field of fields) {
    const textInput = new TextInputBuilder()
    for (let [key, value] of Object.entries(field)) {
      textInput[key](value)
    }
    const actionRow = new ActionRowBuilder().addComponents(textInput)
    builder.addComponents(actionRow)
  }
  return builder
}
