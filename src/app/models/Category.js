const db = require('../../config/database')

module.exports = {
  all() {
    return db.query(`
      SELECT * FROM categories
    `)
  }
}