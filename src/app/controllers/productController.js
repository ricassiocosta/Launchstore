const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')
const { formatPrice } = require('../../lib/utils')

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
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    if(req.files.length == 0) {
      return res.send('Por favor, envie ao menos uma imagem!')
    }

    let results = await Product.create(req.body)
    const productID = results.rows[0].id

    const filesPromise = req.files.map(file => {
      File.create(file, productID)
    })
    await Promise.all(filesPromise)

    return res.redirect(`produtos/${productID}/editar`)
  },

  async show(req, res) {
    let results = await Product.find(req.params.id)
    const product = results.rows[0]
    if(!product) return res.send('Produto não encontrado!')

    return res.render('products/show', { product })
  },

  async edit(req, res) {

    let results = await Product.find(req.params.id)
    const product = results.rows[0]

    if(!product) return res.send('Produto não encontrado!')

    product.price = formatPrice(product.price)
    product.old_price = formatPrice(product.old_price)

    results = await Category.all() 
    const categories = results.rows

    results = await Product.files(product.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
    }))

    return res.render('products/edit.njk', { product, categories, files })
  },

  async put(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "" && key != "removed_files") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    if(req.files.length != 0) {
      const newFilesPromise = req.files.map(file => File.create(file, req.body.id))
      await Promise.all(newFilesPromise)
    }

    if(req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(",")
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => File.delete(id))
      await Promise.all(removedFilesPromise)
    }

    req.body.price = req.body.price.replace(/\D/g, "")

    if(req.body.old_price != req.body.price) {
      const oldProduct = await Product.find(req.body.id)

      req.body.old_price = oldProduct.rows[0].price
    }

    await Product.update(req.body)
    return res.redirect(`/produtos/${req.body.id}/editar`)
  },

  async delete(req, res) {
    await Product.delete(req.body.id)

    return res.redirect('/produtos/criar')
  } 
}