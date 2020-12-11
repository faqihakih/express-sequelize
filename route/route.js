const {articles, createArticle, updateArticle, deleteArticle, detailArticle} = require('../controllers/article')

module.exports = app => {
    app.get('/', (req, res) => {
        res.json({ message : "Hello Wordl"});
    })

    app.get('/articles', articles);
    app.post('/articles', createArticle);
    app.put('/articles/:id', updateArticle);
    app.delete('/articles/:id', deleteArticle);
    app.get('/articles/:id', detailArticle);
}