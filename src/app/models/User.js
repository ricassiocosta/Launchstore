const Base = require('./Base')

Base.init({ table: 'users' })

module.exports = {
  ...Base, 
}

/*
  async delete(id) {
    let results = await db.query("SELECT * FROM products WHERE user_id = $1", [id])
    const products = results.rows

    const allFilesPromise = products.map(product => Product.files(product.id))
    let promiseResults = await Promise.all(allFilesPromise)

    await db.query('DELETE FROM users WHERE id = $1', [id])

    promiseResults.map(results => {
      results.rows.map(file => fs.unlinkSync(file.path))
    })

  }
  
  */