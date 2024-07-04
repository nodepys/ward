const discord = require("discord.js");
const eventHandler = require("./Handlers/eventHandler.js");
const { queryParams } = require("../db/db.js");
// Starting discord client
module.exports = async (token, username) => {
  try {
    let status = await queryParams(`SELECT * FROM autosecure WHERE user_id=?`, [username])
    if (status.length != 0) {
      status = status[0].status
    }

    let client
    if (status) {
      client = new discord.Client({
        intents: ["Guilds"], // Adding intents  
        presence: {
          activities: [
            {
              name: "fish",
              type: discord.ActivityType.Custom,
              state: status.split("|")[0],
            },
          ],
          status: status.split("|")[1]
        }
      });
    } else {
      client = new discord.Client({
        intents: ["Guilds"], // Adding intents
      });
    }
    client.username = username;
    client.hits = new Map();
    eventHandler(client, token);
    await client.login(token);
    return client;
  } catch (e) {
    console.log(`${e} | ${token}`)
    return false
  }
};
