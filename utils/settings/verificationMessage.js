const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { queryParams } = require("../../../db/db")
const defaultEmbeds = require("../defaultEmbeds")

module.exports = async (user_id, type) => {
    const title = new ButtonBuilder().setCustomId("title").setLabel("Title").setStyle(ButtonStyle.Primary)
    const description = new ButtonBuilder().setCustomId("description").setLabel("Description").setStyle(ButtonStyle.Primary)
    const author = new ButtonBuilder().setCustomId("author").setLabel("Author").setStyle(ButtonStyle.Primary)
    const authorUrl = new ButtonBuilder().setCustomId("authorurl").setLabel("Author URL").setStyle(ButtonStyle.Primary)
    const thumbnai = new ButtonBuilder().setCustomId("thumbnail").setLabel("Thumbnail").setStyle(ButtonStyle.Primary)
    const color = new ButtonBuilder().setCustomId("color").setLabel("Color").setStyle(ButtonStyle.Primary)
    const imageUrl = new ButtonBuilder().setCustomId("image").setLabel("Image").setStyle(ButtonStyle.Primary)
    const footer = new ButtonBuilder().setCustomId("footer").setLabel("Footer").setStyle(ButtonStyle.Primary)
    const footerUrl = new ButtonBuilder().setCustomId("footerurl").setLabel("Footer URL").setStyle(ButtonStyle.Primary)
    const save = new ButtonBuilder().setCustomId("save|" + type).setLabel("Save").setEmoji("💾").setStyle(ButtonStyle.Success)
    const del = new ButtonBuilder().setCustomId("delete|" + type).setLabel("Delete").setEmoji("🗑️").setStyle(ButtonStyle.Danger)
    let embed = await queryParams(`SELECT * FROM embeds WHERE user_id=? AND type=?`, [user_id, type])
    if (embed.length == 0) {
        embed = defaultEmbeds(type)
    } else {
        embed = JSON.parse(embed[0].embed)
    }
    return {
        embeds: [embed],
        components: [new ActionRowBuilder().addComponents(title, description, author, authorUrl, thumbnai), new ActionRowBuilder().addComponents(imageUrl, footer, footerUrl, color), new ActionRowBuilder().addComponents(save, del)],
        ephemeral: true
    }
}