const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders")
const { queryParams } = require("../../db/db")
const { ButtonStyle } = require("discord.js")

module.exports = async (id, current) => {
    let embed = {
        title: `Users Panel`,
        color: 0x808080
    }
    let buttons = []

    let msg = {
        ephemeral: true
    }
    let users = await queryParams(`SELECT * FROM users WHERE user_id=?`, [id])
    if (users.length == 0) {
        embed.description = `No Users!\nUse the Add Button to add users using their ID!`
    } else {
        if (users.length < current) { current = users.length }
        if (current < 1) { current = 1 }
        embed.description = `<@${users[current - 1].child}>`
        let userId = users[current - 1].child
        let controlButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("removeuser" + "|" + userId).setEmoji({ name: "⛔" }).setLabel("Remove").setStyle(ButtonStyle.Danger))


        let moveButtons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("moveusers|1|2").setEmoji({ name: "⏪" }).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("moveusers|" + parseInt(parseInt(current) - 1).toString() + "|22").setStyle(ButtonStyle.Primary).setEmoji({ name: "◀️" }),
            new ButtonBuilder().setCustomId("currentusers").setLabel(current + "/" + users.length).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("moveusers|" + parseInt(parseInt(current) + 1).toString() + "|222").setEmoji({ name: "➡️" }).setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("moveusers|" + users.length + "|2222").setStyle(ButtonStyle.Primary).setEmoji({ name: "⏩" })
        )

        if (users[current - 1].claiming == 1) {
            controlButtons.addComponents(new ButtonBuilder().setCustomId("claiming" + "|" + userId + "|" + current + "|-1").setEmoji({ name: "✅" }).setLabel("Full Claiming").setStyle(ButtonStyle.Success))
        } else if (users[current - 1].claiming == 0) {
            controlButtons.addComponents(new ButtonBuilder().setCustomId("claiming" + "|" + userId + "|" + current + "|1").setEmoji({ name: "✅" }).setLabel("SSID Claiming").setStyle(ButtonStyle.Primary))
        } else {
            controlButtons.addComponents(new ButtonBuilder().setCustomId("claiming" + "|" + userId + "|" + current + "|0").setEmoji({ name: "❌" }).setLabel("Claiming Disabled").setStyle(ButtonStyle.Danger))
        }
        if (users[current - 1].admin == 1) {
            controlButtons.addComponents(new ButtonBuilder().setCustomId("admin" + "|" + userId + "|" + current).setEmoji({ name: "❌" }).setLabel("Remove Admin").setStyle(ButtonStyle.Danger))
        } else {
            controlButtons.addComponents(new ButtonBuilder().setCustomId("admin" + "|" + userId + "|" + current).setEmoji({ name: "✅" }).setLabel("Make admin").setStyle(ButtonStyle.Success))
        }
        buttons.push(controlButtons)
        buttons.push(moveButtons)
    }
    buttons.push(new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("adduser").setEmoji({ name: "➕" }).setLabel("Add User").setStyle(ButtonStyle.Success)))
    msg.embeds = [embed]
    msg.components = buttons
    return msg

}