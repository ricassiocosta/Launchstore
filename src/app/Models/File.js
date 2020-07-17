const db = require('../../config/database')
const fs = require('fs')

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

  async delete(id) {

    try {
      const results = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
      const file = results.rows[0]

      fs.unlinkSync(file.path)
      return db.query(`DELETE FROM files WHERE id = $1`, [id])
    } catch(err) {
      console.error(err)
    }
  }
}