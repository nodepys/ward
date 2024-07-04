const axios = require("axios");
const decode = require("./decode");
const fs = require("fs")
module.exports = async function getPasswordParameters(amsc, canary, email) {
 let data = await axios({
  url: "https://account.live.com/password/reset",
  headers: {
   cookie: `amsc=${amsc};`,
  },
  data: `iAction=SignInName&iRU=https%3A%2F%2Flogin.live.com%2Flogout.srf%3Fct%3D1710410005%26rver%3D7.5.2156.0%26lc%3D1033%26id%3D38936%26mkt%3Den-US%26uaid%3Df9b0d0e68e784268b43627aef5f6ed1e%26fm%3D1%26lru%3Dhttps%253a%252f%252faccount.live.com%252fSummaryPage.aspx%253faup%253d1&isSigninNamePhone=false&canary=${canary}&iSigninName=${encodeURIComponent(email)}`,
  method: "POST",
 });
 try {
  return [JSON.parse(data.data.match(/var\s+ServerData\s*=\s*({.*?};)/s)[0].replace("var ServerData=", "").replace(";", "")), 1]
 } catch (e) {
  return [JSON.parse(data.data.match(/var\s+t0\s*=\s*({.*?};)/s)[0].replace("var t0=", "").replace(";", "")), 2]
 }
}