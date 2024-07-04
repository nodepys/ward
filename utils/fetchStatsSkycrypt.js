const axios = require("axios")
const fs = require("fs")
const shorten = require("../utils/shorten")
module.exports = async (name) => {
    console.log(`sending the request`)
    const { data } = await axios({
        method: "GET",
        url: "https://sky.shiiyu.moe/api/v2/profile/" + name,
    })
    console.log(`sent the request`)
    for (let profiles of Object.values(data)) {
        for (let profile of Object.values(profiles)) {
            if (profile.current){
                console.log(profile)
                fs.writeFileSync("./data.json",profile,"utf-8")
            }
        }
    }
}