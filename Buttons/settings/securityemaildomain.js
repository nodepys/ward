const { TextInputStyle } = require("discord.js")
const modalBuilder = require("../../utils/modalBuilder")

module.exports = {
    name: "emaildomain",
    ownerOnly: true,
    callback: async (client, interaction) => {
        interaction.showModal(modalBuilder(`emaildomain`, `emaildomain`,
            [{
                setCustomId: 'domain',
                setMaxLength: 253,
                setMinLength: 0,
                setRequired: true,
                setLabel: "Domain",
                setPlaceholder: "Your domain EX:oldward.fun",
                setStyle: TextInputStyle.Short
            }]
        ))
    }
}