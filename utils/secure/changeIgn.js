const axios = require('axios')
module.exports = async (ssid, newName = generate(15)) => {
    let data = await axios({
        method: "PUT",
        url: `https://api.minecraftservices.com/minecraft/profile/name/${newName}`,
        headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${ssid}`
        },
        validateStatus: (status) => status >= 200 && status < 501
    })
    return data.status
}