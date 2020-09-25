const { unlinkSync } = require('fs')
const Category = require('../models/Category')
const Product = require('../models/Product')
const File = require('../models/File')

const { formatPrice, date } = require('../../lib/utils')

module.exports = {
  async create(req, res) {
    try {
      const categories = await Category.findAll()
      return res.render('products/create', { categories })
    } catch (error) {
      console.error(error);
    }
  },

  async post(req, res) {
    try {
      const keys = Object.keys(req.body)

      for(key of keys) {
        if(req.body[key] == "") {
          return res.send("Por favor, preencha todos os campos!")
        }
      }

      if(req.files.length == 0) {
        return res.send('Por favor, envie ao menos uma imagem!')
      }

      let { category_id, name, description, old_price, price, quantity, status } = req.body
      price = price.replace(/\D/g, "")

      const product = await Product.create({
        category_id, 
        user_id: req.session.userId,
        name, 
        description, 
        old_price: old_price || price, 
        price, 
        quantity, 
        status: status || 1
      })

      const filesPromise = req.files.map(file => {
        File.create({ name: file.filename, path: file.path, product_id: product.id})
      })
      await Promise.all(filesPromise)

      return res.redirect(`produtos/${product.id}`)
    } catch (error) {
      console.error(error);
    }
  },

  async show(req, res) {
    try {
      const product = await Product.find(req.params.id)
      if(!product) return res.send('Produto não encontrado!')

      const { day, hour, minutes, month } = date(product.updated_at)

      product.published = {
        day: `${day}/${month}`,
        hour: `${hour}h${minutes}`
      }
      
      product.old_price = formatPrice(product.old_price)
      product.price = formatPrice(product.price)

      let files = await Product.files(product.id)
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('products/show', { product, files })
    } catch (error) {
      console.error(error);
    }
  },

  async edit(req, res) {
    try {
      const product = await Product.find(req.params.id)

      if(!product) return res.send('Produto não encontrado!')

      product.price = formatPrice(product.price)
      product.old_price = formatPrice(product.old_price)

      const categories = await Category.findAll() 

      let files = await Product.files(product.id)
      files = files.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
      }))

      return res.render('products/edit.njk', { product, categories, files })
    } catch (error) {
      console.error(error);
    }
  },

  async put(req, res) {
    try {
      const keys = Object.keys(req.body)

      for(key of keys) {
        if(req.body[key] == "" && key != "removed_files") {
          return res.send("Por favor, preencha todos os campos!")
        }
      }

      let { category_id, name, description, old_price, price, quantity, status } = req.body
      price = price.replace(/\D/g, "")

      if(req.files.length != 0) {
        const newFilesPromise = req.files.map(file => File.create({
          name: file.name,
          path: file.path,
          product_id: req.body.id
        }))
        await Promise.all(newFilesPromise)
      }

      if(req.body.removed_files) {
        const removedFiles = req.body.removed_files.split(",")
        const lastIndex = removedFiles.length - 1
        removedFiles.splice(lastIndex, 1)

        const removedFilesPromise = removedFiles.map(async (id) => {
          const files = await File.findAll({where: {id}})
          await File.delete(id)
          files.map(file => {
            try {
              unlinkSync(file.path)
            } catch (error) {
              console.error(error);
            }
          })

        })
        await Promise.all(removedFilesPromise)
      }

      if(old_price != price) {
        const oldProduct = await Product.find(req.body.id)

        old_price = oldProduct.price
      }

      await Product.update(req.body.id, {
        category_id, name, description, old_price, price, quantity, status
      })
      return res.redirect(`/produtos/${req.body.id}`)
    } catch (error) {
      console.error(error);
    }
  },

  async delete(req, res) {
    try {
      const files = await Product.files(req.body.id)
      await Product.delete(req.body.id)

      files.map(file => {
        try {
          unlinkSync(file.path)
        } catch (error) {
          console.error(error);
        }
      })

      return res.redirect('/produtos/criar')
    } catch (error) {
      console.error(error);
    }
  } 
}