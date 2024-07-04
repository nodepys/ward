const axios = require("axios")
module.exports = async (amrp, amsc) => {
 let data = await axios({
  method: "GET",
  url: "https://account.live.com/proofs/Add",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc}`,
  },
 });
 let match = data.data.match(/<input type=\"hidden\" id=\"canary\" name=\"canary\" value=\"([^"]+)" \/>/)
 console.log(match)
 if (match && match[1]) {
  return decode(match[1]);
 }
 return false
}