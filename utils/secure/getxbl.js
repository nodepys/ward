const axios = require("axios")
module.exports = async (host) => {
    const loginRedirect = await axios({
        method: "GET",
        url: "https://sisu.xboxlive.com/connect/XboxLive/?state=login&cobrandId=8058f65d-ce06-4c30-9559-473c9275a65d&tid=896928775&ru=https://www.minecraft.net/en-us/login&aid=1142970254",
        maxRedirects: 0,
        validateStatus: (state) => state >= 200 && state <= 500
    })
    if (loginRedirect.headers.location) {
        const accessTokenRedirect = await axios({
            method: "GET",
            url: loginRedirect.headers.location,
            headers: {
                Cookie: `__Host-MSAAUTH=${host}`
            },

            maxRedirects: 0,
            validateStatus: (state) => state >= 200 && state <= 500
        })
        if (accessTokenRedirect.headers.location) {
            const extractAccessToken = await axios({
                method: "GET",
                url: accessTokenRedirect.headers.location,

                maxRedirects: 0,
                validateStatus: (status) => status >= 200 && status <= 500
            })
            const accessTokenRegex = /accessToken=([^&]*)/;
            // Extract the accessToken using the regex
            const match = extractAccessToken?.headers?.location?.match(accessTokenRegex);
            const accessToken = match ? match[1] : null;
            if (accessToken) {
                let json = JSON.parse(atob(accessToken))
                let uhs = json[0]?.Item2?.DisplayClaims?.xui[0]?.uhs
                let xsts = ""
                for (let items of Object.values(json)) {
                    if (items?.Item1 == "rp://api.minecraftservices.com/") {
                        xsts = items?.Item2?.Token
                    }
                }
                if (!xsts) return null
                let c = `XBL3.0 x=${uhs};${xsts}`
                return c
            }
            return null
        } else return null
    } else return null
}