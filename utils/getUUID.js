const axios = require('axios')
module.exports = async (username) => {
    try {
        const res = await axios({
            method: "GET",
            url: "https://api.mojang.com/users/profiles/minecraft/" + username
        })
        if (res?.data?.id) {
            return res.data.id;
        }
        return 0;
    } catch (e) {
        return 0
    }
}