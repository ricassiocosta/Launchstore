const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/cartController')

routes.get('/', CartController.index)
      .post('/:id/adicionar', CartController.addOne)
      .post('/:id/remover', CartController.removeOne)

module.exports = routes
