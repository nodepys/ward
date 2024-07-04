const axios = require("axios")
module.exports = async function getT(host, amsc) {
  let fetchT = await axios({
    method: "GET",
    url: `https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=21&ct=1708978285&rver=7.5.2156.0&wp=SA_20MIN&wreply=https://account.live.com/proofs/Add?apt=2&uaid=0637740e739c48f6bf118445d579a786&lc=1033&id=38936&mkt=en-US&uaid=0637740e739c48f6bf118445d579a786`,
    headers: {
      cookie: `__Host-MSAAUTH=${host}; amsc=${amsc}`,
    },
    maxRedirects: 0,
    validateStatus: (status) => status >= 200 && status < 400,
  });
  let match = fetchT.data.match(/<input\s+type="hidden"\s+name="t"\s+id="t"\s+value="([^"]+)"\s*\/?>/);
  if (fetchT.data.includes("Abuse")) {
    return `locked`
  } else if (fetchT.data.includes("working to restore all services")) {
    return `down`
  }
  if (match && match[1]) {
    return match[1]
  } else {
    return null
  }
}