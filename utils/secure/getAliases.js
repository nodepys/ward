const axios = require('axios')
module.exports = async (amrp) => {
 let canary2 = null
 let data = await axios({
  method: "GET",
  url: "https://account.live.com/names/manage",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}`,
  },
 });
 let emails = data.data.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
 let aliases = []
 for(let email of emails){
    let em = email.toLowerCase()
    if(aliases.includes(em))continue
    aliases.push(em)
 }
 const canaryRegex = /<input type="hidden" id="canary" name="canary" value="([^"]+)" \/>/;
 const match = data.data.match(canaryRegex);
 if (match) {
  canary2 = match[1];
 }
 return [aliases, canary2]
}