const { Client } = require("discord.js");
let text = {
    name: `sendembed`,
    userOnly: true,
    callback: async (client, interaction) => {
        let embed = interaction.message.embeds[0].data
        let id = interaction.customId.split("|")[1]
        try {
            await client.users.fetch(id).then(async user => {
                await user.send({ embeds: [embed] })
            })
            return interaction.update({ content: `Sent <@${id}> your message!` })
        } catch (e) {
            return interaction.update({ content: `Failed to dm <@${id}> your message!` })
        }
    }
};
module.exports = text;