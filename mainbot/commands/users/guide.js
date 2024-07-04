module.exports = {
    name: "guide",
    description: `Guide on how to create a bot and get it's token!`,
    callback: async (client, interaction) => {
        await interaction.reply({
            embeds: [{
                title: `How to make a discord bot!`,
                description: `**Step 1** Go to [Disord Developer Portal](https://discord.com/developers/applications)
             **Step 2** Click on New Application and give your application a name EX:__Minecraft Verification Bot__ and then click on create
             **Step 3** Go to Bot and put a nice photo for your bot
             **Step 4** Enable every checkbox related to Privileged Gateway Intents
             **Step 5** Reset Token and add the token to this panel
             **Step 6** Click on start button!`,
                color: 0x00ff00
            }],
            ephemeral: true
        })
        await interaction.followUp({ content: `A video guide on how to do it!\nhttps://cdn.discordapp.com/attachments/1215933947842662420/1219050033257779251/2024-03-18_00-26-15.mp4?ex=6609e3d0&is=65f76ed0&hm=86419e53378e32d8265ee629985cf7248e3e966d5965373ce8c94802fad81d65&`, ephemeral: true })
    }
}