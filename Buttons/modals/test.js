module.exports={
    name:"testmodal",
    callback:async(client,interaction)=>{
        return interaction.reply({content:`${interaction.customId.split("|")[1]}`,ephemeral:true})
    }
}