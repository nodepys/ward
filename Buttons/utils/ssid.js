module.exports = {
    name: "ssid",
    callback: async (client, interaction) => {
        let ssid = interaction.customId.split("|")[1]
        return interaction.reply({
            embeds: [{
                title: `SSID`,
                description: "```" + ssid + "```",
                color: 0x00ff00
            }],
            ephemeral: true
        })
    }
}