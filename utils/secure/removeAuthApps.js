const axios = require("axios")
module.exports = async (amrp, canary) => {
    let uatRequest = await axios({
        method: "GET",
        url: "https://account.live.com/consent/Manage?guat=1",
        headers: {
            Cookie: `AMRPSSecAuth=${amrp}`
        }
    })

    const regex = /data-clientId="([^"]+)"/g;
    const match = uatRequest.data.match(regex);
    if (match) {
        for (let idr of match) {
            let id = idr.split("\"")[1]
            await axios({
                method: "POST",
                headers: {
                    Cookie: `AMRPSSecAuth=${amrp}`,
                },
                url: `https://account.live.com/consent/Edit?client_id=${id}`,
                data: `canary=${canary}`
            })
        }
    } else {
        console.log("Data-clientId not found.");
    }
}