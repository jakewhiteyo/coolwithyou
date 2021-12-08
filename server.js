const express = require('express')
const mongoose =require('mongoose')
const Article = require('./models/article')


const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// me
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/blog';
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})

// me
var PORT = process.env.PORT || 5000
//var http = require('http')
//var server = http.Server(app)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles : articles })
})

app.use('/articles', articleRouter)

//app.listen(5000)

// me
app.listen(PORT, function() {
    console.log("server running");
})