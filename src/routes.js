const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/productController')

routes.get('/', (req, res) => {
  return res.render('layout.njk')
})

routes.get('/products/create', ProductController.create)


module.exports = routes
