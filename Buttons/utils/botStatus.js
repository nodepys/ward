const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
    name: "changestatus",
    callback: async (client, interaction) => {

        return interaction.showModal(modalBuilder(`botstatus`, `Bot Status`, [{
            setCustomId: 'status',
            setMaxLength: 256,
            setMinLength: 0,
            setRequired: false,
            setLabel: "Bot Status",
            setPlaceholder: "Type the desired status.",
            setStyle: TextInputStyle.Short
        }, {
            setCustomId: 'state',
            setMaxLength: 9,
            setMinLength: 0,
            setRequired: true,
            setLabel: "State",
            setPlaceholder: "online/dnd/idle/invisible",
            setStyle: TextInputStyle.Short
        }]))
    }
}