const axios = require("axios")
module.exports = async (email, secEmail) => {
    const { data } = await axios({
        method: 'post',
        url: "https://login.live.com/GetCredentialType.srf",
        headers: {
            Cookie: "MSPOK=$uuid-0f65c556-18ac-4a79-9538-c3b04dfa1935$uuid-9ffe7a4a-a894-4c2d-b59c-106abb211b9e$uuid-25e1580b-e6e4-45b6-8c34-7655b0f8b14c$uuid-d1f9e47e-3c5b-469c-8755-588d1c27a798$uuid-9ec9cc5a-8e0b-472d-8959-9b7d01229b9a$uuid-8b33e513-c566-46dd-aadc-78f18574f07f$uuid-dab2c485-3bfa-482f-a6da-669b6a61b80b$uuid-ab0d1979-ecd3-413b-a5eb-d1f39e43b1dc$uuid-4cfb48ac-6923-422e-a315-71d59af58ad9;",
        },
        data: {
            username: email,
            "checkPhones": true,
            "federationFlags": 3,
            "forceotclogin": false,
            "isFidoSupported": false,
            "isRemoteNGCSupported": false,
            "flowToken": "-DiDMJ078guPx!Pd6RZTqwSe*ta2NRclr7kG!yfitfWHqzc3rHa7ePP1Ik*b22n6ZB7O3cHDAavoyK7A8e1somhaEV5JmdUA6xFKwWQ2Opghc43C8TS4f1o!dX214HT5vV*XvI*0RVf8gSh57X!PfSudPwgqtL0iiXRGtTjfgJqPBkLNM8ImnkT93xKI6bkdTFed*bE*0P3VgE6FRRriNE*g$"
        }
    })
    if (data?.Credentials?.OtcLoginEligibleProofs) {
        for (let otc of data?.Credentials?.OtcLoginEligibleProofs) {
            if (match(otc.display, secEmail)) {
                return otc.data
            }
        }

    } else {
        return null
    }
}
function match(possibility, secEmail) {
    if ((possibility.slice(0, 2) == secEmail.slice(0, 2)) & possibility.split("@")[1] == secEmail.split("@")[1]) {
        return true
    }
    return false
}