const { queryParams } = require("../../../db/db");

module.exports = {
  name: "key",
  description: `Use a license key to gain access to this bot!`,
  options: [
    {
      name: "license",
      description: `The license that you bought from the sellpass!`,
      type: 3,
      required: true,
    },
  ],
  callback: async (client, interaction) => {
    let key = interaction.options.getString("license");

    let ifExist = await queryParams(`SELECT * FROM licenses WHERE license=?`, [
      key,
    ]);
    if (ifExist.length == 0) {
      return interaction.reply({ content: `Invalid License`, ephemeral: true });
    } else {
      try {
        let hasAccess = await queryParams(
          `SELECT * FROM autosecure WHERE user_id=?`,
          [interaction.user.id]
        );
        if (hasAccess.length == 0) {
          await queryParams(`INSERT INTO autosecure(user_id) VALUES(?)`, [
            interaction.user.id,
          ]);
          await queryParams(`DELETE FROM licenses WHERE license=?`, [key]);
          let command,
            command2,
            command3 = null;

          (await client.application.commands.fetch()).forEach((cmd) => {
            if (cmd.name === `guide`) {
              command = cmd;
            } else if (cmd.name === `token`) {
              command2 = cmd;
            } else if (cmd.name === `start`) {
              command3 = cmd;
            }
          });

          interaction.user.send({
            content: `<@${interaction.user.id}> Gave you access to auto secure!\nUse the command </${command?.name}:${command?.id}> to know how to get your token!\nAfter that put your token in the bot using the command </${command2.name}:${command2?.id}>\nAnd then start your bot using the command </${command3.name}:${command3?.id}>`,
          });
          interaction.reply({content:`Used the license key successfully!`,ephemeral:true})
        } else {
          return interaction.reply({
            content: `You already have access!`,
            ephemeral: true,
          });
        }
      } catch (e) {
        console.log(e);
        return interaction.reply({
          content: `Unexpected error occured!`,
          ephemeral: true,
        });
      }
    }
  },
};
