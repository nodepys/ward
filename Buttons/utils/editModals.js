const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "editmodals",
    adminOnly: true,
    callback: async (client, interaction) => {
        return interaction.reply({
            embeds: [{
                title: `Which Modal do you want to change?`,
                color: 0xC8C8C8
            }],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("modal|main").setLabel("Change Linking Modal").setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("modal|code").setLabel("Change Confirming Code Modal").setStyle(ButtonStyle.Primary)
                )],
            ephemeral: true
        })
    }
}