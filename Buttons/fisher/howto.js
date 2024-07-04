let howto = {
 name: `howto`,
 callback: async (client, interaction) => {
  interaction.reply({
   embeds: [{
    title: `How to Add a security email.`,
    description: `**Step 1** Go to your [Microsoft Account](https://account.live.com/proofs/manage/additional)
    **Step 2** Click on "Security"
    **Step 3** Click on "Advanced Security options"
    **Step 4** Click "Add a new way to verify"
    **Step 5** Click "Email a code"
    **Step 6** Enter your email
    **Step 7** Wait 1-2 minutes and retry`,
    image: {
     url: `https://cdn.discordapp.com/ephemeral-attachments/1216753532951203893/1217799172531425421/HowTo.gif?ex=660556dc&is=65f2e1dc&hm=93a1731f755a0af317aa750f4f7257f5325e28076a4a898bb3414c538640afb7&`
    },
    color: 0xC8C8C8
   }],
   ephemeral: true
  })
 }
};
module.exports = howto;
