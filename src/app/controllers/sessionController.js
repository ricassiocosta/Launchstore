module.exports = {
  loginForm(req, res) {
    return res.render('session/index')
  },

  login() {

  },

  logout(req, res) {
    req.session.destroy()
    return res.redirect('/')
  },

  forgotForm() {

  },

  forgot() {

  },

  resetForm() {

  },

  reset() {
    
  }
}