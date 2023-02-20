const { user } = require('../model');

exports.patchUser = async(req,res) =>{
    let data 
    data = {
        nickname: req.body.userName,
        phone: req.body.userPhoneNumber

    }
  const result = await user.update(data, {where:{id: userData.id}})
  console.log(result)
  res.send(result)
}