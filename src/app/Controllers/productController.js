const Category = require('../Models/Category')
const Product = require('../Models/Product')

module.exports = {
  create(req, res) {
    // Pegar as categorias
    Category.all()
    .then(function(results) {
      const categories = results.rows
      return res.render('products/create.njk', { categories })
    }).catch(function(err) {
      throw new Error(err)
    })
  },

  async post(req, res) {
    // Lógica de Salvar
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Please, fill all fields!")
      }
    }

    let results = await Product.create(req.body)
    const productID = results.rows[0].id

    return res.redirect(`products/${productID}`)
  },
}