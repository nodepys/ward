const axios = require("axios")

module.exports = async (amrp, amsc, apicanary, proofId) => {
 let data = await axios({
  method: "POST",
  url: "https://account.live.com/API/Proofs/DeleteProof",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc}`,
   canary: apicanary,
  },

  data: {
   proofId: proofId,
   uiflvr: 1001,
   uaid: "da90e97a55cf431385e2dd217c6ba873",
   scid: 100109,
   hpgid: 201030,
  },
 });
}