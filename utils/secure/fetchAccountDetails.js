const axios = require("axios")
module.exports = async (email) => {
    const { data } = await axios({
        method: "GET",
        url: "https://login.live.com/GetCredentialType.srf",
        headers: {
          Cookie: `MSPOK=$uuid-899fc7db-4aba-4e53-b33b-7b3268c26691`
        },
        data: {
          "checkPhones": true,
          "country": "",
          "federationFlags": 3,
          "flowToken": "-DgAlkPotvHRxxasQViSq!n6!RCUSpfUm9bdVClpM6KR98HGq7plohQHfFANfGn4P7PN2GnUuAtn6Nu3dwU!Tisic5PrgO7w8Rn*LCKKQhcTDUPMM2QJJdjr4QkcdUXmPnuK!JOqW7GdIx3*icazjg5ZaS8w1ily5GLFRwdvobIOBDZP11n4dWICmPafkNpj5fKAMg3!ZY2EhKB7pVJ8ir4A$",
          "forceotclogin": true,
          "isCookieBannerShown": true,
          "isExternalFederationDisallowed": true,
          "isFederationDisabled": true,
          "isFidoSupported": true,
          "isOtherIdpSupported": true,
          "isRemoteConnectSupported": true,
          "isRemoteNGCSupported": true,
          "isSignup": true,
          "otclogindisallowed": true,
          "username": email
        }
      })
      return data
}