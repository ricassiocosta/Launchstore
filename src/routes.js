const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/productController')

routes.get('/', (req, res) => {
  return res.render('layout.njk')
})

routes.get('/products/create', ProductController.create)
routes.post('/products', ProductController.post)

//Alias
routes.get('/ads/create', (req, res) => {
  return res.redirect('/products/create')
})
module.exports = routes
