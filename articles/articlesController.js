const express = require("express")
const router = express.Router()
const Category = require('../categories/Categories')
const Article = require('./Articles')
const slugify = require('slugify')
const parser = require('../funcAux/domParser')
router.get('/admin/articles/new', (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
})
router.get('/admin/articles', (req,res) =>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render('admin/articles/index', {articles: articles, parser: parser})
    })
})
router.post('/articles/save', (req,res) =>{
    var title = req.body.title
    var body = req.body.body
    var category = req.body.category

    Article.create({
        title: title.replace(/<[^>]*>/g, ''),
        slug: slugify(title.replace(/<[^>]*>/g, '')),
        body: body.replace(/<[^>]*>/g, ''),
        categoryId: category.replace(/<[^>]*>/g, '')
    }).then(() => {
        res.redirect('/admin/articles')
    })
})
router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }else{// NÃO FOR UM NÚMERO
            res.redirect("/admin/articles");
        }
    }else{ // NULL
        res.redirect("/admin/articles");
    }
});
module.exports = router