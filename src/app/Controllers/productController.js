const Category = require('../Models/Category')

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
}