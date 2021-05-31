const express = require('express');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/authMiddlewares');
const tokenMiddleware = require('./middlewares/tokenMiddlewares');

const authController = require('./controller/authController');
const eventController = require('./controller/eventController');

const app = express();

// Setup express middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', authMiddleware.authValidation, authController.create)
app.post('/login', authMiddleware.authValidation, authController.login)

app.post('/event', tokenMiddleware.verifyToken, eventController.create)
app.get('/event', tokenMiddleware.verifyToken, eventController.get)


app.listen(process.env.PORT || 3003, () => {
  console.log(`server is running on port ${PORT}`);
})