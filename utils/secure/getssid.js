const axios = require("axios")
module.exports = async (xbl) => {
    let extractSSID = await axios({
        method: "POST",
        url: "https://api.minecraftservices.com/authentication/login_with_xbox",
        data: {
            "identityToken": xbl, "ensureLegacyEnabled": true
        },
        validateStatus: (state) => state >= 200 && state <= 500
    })
    if (extractSSID?.data?.access_token) {
        return extractSSID.data.access_token
    } else {
        return null
    }
}