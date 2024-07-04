const { queryParams } = require("../../../db/db");

let ban = {
    name: `ban`,
    userOnly: true,
    callback: async (client, interaction) => {
        let id = interaction.customId.split("|").slice(1).join("|")
        try {
            let server = await queryParams(`SELECT * FROM autosecure WHERE user_id=?`, [client.username])
            if (server.length == 0) {
                return interaction.update({ content: `Failed to ban <@${id}>` })
            }
            server = server[0].server_id
            if (server) {
                await client.guilds.cache.get(server).members.cache.get(id).ban()
                return interaction.update({ content: `Banned <@${id}>` })
            }
        } catch (e) {
            console.log(`Failed to ban ${id}, ${e}`)
            return interaction.update({ content: `Failed to ban <@${id}>` })
        }
    }
};
module.exports = ban;
