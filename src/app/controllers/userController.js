const User = require('../models/User')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },

  async post(req, res) {
    const keys = Object.keys(req.body)

    for(key of keys) {
      if(req.body[key] == "") {
        return res.send("Por favor, preencha todos os campos!")
      }
    }

    const { email, cpf_cnpj } = req.body
    const user = await User.findOne({ 
      where: { email },
      or: { cpf_cnpj }
    })
  }
}