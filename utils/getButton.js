const { ButtonBuilder, ButtonStyle } = require("discord.js")
const { queryParams } = require("../../db/db")
const defaultButtons = require("./defaultButtons")

module.exports = async (id, type, obj) => {
    let button = await queryParams(`SELECT * FROM buttons WHERE user_id=? AND type=?`, [id, type])
    if (button.length == 0) {
        return defaultButtons(type, obj)
    } else {
        let data = JSON.parse(button[0].button)
        if (type == "oauth") {
            data.url = obj.url
        }
        button = new ButtonBuilder()
        button.data = data
        return button
    }
}