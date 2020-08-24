const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/sessionController')
const UserController = require('../app/controllers/userController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')
const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session')


// // login/logout
routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// // reset password / forgot
// routes.get('/esqueceu-senha', SessionController.forgotForm)
// routes.get('/redefinir-senha', SessionController.resetForm)
// routes.post('/esqueceu-senha', SessionController.forgot)
// routes.post('/redefinir-senha', SessionController.reset)

// // user register
routes.get('/registrar', UserController.registerForm)
routes.post('/registrar', UserValidator.post, UserController.post)

routes.get('/', onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.update, UserController.update)
// routes.delete('/', UserController.delete)

module.exports = routes
