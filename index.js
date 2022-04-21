const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const config = require('./config/key')

const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected..'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!hihihihi')
})

app.post('/register', (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 받아오면
  // 정보를 DB에 넣어준다.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true,
    })
  })
})

app.post('/login', (req, res) => {
  // 요청된 이메일을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ loginSuccess: false, message: '이메일이 없습니다.' })
    }
    // 이메일 있다면 요청된 이메일이 DB에 있다면 비밀번호 일치 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        })

      // 비밀번호 일치시 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err)

        // 토큰을 저장한다(쿠키나 로컬 스트리지)
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는  Authentication 이 True 라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).send({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
