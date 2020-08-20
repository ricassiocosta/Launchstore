module.exports = {
  loginForm() {

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