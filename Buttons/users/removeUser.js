const { queryParams } = require("../../../db/db")
const usersMsg = require("../../utils/usersMsg")

module.exports={
    name:"removeuser",
    ownerOnly:true,
    callback:async(client,interaction)=>{
        await queryParams(`DELETE FROM users WHERE user_id=? AND child=?`,[interaction.user.id,interaction.customId.split("|")[1]])
        return interaction.update(await usersMsg(interaction.user.id,1))
    }
}