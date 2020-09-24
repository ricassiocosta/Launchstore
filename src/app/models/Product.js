const Base = require('./Base')

Base.init({ table: 'files' })

module.exports = {
  ...Base,

  files(id) {
    return db.query(`
      SELECT * FROM files WHERE product_id = $1
    `, [id])
  },

  search(params) {
    const { filter, category } = params

    let query = "",
        filterQuery = `WHERE`

    if(category) {
      filterQuery = `${filterQuery}
        products.category_id = ${category}
        AND
      `
    }

    filterQuery = `
      ${filterQuery}
      (products.name ILIKE '%${filter}%'
      OR products.description ILIKE '%${filter}%')
    `

    query = `
      SELECT products.*,
        categories.name AS category_name
      FROM products
      LEFT JOIN categories ON (products.category_id = categories.id)
      ${filterQuery}
    `

    return db.query(query)
  }
}
/*
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
}*/