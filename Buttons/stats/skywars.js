const statsMsg = require("../../utils/statsMsg")

module.exports={
    name:"skywars",
    callback:async (client,interaction)=>{
        let id = interaction.customId.split("|")[1]
        let sensored = interaction.customId.split("|")[2]
        if(sensored=="0"){
            sensored=false
        }else{
            sensored=true
        }
        interaction.update(await statsMsg(id,"skywars",sensored))
    }
}