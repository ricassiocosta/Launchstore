const express = require('express')
const routes = express.Router()
const homeController = require('../app/controllers/homeController')
const users = require('./users')
const products = require('./products')
const cart = require('./cart')

// Home
routes.get('/', homeController.index)

routes.use('/produtos', products)
routes.use('/usuarios', users)
routes.use('/carrinho', cart)

//Alias
routes.get('/anuncios/criar', (req, res) => {
  return res.redirect('/produtos/criar')
})

routes.get('/conta', (req, res) => {
  return res.redirect('/usuarios/login')
})

module.exports = routes
