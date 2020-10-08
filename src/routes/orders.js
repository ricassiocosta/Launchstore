const express = require('express')
const routes = express.Router()

const OrderController = require('../app/controllers/orderController')
const { onlyUsers } = require('../app/middlewares/session')

routes.post('/', onlyUsers, OrderController.post)
      .get('/', onlyUsers, OrderController.index)
      .get('/vendas', onlyUsers, OrderController.sales)
      .post('/:id/:action', onlyUsers, OrderController.update)
      .get('/:id', onlyUsers, OrderController.show)

module.exports = routes
