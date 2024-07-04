const { ActionRowBuilder } = require("@discordjs/builders")
const { queryParams } = require("../../db/db")
const { ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = async (user, profile) => {
    let profiles = await queryParams(`SELECT * FROM profiles WHERE user_id=?`, [user])

    let addButton = new ButtonBuilder().setCustomId("addprofile").setLabel("Add Profile").setEmoji({ name: "➕" }).setStyle(ButtonStyle.Success)


    if (profiles.length == 0) {
        return {
            embeds: [{
                title: `No profiles`,
                description: `You don't have any profiles yet!\nYou can add some using the add button below!`,
                color: 0x00ff00
            }],
            ephemeral: true,
            components: [new ActionRowBuilder().addComponents(addButton)]
        }
    }


    else {
        if (profile > profiles.length) {
            profile = profiles.length
        } else if (profile < 1) {
            profile = 1
        }
        let embed = JSON.parse(profiles[profile - 1].embed)
        let deleteButton = new ButtonBuilder().setCustomId("deleteprofile|" + profiles[profile - 1].id).setLabel("Delete Profile").setEmoji({ name: "🗑️" }).setStyle(ButtonStyle.Danger)
        let forward = parseInt(profile) + 1
        let backward = parseInt(profile) - 1
        return {
            embeds: [embed],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId("moveprofile|1|2").setEmoji({ name: "⏪" }).setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("moveprofile|" + (backward) + "|22").setEmoji({ name: "◀️" }).setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("showbutton").setLabel(profile + "/" + profiles.length).setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder().setCustomId("moveprofile|" + (forward) + "|222").setEmoji({ name: "➡️" }).setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId("moveprofile|" + profiles.length + "|2222").setEmoji({ name: "⏩" }).setStyle(ButtonStyle.Primary)
                ),
                new ActionRowBuilder().addComponents(addButton, deleteButton)],
            ephemeral: true
        }
    }
}