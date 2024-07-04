const { sniperMap } = require("../handlers/botHandler")

module.exports = () => {
  try {
    let promises = []
    for (let sniper of sniperMap.values()) {
      // console.log(sniper)
      promises.push(sniper.exit(`Server stopping`))
    }
    Promise.all(promises).then(() => {
      process.kill(process.pid)
    })
  } catch (e) {
    console.log(e)
    process.kill(process.pid)
  }
}