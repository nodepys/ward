const axios = require("axios")
module.exports = async (device) => {
    const { data } = await axios({
        url: "https://login.live.com/GetOneTimeCode.srf?id=38936",
        "headers": {
            "cookie": "MSPOK=$uuid-55593433-60c8-4191-8fa7-a7874311e85d$uuid-4fd7f4fb-42b7-4ffc-bd3d-8feacfb6a57e$uuid-8f1626a7-4080-4073-8686-354aa5b937cc$uuid-135d7477-b083-41e7-b681-2ce793c563e6$uuid-6c60a9a5-97c2-4902-aee3-00f99efacbcf$uuid-4059f6fb-ae72-4398-810f-c5cb6495640f$uuid-0b2844a4-bbfa-4118-9a20-4b00154ccdc0$uuid-8b82f8ca-93b0-440b-be93-b1a743e05907$uuid-1dce1868-997e-4c06-8d99-44db08a70c67$uuid-3c79bd95-3604-4bc1-8358-353fe9734742"
        },
        "data": `login=wtv@gmail.com&flowtoken=${device}&purpose=eOTT_RemoteNGC&channel=PushNotifications&SAPId=&lcid=1033&uaid=3dd509e1f6ae4e0fa6debefe3b45abcb&canaryFlowToken=-DukZxrqgCYbURm5kHk3U5rkTOMEtJxkIq761a!27Qbn4GRZqvsySwrek6w*uVBbTB1PQ0w0o!jBR2YoMjkZPZJunzjR2I7op80PNHaOWYedJU8uoipCkH8natDYj!zpmDK6FOTPcbedisM70Rv6oB4v3mxPu9wyTgp2aq6Ugc86bmt8mj9Ox*D3fqwz*pYKeMbDy4vLXVetOsXJK*6GooRw$`,
        "method": "POST"
    });
    return data?.DisplaySignForUI
}