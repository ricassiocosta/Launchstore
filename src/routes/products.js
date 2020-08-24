const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ProductController = require('../app/controllers/productController')
const searchController = require('../app/controllers/searchController')
const { onlyUsers } = require('../app/middlewares/session')

// Products
routes.get('/criar', onlyUsers,ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/editar', ProductController.edit)

routes.post('/', multer.array('photos', 6), ProductController.post)
routes.put('/', multer.array('photos', 6), ProductController.put)
routes.delete('/', ProductController.delete)

// Search
routes.get('/buscar', searchController.index)

module.exports = routes
