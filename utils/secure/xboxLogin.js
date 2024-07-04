const axios = require("axios")
module.exports = async (loginLink, host) => {
    const data = await axios({
        method: "GET",
        url: loginLink,
        headers: {
            Cookie: `__Host-MSAAUTH=${host}`
        },
        maxRedirects: 0,
        validateStatus: (state) => state >= 200 && state <= 500
    })
    if(data.headers.location){
        return data.headers.location
    }else{
        return null
    }
}