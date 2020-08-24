function onlyUsers (req, res, next) {
  if(!req.session.userId) 
    return res.redirect('/usuarios/login')

  next()
}

module.exports = {
  onlyUsers
}