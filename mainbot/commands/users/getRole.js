const access = require("../../../db/access");
const { guildid, roleid, discordServer } = require("../../../config.json");
module.exports = {
  name: "getmyrole",
  description: `Get my role!`,
  callback: async (client, interaction) => {
    if (await access(interaction.user.id)) {
      let guild = client.guilds.cache.get(guildid);
      let member = await guild.members.fetch(interaction.user.id);
      if (member) {
        try {
          let role = await guild.roles.fetch(roleid);
          await member.roles.add(role);
          return interaction.reply({content:`Gave you your role!`,ephemeral:true})
        } catch (e) {
            console.log(e)
            return interaction.reply({content:`Unexpected error occured!`,ephemeral:true})
        }
      } else {
        return interaction.reply({
          content: `Couldn't find you in the server!\nJoin ${discordServer} so that I can give you your role!`,
          ephemeral: true,
        });
      }
    } else {
      return interaction.reply({
        content: `You don't have access!`,
        ephemeral: true,
      });
    }
  },
};
