const express = require('express')
const routes = express.Router()

const SessionController = require('../app/controllers/sessionController')


// login/logout
routes.get('/login', SessionController.loginForm)
routes.post('/login', SessionController.login)
routes.post('/logout', SessionController.logout)

// reset password / forgot
routes.get('/esqueceu-senha', SessionController.forgotForm)
routes.get('/redefinir-senha', SessionController.resetForm)
routes.post('/esqueceu-senha', SessionController.forgot)
routes.post('/redefinir-senha', SessionController.reset)

// user register
routes.get('/registrar', UserController.registerForm)
routes.post('/registrar', UserController.post)

routes.get('/', UserController.show)
routes.put('/', UserController.put)
routes.delete('/', UserController.delete)

module.exports = routes