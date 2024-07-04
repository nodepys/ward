const discord = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const config = require("../config.json");




async function initializeController() {
  for (let token of config.tokens) {
    const client = new discord.Client({
      intents: ["Guilds", "GuildMessages"], // Adding intents,
      presence: {
        activities: [
          {
            name: "Manager",
            type: discord.ActivityType.Custom,
            state: "Managing other bots",
          },
        ],
        status: "dnd",
      },
    });
    client.cooldowns = new discord.Collection();
    eventHandler(client, token);
    await client.login(token);
  }

}


module.exports={initializeController}

