function onlyUsers(req, res, next) {
  if(!req.session.userId) 
    return res.redirect('/usuario/login')
  
  req.user = req.session.userId

  next()
}

function isLoggedRedirectToUsers(req, res, next) {
  if(req.session.userId) 
    return res.redirect('/usuario')

  next()
}

module.exports = {
  onlyUsers,
  isLoggedRedirectToUsers
}