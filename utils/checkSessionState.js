const axios = require("axios")
module.exports = async (flowToken) => {
    const { data } = await axios({
        method: "POST",
        headers: {
            Cookie: `MSPOK=$uuid-d7404240-de39-47d5-9942-13f3ba844eec$uuid-9c2de3f5-d742-44dc-9227-babcdd9d4094$uuid-567b6c7e-4a29-40f2-8552-ab11b804a699;`
        },
        url: `https://login.live.com/GetSessionState.srf?mkt=EN-US&lc=1033&slk=${flowToken}&slkt=NGC`,
        data: {
            "DeviceCode": flowToken
        }
    })
    return data
}