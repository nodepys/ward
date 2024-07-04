const axios = require("axios");
module.exports = async (amrp, amsc, apicanary, name) => {
    let data = await axios({
        method: "POST",
        url: `https://account.live.com/API/MakePrimary`,
        headers: {
            Cookie: `AMRPSSecAuth=${amrp}; amsc=${amsc}`,
            canary: apicanary,
        },
        data: {
            aliasName: name,
            emailChecked: true,
            removeOldPrimary: true,
            uiflvr: 1001,
            uaid: "abd2ca2a346c43c198c9ca7e4255f3bc",
            scid: 100141,
            hpgid: 200176,
        },
    });
    if (data?.data?.error) {
        return false
    }
    return true
}