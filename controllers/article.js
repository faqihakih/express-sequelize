const Article = require('../models');
const response = require('../api/apiUtils');

// get all articles
exports.articles = async (req, res) => {
    const data = await Article.Article.findAll({
        where : {status : true}
    },{
        attributes: ['id','title','description', 'status'],
        order: [
            ['createdAt', 'DESC']
        ]
    })
    .then(result => result)
    .catch(err => {
        res.status(500);
        response.failed("failed", err,res)
    });
    res.status(200);
    response.success("Success get all data", data, res)
}

// create article
exports.createArticle = (req, res) => {
    const {title, description} = req.body;

    Article.Article.create({
        title, description
    }).then(result => {
        res.status(201);
        response.success("success create article", result, res)
    }).catch(err => {
        const {errors} = err;
        const errMessage = {};
        errors.map(item => errMessage[item.path] = item.message)
        res.status(503);
        response.failed("failed", errMessage, res);
    });
}

// update article
exports.updateArticle = (req, res) => {
    const { id } = req.params;
    const { title, description, status} = req.body;

    Article.Article.update({
        title,
        description,
        status
    },{
        where: { id }
    })
    .then(async data => {
        if (data.join("") > 0) {
            const article = await Article.Article.findOne({where: { id }})
            .then(result => result);

            res.status(200);
            response.success("success update article", article, res);
            return
        }
        response.failed("failed", {id: "Id not found"}, res);
    })
    .catch(err => console.log(err));
}

// delete article
exports.deleteArticle = (req, res) => {
    const { id } = req.params;
    
    Article.Article.destroy(
        {where : {id}}
        )
    .then(result => {
        if (result > 0) {
            res.status(202);
            response.success("Delete success", {}, res);
            return
        }
        res.status(404);
        response.failed("Delete failed", {id : "id not found"}, res);
    })
    .catch(err => console.log(err));
}

// detail by id
exports.detailArticle = async (req, res) => {
    const { id } = req.params;

    const article = await Article.Article
    .findOne({where : { id }, raw: true})
    .then(result => result)
    .catch(err => console.log(err));

    if (article) {
        Article.Article.update({views: +article.views + 1}, {where : { id }});
        response.success("success show data", article , res);
    }else{
        res.status(404)
        response.failed("Data Not Found", undefined, res)
    }

}