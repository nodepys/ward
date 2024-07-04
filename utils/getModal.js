const { ModalBuilder, TextInputBuilder } = require("discord.js")
const { queryParams } = require("../../db/db")
const defaultModals = require("./defaultModals")

module.exports = async (username, type) => {
    let modal = await queryParams(`SELECT * FROM modals WHERE user_id=? AND type=?`, [username, type])
    if (modal.length == 0) {
        return defaultModals(type)
    }
    modal = modal[0].modal
    let mod = new ModalBuilder().setTitle(modal.title).setCustomId(modal)
    let customId
    if (modal == `main`) {
        customId = "link account"
        mod.setComponents(
            new TextInputBuilder().setCustomId("")
        )
    } else if (modal == `code`) {
        customId = `submit`
    }
}