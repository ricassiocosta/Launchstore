const db = require('../../config/database')

module.exports = {
  create(data, callback) {
    // PERSISTINDO DADOS
    const query = `
    INSERT INTO products (
      category_id,
      user_id,
      name,
      description,
      old_price,
      price,
      quantity,
      status
    ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 )
    RETURNING ID
    `

    data.price = data.price.replace(/\D/g, "")

    const values = [
      data.category_id,
      data.user_id || 1,
      data.name,
      data.description,
      data.old_price || data.price,
      data.price,
      data.quantity,
      data.status || 1,
    ]

    return db.query(query, values)
  },
}