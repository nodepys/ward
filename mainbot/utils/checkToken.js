const axios = require("axios");


module.exports = async (token) => {
  try {
    const response = await axios({
      url: 'https://discord.com/api/users/@me',
      method: "GET",
      headers: {
        Authorization: `Bot ${token}`,
      }
    })
    if (response.status === 200) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}