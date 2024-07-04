const axios = require("axios")
module.exports = async (ssid) => {
    const { data } = await axios({
        method: "GET",
        url: "https://api.minecraftservices.com/minecraft/profile",
        headers: {
            Authorization: `Bearer ${ssid}`
        },
        validateStatus: (status) => status >= 200 && status < 500,
    })
    if (!data?.name) return null
    return data
}