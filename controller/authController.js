const authService = require('../services/authService')

const authController = {
    create: async (req, res) => {
        try {
            let status = 200;
            let message = 'OK';
            let data = {};
            const {data: userCreated, error} = await authService.create(req.body)
            console.log("🚀 ~ file: authController.js ~ line 8 ~ create: ~ error", typeof error)
      if(error !== null) {
        status = 500,
        message = 'username already registered'
      }
      res.send({
        status,
        message,
        data: userCreated
      })

        } catch(error) {
            console.log("🚀 ~ file: authController.js ~ line 23 ~ create: ~ error", error)
            res.send({ status: 500, message: 'failed', data: error })
      
        }
    },

    login: async (req, res) => {
      try {
        let status = 200;
        let message = 'OK';
        let data = {};

        const {data: userLogin, error} = await authService.login(req.body)
        if(error !== null) {
          status = 500,
          message = 'username not registered'
        }
        res.send({
          status,
          message,
          data: userLogin
        })

      } catch (error) {
        res.send({status:500, message})

      }
    }
}
module.exports = authController;