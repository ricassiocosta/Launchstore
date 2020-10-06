const Cart = require('../../lib/cart')

const LoadProductService = require('../services/LoadProductService')

module.exports = {
  async index(req, res) {
    try {
      let { cart } = req.session

      cart = Cart.init(cart)

      return res.render('cart/index', { cart })
    } catch (error) {
      console.error(error)
    }
  },

  async addOne(req, res) {
    try {
      const { id } = req.params
      const product = await LoadProductService.load('product', { where: {id: id}})

      let { cart } = req.session
      req.session.cart = Cart.init(cart).addOne(product)

      return res.redirect('/carrinho')
    } catch (error) {
      console.error(error)
    }

  },

  async removeOne(req, res) {
    try {
      let { id } = req.params
      let { cart } = req.session
      if(!cart) {
        return res.redirect('/carrinho')
      }

      req.session.cart = Cart.init(cart).removeOne(id)

      return res.redirect('/carrinho')
    } catch (error) {
      console.error(error)
    }

  },

  delete(req, res) {
    let { id } = req.params
    let { cart } = req.session
    if(!cart) return res.redirect('/carrinho')

    req.session.cart = Cart.init(cart).delete(id)

    return res.redirect('/carrinho')
  }
}