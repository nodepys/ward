const { queryParams } = require("../../../db/db")
const usersMsg = require("../../utils/usersMsg")

module.exports = {
    name: "admin",
    ownerOnly: true,
    callback: async (client, interaction) => {
        let [t,userId,current] = interaction.customId.split("|")
        let user = await queryParams(`SELECT * FROM users WHERE user_id=? AND child=?`, [client.username, userId])
        if (user.length == 0) {
            return interaction.update(await usersMsg(client.username, current))
        }
        if (user[0].admin) {
            await queryParams(`UPDATE users SET admin=? WHERE user_id=? AND child=?`, [0, client.username, userId])
            return interaction.update(await usersMsg(client.username, current))
        } else {
            await queryParams(`UPDATE users SET admin=? WHERE user_id=? AND child=?`, [1, client.username, userId])
            return interaction.update(await usersMsg(client.username, current))
        }
    }
}