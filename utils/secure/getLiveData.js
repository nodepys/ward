const axios = require("axios")
module.exports = async () => {
  let cookies = []
  const data = await axios({
    method: "POST",
    url: "https://login.live.com",
  })
  let c = data.headers["set-cookie"];
  for (let co of c) {
    cookies += co.split(";")[0] + "; "
  }
  // }
  const linkRegex = /https:\/\/login.live.com\/ppsecure\/post.srf\?contextid=[0-9a-zA-Z]{1,100}&opid=[0-9a-zA-Z]{1,100}&bk=[a-zA-Z0-9]{1,100}&uaid=[0-9a-zA-Z]{1,100}\&pid=0/g;
  const ppftRegex = /value="([^"]*)"/
  ppft = data.data.match(ppftRegex)[0].replace("value=", "").replaceAll("\"", "")
  loginLink = data.data.match(linkRegex)[0];
  return {
    loginLink: loginLink,
    ppft: ppft,
    cookies: cookies
  }
}