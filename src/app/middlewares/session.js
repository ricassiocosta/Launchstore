function onlyUsers(req, res, next) {
  if(!req.session.userId) 
    return res.redirect('/usuarios/login')
  
  req.user = req.session.userId

  next()
}

function isLoggedRedirectToUsers(req, res, next) {
  if(req.session.userId) 
    return res.redirect('/usuarios')

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToUsers
}