const axios = require("axios")
module.exports = async (link) => {
    const data = await axios({
        method: "GET",
        url: link,
        maxRedirects: 0,
        validateStatus: (state) => state >= 200 && state <= 500
    })
    const accessTokenRegex = /accessToken=([^&]*)/;
    const match = data?.headers?.location?.match(accessTokenRegex);
    const accessToken = match ? match[1] : null;
    if (accessToken) {
        let json = JSON.parse(atob(accessToken))
        return `XBL3.0 x=${json[0]?.Item2?.DisplayClaims?.xui[0]?.uhs};${json[1]?.Item2?.Token}`
    }
    return null
}