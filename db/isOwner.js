const {owners} = require("../config.json")
module.exports = async (userid) => {
    if (owners.includes(userid)) return true
    return false
}