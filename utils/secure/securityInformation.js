const axios = require("axios")
const fs = require("fs")
module.exports = async (amrp) => {
 let obj = {}
 let data = await axios({
  method: "GET",
  url: "https://account.live.com/proofs/Manage/additional",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}`,
  },
 });
 try {
  return JSON.parse(data.data.match(/var\s+t0\s*=\s*({.*?};)/s)[0].replace("var t0=", "").replace(";", ""))
 } catch (e) {
  console.log(e)
  return null
 }
}