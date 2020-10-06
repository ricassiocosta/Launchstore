const express = require('express')
const routes = express.Router()

const CartController = require('../app/controllers/cartController')

routes.get('/', CartController.index)

module.exports = routes