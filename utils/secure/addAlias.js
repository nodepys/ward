const axios = require("axios")
module.exports = async (name, canary, amrp, amsc) => {
 let { data } = await axios({
  method: "POST",
  url: "https://account.live.com/AddAssocId",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc};`,
  },
  data: `canary=${encodeURIComponent(
   canary
  )}&PostOption=NONE&SingleDomain=outlook.com&UpSell=&AddAssocIdOptions=LIVE&AssociatedIdLive=${name}`,
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
 });
 let match = data.match(/alias=.+?(;)/);
 if (match && match[0]) {
  return true;
 } else {
  return false;
 }
}