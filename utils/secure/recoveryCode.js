const decode = require("./decode");
const axios = require("axios")
module.exports = async (amrp, apicanary, amsc, eni) => {
 const { data } = await axios({
  url: "https://account.live.com/API/Proofs/GenerateRecoveryCode",
  headers: {
   canary: decode(apicanary),
   cookie: `amsc=${amsc}; AMRPSSecAuth=${amrp};`,
  },
  data: `{"encryptedNetId":"${eni}"}`,
  method: "POST",
 });
 if (data.recoveryCode) {
  return data.recoveryCode
 } else {
  return null
 }
}