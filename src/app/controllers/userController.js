const User = require('../models/User')
const { formatCpfCnpj, formatCep } = require('../../lib/utils')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },

  async post(req, res) {

    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect('/usuarios')
  },

  async show(req, res) {
    const { user } = req

    console.log(user)

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.cep = formatCep(user.cep)

    return res.render('user/index', { user })
  },

  async update(req, res) {
    try {
      const { user } = req
      let { name, email, cpf_cnpj, cep, address } = req.body
      cpf_cnpj =  cpf_cnpj.replace(/\D/g, ""),
      cep =  cep.replace(/\D/g, ""),

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        address
      })

      return res.render('user/index', {
        user: req.body,
        success: 'Informações atualizadas com sucesso!'
      })
      
    } catch (error) {
      console.error(error)
      return res.render('user/index', {
        error: 'Eita! Tivemos um probleminha aqui :/'
      })
    }
  }
}