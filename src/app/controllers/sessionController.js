const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../../lib/mailer')

module.exports = {
  loginForm(req, res) {
    return res.render('session/login')
  },

  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/usuarios')
  },

  logout(req, res) {
    req.session.destroy()
    return res.redirect('/')
  },

  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },

  async forgot(req, res) {
    const user = req.user
    try {
      const token = crypto.randomBytes(20).toString('hex')

      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com',
        subject: 'Recuperação de senha',
        html: `
          <h2>Perdeu a senha?</h2>
          <p>Não se preocupe, clique no link abaixo para recuperar sua senha</p>
          <p>
            <a href="http://192.168.1.42:3000/usuarios/recuperar-senha?token=${token}" target="_blank">Recuperar senha</a>
          </p>
        `
      })

      return res.render('session/forgot-password', {
        success: 'Verifique seu email para recuperar sua senha'
      })
    } catch (err) {
      console.error(err)
      return res.render('session/forgot-password', {
        error: 'Erro inesperado, tente novamente!'
      })
    }
  },

  resetForm() {

  },

  reset() {
    
  }
}