const express = require('express')
const routes = express.Router()
const homeController = require('../app/controllers/homeController')
const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

// Home
routes.get('/', homeController.index)

routes.use('/produtos', products)
routes.use('/usuario', users)
routes.use('/carrinho', cart)
routes.use('/pedidos', orders)

//Alias
routes.get('/anuncios/criar', (req, res) => {
  return res.redirect('/produtos/criar')
})

routes.get('/conta', (req, res) => {
  return res.redirect('/usuario/login')
})

module.exports = routes
