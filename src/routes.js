const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/productController')
const homeController = require('./app/controllers/homeController')
const searchController = require('./app/controllers/searchController')

// Home
routes.get('/', homeController.index)

// Products
routes.get('/produtos/criar', ProductController.create)
routes.get('/produtos/:id', ProductController.show)
routes.get('/produtos/:id/editar', ProductController.edit)

routes.post('/produtos', multer.array('photos', 6), ProductController.post)
routes.put('/produtos', multer.array('photos', 6), ProductController.put)
routes.delete('/produtos', ProductController.delete)

// Search
routes.get('/buscar', searchController.index)

//Alias
routes.get('/anuncios/criar', (req, res) => {
  return res.redirect('/produtos/criar')
})
module.exports = routes
