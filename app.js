const express = require("express");
const app = express()
const port = 8000

// Path for dependecies
app.use(express.static('public'))
app.use('/css', express.static(__dirname+'public/css'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/img', express.static(__dirname+'public/img'))

// Path for html files
app.set('views', './views')
app.set('view engine', 'ejs')

// Pages render
const index = (req, res) => {
    res.render('home')
}

const game = (req, res) => {
    res.render('game', {text:'this is about page'})
}

const preGame = (req, res) => {
    res.render('preGame', {text:'They give the path for the save'})
}


// Redirections
app.get('', (req, res) => {index(req, res)})
app.get('/game', (req, res) => {game(req, res)})
app.get('/preGame', (req, res) => {preGame(req, res)})


app.listen(port, () => console.info(`server open on ${port}`))

// Serveur fait a l'aide de https://raddy.dev/blog/nodejs-setup-with-html-css-js-ejs/ ( tuto pour express )