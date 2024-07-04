const axios = require("axios")
module.exports = async (xbl) => {
    const url = 'https://xsts.auth.xboxlive.com/xsts/authorize';
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };
    const data = {
        Properties: {
            SandboxId: 'RETAIL',
            UserTokens: [xbl],
        },
        RelyingParty: 'rp://api.minecraftservices.com/',
        TokenType: 'JWT',
    };

    try {
        const response = await axios.post(url, data, { headers });
        const jsonresponse = response.data;
        return [jsonresponse.DisplayClaims.xui[0].uhs, jsonresponse.Token];
    } catch (e) {
        console.log(e)
    }
}