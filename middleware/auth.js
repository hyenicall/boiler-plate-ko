const { User } = require('../models/User')

let auth = (req, res, next) => {
  //인증처리 하는 곳

  //클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth

  //토큰 복호화 한 후 유저 찾기
  User.findByToken(token, (err, cb) => {
    if (err) throw err
    if (!user) return res.json({ isAuth: false, error: true })
    req.token = token
    req.user = user
    next()
  })

  //유저 있으면 인증 OK
  //유저 없으면 인증 NO
}

module.exports = { auth }
