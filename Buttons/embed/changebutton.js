const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "changebutton",
    callback: async (client, interaction) => {
        let type = interaction.customId.split("|")[1]
        let buttons = [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("buttonlabel").setEmoji("🏷️").setLabel("Button Label").setStyle(ButtonStyle.Primary),
            )
        ]
        if (type != "oauth") {
            buttons[0].addComponents(new ButtonBuilder().setCustomId("buttoncolor").setEmoji("🎨").setLabel("Button Color").setStyle(ButtonStyle.Primary))
        }
        buttons[0].addComponents(
            new ButtonBuilder().setCustomId("savebutton|" + interaction.customId.split("|")[1]).setEmoji("✏️").setLabel("Your button").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("buttonemoji").setEmoji("😎").setLabel("Button Emoji").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("deletebutton|"+type).setEmoji("🗑️").setLabel("Delete button").setStyle(ButtonStyle.Danger)
        )
        return interaction.reply({
            embeds: [{
                title: `Change your button`,
                description: `Change how your button looks like using these controls\nAfter you finish, click on your button to save!\n\n**Note**\nLink Buttons must have the color Gray in discord!`,
                color: 0xEB9C6C
            }],
            ephemeral: true,
            components: buttons
        })
    }
}