const express = require('express')
const app = express()
const port = 5000

const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://jihye1:yy181309@boilerplate.zxkj0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(()=>console.log('MongoDB Connected..')).catch(err=>console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
