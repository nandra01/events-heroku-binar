const bcrypt = require('bcrypt');
const {userModel} = require('../database/config');
const jwt = require('jsonwebtoken');

const authService = {
    findByUsername: async (username) => {
        return await userModel.findOne({where: {username}})
    },

    create: async (userDetails) =>{
        try {
        const saltRounds = 10
        const salt = await bcrypt.genSaltSync(saltRounds)

        const hashedPassword = await bcrypt.hashSync(userDetails.password, salt)
        const isUserExist = await authService.findByUsername(userDetails.username)

        let error = null;
        let result = {};
      
        if(!isUserExist){
         result = await userModel.create({
            username: userDetails.username,
            password: hashedPassword

        })
        }
        else {
            error = 'user already exist'
        }

        return {
            data:result,
            error
        };

       } catch (error){
         console.log(error)
         return error
    }
  },

  login: async(userDetails) => {
      try {
          let error = null;
          let result = {};

          const isUserExist = await authService.findByUsername(userDetails.username)
          if(!isUserExist) {
            error = 'User not registered'
          } else {

          const isSamePassword = await bcrypt.compareSync(userDetails.password, isUserExist.dataValues.password)
          if(!isSamePassword){
            error = 'incorrect password'
          } 
    
         else {
            result =  await jwt.sign(isUserExist.dataValues, 'secret_key')
          }
        }

        return {
        data: result,
        error
        };

        }catch  (error){
        console.log(error);
        return error

      }
  }
}
module.exports = authService