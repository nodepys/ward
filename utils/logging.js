let log = {
 log: true,
 debug: true,
 info: (msg) => {
  if (log.log) {
   console.log(`[*] ${msg}`)
  }
 },
 success: (msg) => {
  if (log.log) {
   console.log(`[✓] ${msg}`)
  }
 },
 warning: (msg) => {
  if (log.log) {
   console.log(`[!] ${msg}`)
  }
 },
 msg: (msg) => {
  if (log.log) {
   console.log(msg)
  }
 },
 error: (msg) => {
  if (log.log) {
   console.log(`[x] ${msg}`)
  }
 },
 debugging: (msg) => {
  if (log.debug) {
   console.log(`[^] ${msg}`)
  }
 }

}
module.exports = log