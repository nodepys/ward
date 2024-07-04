const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
    name: "adduser",
    ownerOnly: true,
    callback: async (client, interaction) => {
        interaction.showModal(modalBuilder(`adduser`, `Add User`, [{
            setCustomId: 'userid',
            setMaxLength: 21,
            setMinLength: 1,
            setRequired: true,
            setLabel: "User ID",
            setPlaceholder: "Ex:1235562829235355771",
            setStyle: 1
        }]))
    }
}