const { queryParams } = require("../../../db/db")
const usersMsg = require("../../utils/usersMsg")

module.exports = {
    name: "claiming",
    ownerOnly: true,
    callback: async (client, interaction) => {
        let [t, userId, current] = interaction.customId.split("|")
        let user = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, userId])
        if (user.length == 0) {
            return interaction.update(await usersMsg(client.username, current))
        }
        user=user[0]
        if (user.claiming == 1) {
            await queryParams(`UPDATE users SET claiming=? WHERE user_id=? AND child=?`, [0, client.username, userId])
            return interaction.update(await usersMsg(client.username, current))
        } else if (user.claiming == 0) {
            await queryParams(`UPDATE users SET claiming=? WHERE user_id=? AND child=?`, [-1, client.username, userId])
            return interaction.update(await usersMsg(client.username, current))
        } else {
            await queryParams(`UPDATE users SET claiming=? WHERE user_id=? AND child=?`, [1, client.username, userId])
            return interaction.update(await usersMsg(client.username, current))
        }
    }
}