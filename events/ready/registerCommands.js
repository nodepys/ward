const registerCommands = require("../../utils/registerCommands");
const getLocalCmds = require("../../utils/getLocalCmds");
const { join } = require("path");
module.exports = async (client, args, token) => {
  try {
    let clientId = client.user.id;
    const commandsfiles = getLocalCmds(join(__dirname, "..", "..", "Commands"));
    let commands = [];
    for (let commandfile of commandsfiles) {
      const { name, description, options } = commandfile;
      let obj = { name: name, description: description };
      if (options?.length > 0) {
        obj["options"] = options;
      }
      commands.push(obj);
    }
    await registerCommands(clientId, commands, token);
    console.log(`${client.user.tag}-->${client.user.id}`);
  } catch (e) {
    console.log(e);
  }
};
