const { queryParams } = require("../../db/db");
const { autosecureMap } = require("./botHandler");
const autosecure = require("../../autosecure/autosecure");
module.exports = async () => {
  let autosecures = await queryParams(`SELECT * FROM autosecure`);
  for (let autosec of autosecures) {
    if (!autosec.token) continue
    let c = await autosecure(autosec.token, autosec.user_id)
    if (c) {
      autosecureMap.set(autosec.user_id, c);
    }
  }
}