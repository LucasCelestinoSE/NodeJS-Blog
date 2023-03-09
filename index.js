const express = require("express");
const app = express()
const connection = require("./database/Database")
const bodyParser = require('body-parser')
const categoriesController = require("./categories/categoriesController")
const articlesController = require('./articles/articlesController')
const Articles = require('./articles/Articles')
const Category = require('./categories/Categories')
const parser = require('./funcAux/domParser')
// viwe engine
app.set('view engine', 'ejs');


// static
app.use(express.static('public'));

// body-parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Database
connection.authenticate().then(() =>{
    console.log("conexão com o banco feita")
}).catch((error) =>{
    console.log(error)
})
// Acesando controller
app.use('/',categoriesController);
app.use('/',articlesController);

//carregando arquivos staticos
app.use(express.static('public'));
app.get("/", (req,res) => {
    Articles.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {articles:articles, categories: categories})
        })
    })
});
app.get("/:slug", (req,res) => {
    var slug = req.params.slug
    Articles.findOne({
        where: {
            slug: slug
        }
    }).then(articles =>{
        if (articles != undefined){
            Category.findAll().then(categories => {
                res.render('index', {articles:articles, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
});
app.get('/category/:slug', (req,res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [
            {model: Articles}
        ]
    }).then(category =>{
        if (category != undefined){
            Category.findAll().then(categories =>{
                res.render('index', {articles: category.Articles, categories: categories})
            })
        }else{
            res.redirect('/')
        }
    }).catch(err => {
        res.redirect('/')
    })
})
app.listen(8080,()=>{
    console.log("testando")
})