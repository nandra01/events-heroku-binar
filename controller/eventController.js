const eventService = require('../services/eventService')
const eventController = {
    create: async (req, res) => {
    try {
        let status = 200;
        let message = 'OK';
        let data = {};
        const {data: eventCreated, error} = await eventService.create(req.body)
        //       console.log("🚀 ~ file: authController.js ~ line 8 ~ create: ~ error", typeof error)
        //   if(error !== null) {
        //     status = 500,
        //     message = 'username already registered'
        //   }
        res.send({
        status,
        message,
        data: eventCreated
        })
    
        } catch(error) {
        console.log("🚀 ~ file: authController.js ~ line 23 ~ create: ~ error", error)
        res.send({ status: 500, message: 'failed', data: error })
        }
    },

    get: async (req, res) => {
        try {
            let status = 200;
            let message = 'OK';
            let data = {};
            const {data: eventGet, error} = await eventService.get(req.body)

            res.send({
                status,
                message,
                data: eventGet
                })

        }catch (error) {
        console.log("🚀 ~ file: authController.js ~ line 23 ~ create: ~ error", error)
        res.send({ status: 500, message: 'failed', data: error })

        }
    }
}

module.exports = eventController