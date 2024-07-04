const getLiveData = require("./secure/getLiveData");
const axios = require("axios")
module.exports = async (obj) => {
    let host = null
    let loginData = null
    let data = await getLiveData()
    if (obj.email && obj.id && obj.code) {
        // Login with email, security email and code!
        loginData = await axios({
            method: "POST",
            url: `https://login.live.com/ppsecure/post.srf`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: data.cookies
            },
            data: `login=${obj.email}&loginfmt=${obj.email}&type=27&SentProofIDE=${obj.id}&otc=${obj.code}&PPFT=${data.ppft}`,
        });
    }
    if (obj.slk && obj.email) {
        loginData = await axios({
            method: "POST",
            url: `https://login.live.com/ppsecure/post.srf`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie: data.cookies
            },
            data: `login=${obj.email}&loginfmt=${obj.email}&slk=${obj.slk}&psRNGCSLK=${obj.slk}&type=21&PPFT=${data.ppft}`,
        });

    }
    loginData.headers["set-cookie"].map((cookie) => {
        const [name, ...values] = cookie.split("=");
        if (name == "__Host-MSAAUTH") {
            host = values.join("=").split(";").shift()
        }
    });
    if (host) {
        const polish = await axios({
            method: "POST",
            url: "https://login.live.com/ppsecure/post.srf?uaid=c81c108c53b249209366161b56d8122b&pid=0&opid=C0104E8D0A7E348F&route=C532_SN1",
            headers: {
                Cookie: `__Host-MSAAUTH=${host}`
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400,
        })
    }
    if (host) {
        return host
    } else {
        return null
    }
}