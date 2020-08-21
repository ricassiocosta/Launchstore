const express = require('express')
const routes = express.Router()
const homeController = require('../app/controllers/homeController')
const users = require('./users')
const products = require('./products')

// Home
routes.get('/', homeController.index)

routes.use('/produtos', products)
routes.use('/usuarios', users)

//Alias
routes.get('/anuncios/criar', (req, res) => {
  return res.redirect('produtos/criar')
})

routes.get('/conta', (req, res) => {
  return res.redirect('usuarios/login')
})

module.exports = routes
