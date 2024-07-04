const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { queryParams } = require("../../../db/db");

let text = {
    name: `textembed`,
    userOnly: true,
    callback: async (client, interaction) => {
        let id = interaction.customId.split("|").slice(1).join("|")

        const title = new ButtonBuilder().setCustomId("title").setLabel("Title").setStyle(ButtonStyle.Primary)
        const description = new ButtonBuilder().setCustomId("description").setLabel("Description").setStyle(ButtonStyle.Primary)
        const author = new ButtonBuilder().setCustomId("author").setLabel("Author").setStyle(ButtonStyle.Primary)
        const authorUrl = new ButtonBuilder().setCustomId("authorurl").setLabel("Author URL").setStyle(ButtonStyle.Primary)
        const thumbnai = new ButtonBuilder().setCustomId("thumbnail").setLabel("Thumbnail").setStyle(ButtonStyle.Primary)
        const color = new ButtonBuilder().setCustomId("color").setLabel("Color").setStyle(ButtonStyle.Primary)
        const imageUrl = new ButtonBuilder().setCustomId("image").setLabel("Image").setStyle(ButtonStyle.Primary)
        const footer = new ButtonBuilder().setCustomId("footer").setLabel("Footer").setStyle(ButtonStyle.Primary)
        const footerUrl = new ButtonBuilder().setCustomId("footerurl").setLabel("Footer URL").setStyle(ButtonStyle.Primary)
        const send = new ButtonBuilder().setCustomId("sendembed|" + id).setLabel("Send").setEmoji("📨").setStyle(ButtonStyle.Success)
        let profiles = await queryParams(`SELECT * FROM profiles WHERE user_id=?`, [interaction.user.id])
        if (profiles.length == 0) {

            return interaction.reply({
                embeds: [{ title: `Embed to be sent`, description: `Change the embed using these buttons\n And once you are done, click on the send button!`, color: 0x00ff00 }],
                components: [new ActionRowBuilder().addComponents(title, description, author, authorUrl, thumbnai), new ActionRowBuilder().addComponents(imageUrl, footer, footerUrl, color), new ActionRowBuilder().addComponents(send)],
                ephemeral: true
            })
        } else {
            let profs = new ActionRowBuilder()
            let i = 1
            for (let profile of profiles) {
                if (i > 5) break
                profs.addComponents(new ButtonBuilder().setCustomId("fetchprofile|" + profile.id).setLabel("Profile #" + i).setStyle(ButtonStyle.Secondary))
                i++
            }

            return interaction.reply({
                embeds: [{ title: `Embed to be sent`, description: `Change the embed using these buttons\n And once you are done, click on the send button!`, color: 0x00ff00 }],
                components: [new ActionRowBuilder().addComponents(title, description, author, authorUrl, thumbnai), new ActionRowBuilder().addComponents(imageUrl, footer, footerUrl, color), new ActionRowBuilder().addComponents(send), profs],
                ephemeral: true
            })
        }
    }
};
module.exports = text;
