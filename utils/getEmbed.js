const { queryParams } = require("../../db/db")
const defaultEmbeds = require("./defaultEmbeds")

module.exports = async (id, embed, var1, var2) => {
    let e = await queryParams(`SELECT * FROM embeds WHERE user_id=? AND type=?`, [id, embed])
    let msg = null
    if (e.length == 0) {
        msg = defaultEmbeds(embed)
    } else {
        msg = JSON.parse(e[0].embed)
    }
    if (var1) {
        msg.description = msg.description.replaceAll("{1}", var1)
    }
    if (var2) {
        msg.description = msg.description.replaceAll("{2}", var2)
    }
    return msg
}