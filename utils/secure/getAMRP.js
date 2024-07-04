const axios = require("axios")
const fs = require("fs")
module.exports = async (t, amsc) => {
 let fetchAMRP = await axios({
  url: `https://account.live.com/proofs/Add?apt=2&wa=wsignin1.0`,
  method: "post",
  headers: {
   "Content-Type": "application/x-www-form-urlencoded",
   Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
   Cookie: `amsc=${amsc}; MSPAuth=Disabled; MSPProof=Disabled;`,
  },
  data: {
   t: t,
  },
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
 });
 fetchAMRP.headers["set-cookie"].map((cookie) => {
  const [name, ...values] = cookie.split("=");
  if (name == "AMRPSSecAuth") {
   amrp = values.join("=").split(";").shift();
  }
 });
 if (amrp) {
  return amrp
 }
 return null;
}