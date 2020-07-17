const db = require('../../config/database')

module.exports = {
  create(file, productID) {
    // PERSISTINDO DADOS
    const query = `
    INSERT INTO files (
      name,
      path,
      product_id
    ) VALUES ( $1, $2, $3 )
    RETURNING ID
    `

    const values = [
      file.filename,
      file.path,
      productID
    ]

    return db.query(query, values)
  },
}