const axios = require("axios");
const Encrypt = require("./encryptOtt2");
const fs = require("fs");
async function getCookies() {
  let canary,
    apicanary,
    amsc = null;
  let data = await axios({
    method: "GET",
    url: "https://account.live.com/password/reset",
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
  });

  let a = data?.data?.match(/"apiCanary":"([^"]+)"/);
  let c = data?.data?.match(/"sCanary":"([^"]*)"/);
  if (c && c[1]) {
    canary = decode(c[1]);
  }
  if (a && a[1]) {
    apicanary = decode(a[1]);
  }
  data.headers["set-cookie"].map((cookie) => {
    const [name, ...values] = cookie.split("=");
    if (name == "amsc") {
      amsc = values.join("=").split(";").shift();
    }
  });
  return [canary, apicanary, amsc];
}
function decode(code) {
  const decodedUrl = decodeURIComponent(code);

  return (decodedText = decodedUrl.replace(/\\u[0-9A-Fa-f]{4}/g, (match) =>
    String.fromCharCode(parseInt(match.substring(2), 16))
  ));
}
module.exports = async (email, recoveryCode) => {
  // Encrypting recovery code

  const data = await axios({
    url: `https://account.live.com/ResetPassword.aspx?wreply=https://login.live.com/oauth20_authorize.srf&mn=${email}`,
    method: "GET"
  })
  let amsc, serverData = null
  data.headers["set-cookie"].map((cookie) => {
    const [name, ...values] = cookie.split("=");
    if (name == "amsc") {
      amsc = values.join("=").split(";").shift();
    }
  });
  const match = data.data.match(/var\s+ServerData=(.*?)(?=;|$)/);

  if (match) {
    serverData = JSON.parse(match[1]);
  } else {
    return null
  }
  let encrypted = Encrypt(null, recoveryCode, `saproof`, null)
  if (serverData && serverData?.sRecoveryToken && amsc && serverData?.apiCanary) {
    let recToken = await axios({
      method: "POST",
      url: "https://account.live.com/API/Recovery/VerifyRecoveryCode",
      headers: {
        Cookie: `amsc=${amsc}`,
        "Content-type": "application/json; charset=utf-8",
        canary: serverData?.apiCanary
      },
      data: {
        encryptedCode: encrypted,
        publicKey: "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
        recoveryCode: recoveryCode,
        scid: 100103,
        token: decodeURIComponent(serverData.sRecoveryToken),
        uiflvr: 1001,
      },
    })
    if (recToken?.data?.token) {

      let secEmail = generate(16) + "@" + domains[0]
      let password = generate(16)
      await axios({
        method: "POST",
        url: "https://account.live.com/API/Recovery/RecoverUser",
        headers: {
          Canary: serverData?.apiCanary,
          Cookie: `amsc=${amsc}`
        },
        data: {
          "contactEmail": secEmail,
          "contactEpid": "",
          "password": password,
          "passwordExpiryEnabled": 0,
          "publicKey": "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
          "token": decode(recToken?.data?.token),
        }
      })
    } else {
      return null
    }
  } else {
    return null
  }
};
