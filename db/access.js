const { queryParams } = require("./db")

module.exports = async (userId) => {
  let access = await queryParams(`SELECT * FROM autosecure WHERE user_id=?`, [userId])
  if (access.length == 0) return false
  return true
}