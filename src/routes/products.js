const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')
const ProductController = require('../app/controllers/productController')
const searchController = require('../app/controllers/searchController')
const { onlyUsers } = require('../app/middlewares/session')


// Search
routes.get('/buscar', searchController.index)

// Products
routes.get('/criar', onlyUsers, ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/editar', onlyUsers, ProductController.edit)

routes.post('/', onlyUsers, multer.array('photos', 6), ProductController.post)
routes.put('/', onlyUsers, multer.array('photos', 6), ProductController.put)
routes.delete('/', onlyUsers, ProductController.delete)


module.exports = routes
