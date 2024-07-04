const { ActionRowBuilder, ButtonBuilder } = require("@discordjs/builders");
const { ButtonStyle } = require("discord.js");
const { queryParams } = require("../../../db/db");

module.exports = {
    name: "modal",
    callback: async (client, interaction) => {
        switch (interaction.customId.split("|")[1]) {
            case "main":
                let desc = ""
                let modal = await queryParams(`SELECT * FROM modals WHERE user_id=? AND modal=?`, [client.username, "main"])
                if (modal.length == 0) {
                    desc = `title=`
                }
                return interaction.reply({
                    embeds: [{
                        title: `Edit the Linking Account Modal!`,
                        description: desc,
                        color: 0x00ff00
                    }],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId("modaltitle|main").setLabel("Title").setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId("modalinput|main|1").setLabel("Minecraft Username").setStyle(ButtonStyle.Secondary).setEmoji({ name: "🏷️" }),
                            new ButtonBuilder().setCustomId("modalinput|main|2").setLabel("Email").setStyle(ButtonStyle.Secondary).setEmoji({ name: "📧" })
                        ),
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId("testmodal|main").setLabel("Test").setStyle(ButtonStyle.Primary).setEmoji({ name: "📝" }),
                            new ButtonBuilder().setCustomId("savemodal|main").setLabel("Save").setStyle(ButtonStyle.Primary).setEmoji({ name: "💾" })


                        )
                    ],
                    ephemeral: true
                })
                break;
            case "code":
                return interaction.reply({
                    embeds: [{
                        title: `Edit the Linking Account Modal!`,
                        description: `Use the Buttons below to edit your modal!\nPress save once you finish editing`,
                        color: 0x00ff00
                    }],
                    ephemeral: true
                })
                break
            default:
                return interaction.reply({ content: `Invalid type!`, ephemeral: true })
                break;
        }
    }
}