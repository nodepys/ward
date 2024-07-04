const axios = require("axios")
module.exports = async (amrp, amsc, canary, name) => {
 let data = await axios({
  url: "https://account.live.com/names/manage",
  method: "POST",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc};`,
  },
  data: `canary=${encodeURIComponent(
   canary
  )}&action=RemoveAlias&aliasName=${encodeURIComponent(
   name
  )}&displayName=${encodeURIComponent(name)}`,
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
 });
 if (data.data.includes("Note_AssociatedIdRemoved")) {
  console.log(`Removed ${name} alias successfully`);
 } else {
  console.log(`Failed to remove ${name} alias`);
 }
 // if (data.status == 302) return logging.success(`Removed ${name} alias!`)
}