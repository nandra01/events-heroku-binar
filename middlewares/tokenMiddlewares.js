
const jwt = require('jsonwebtoken')
const joi = require('joi')

const tokenMiddleware = {
    verifyToken: async (req, res, next) => {
      try {
      const token = req.headers.authorization
      const schema = joi.object({
        authorization: joi.string().required()
      
        })
        .options({abortEarly:false})
    
        const validate = await schema.validate({authorization: token})
    
        if(validate.error){
        console.log(validate);
        res.send({
            status:500,
            message:'missing token',
            data: validate.error.details
            })
        }
        const decodeToken = await jwt.verify(token, 'secret_key')
        req.body.decodeToken = decodeToken

        next()

        }catch (error) {
         console.log(error);
         res.send({
             status: 500,
             message: 'invalid token',
             data: error
         })
        }
    }
}

module.exports = tokenMiddleware