const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine','njk')

const middleware = (req, res, next) => {
  const { age } = req.query
  if(!age) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('formAge')
})

app.get('/check', (req, res) => {
  const { age } = req.query
  if(age >= 18) {
    res.redirect(`/major?age=${age}`)
  } else {
    res.redirect(`/minor?age=${age}`)
  }
})

app.get('/major', middleware, (req, res) => {
  res.send(`Você é maior de idade e tem ${req.query.age} anos`)
})

app.get('/minor', middleware, (req, res) => {
  res.send(`Você é menor de idade e tem ${req.query.age} anos`)
})

app.listen(3333)
