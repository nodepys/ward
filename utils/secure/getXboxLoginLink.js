const axios = require("axios")
module.exports=async()=>{
    const data = await axios({
        method:"GET",
        url:"https://sisu.xboxlive.com/connect/XboxLive/?state=login&cobrandId=8058f65d-ce06-4c30-9559-473c9275a65d&tid=896928775&ru=https://www.minecraft.net/en-us/login&aid=1142970254",
        headers:{
            Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
        },
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
    })
    if(data?.headers?.location){
        return data.headers.location
    }
    return null
}