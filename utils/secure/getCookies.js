const decode = require("./decode");
const axios = require("axios")
module.exports = async () => {
 let canary,apicanary,amsc = null
 let data = await axios({
  method: "GET",
  url: "https://account.live.com/password/reset",
  maxRedirects: 0,
  validateStatus: (status) => status >= 200 && status < 400,
 });

 let a=data?.data?.match(/"apiCanary":"([^"]+)"/)
 let c= data?.data?.match(/"sCanary":"([^"]*)"/)
 if (c && c[1]) {
  canary = decode(c[1])
 }
 if (a && a[1]) {
  apicanary = decode(a[1])
 }
 data.headers["set-cookie"].map((cookie) => {
  const [name, ...values] = cookie.split("=");
  if (name == "amsc") {
   amsc = values.join("=").split(";").shift();
  }
 });
 return [canary, apicanary, amsc]
}