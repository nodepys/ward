const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "editbuttons",
    adminOnly: true,
    callback: async (client, interaction) => {
        return interaction.reply({
            embeds: [{
                title: `Which Button do you want to change?`,
                color: 0xC8C8C8
            }],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("changebutton|link account").setLabel("Change Link Account Button").setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("changebutton|oauth").setLabel("Change OAuth Button").setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("changebutton|code").setLabel("Change Submit Code Button").setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("changebutton|howto").setLabel("Change How To Button").setStyle(ButtonStyle.Primary)
                )
            ],
            ephemeral: true
        })
    }
}