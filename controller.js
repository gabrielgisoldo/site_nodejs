var Controller = {
    app: null,
    model: null
}

Controller.init = function (app, model) {
    Controller.app = app;
    Controller.model = model;

    Controller.app.get(['/', '/index', '/home'], function(req, res){
        posts = Controller.model.buscaPostsHome();

        posts.then(function (suc){
            res.render("home", {posts: suc});
        }, function (err) {
            res.render("home", {aviso: err.message});
        });
    });

    Controller.app.get('/post/:id', function(req, res){
        post = Controller.model.buscaPost(req);

        post.then(function (suc) {
            res.render("post", suc);
        }, function (err) {
            res.render("post", {aviso: err.message});
        });
    });

    Controller.app.get('/novo', function(req, res){
        res.render("novo_post");
    });

    Controller.app.get('/editar/:id', function(req, res){
        post = Controller.model.buscaPost(req);

        post.then(function (suc) {
            res.render("edita_post", suc);
        }, function (err) {
            res.render("edita_post", {aviso: err.message});
        });
    });

    Controller.app.post('/gravar_post', function(req, res){
        s = Controller.model.novoPost(req);

        ret = {};

        s.then(function (suc){
            ret.aviso = suc.aviso;
        }, function (err){
            ret.aviso = err.message;
        }).then(function () {

            posts = Controller.model.buscaPosts();

            posts.then(function (suc) {
                ret.posts = suc;
            }, function (err) {
                ret.aviso = ret.aviso?ret.aviso + '<br>' + err.message:err.message;
            }).then(function () {
                res.render("postagens", ret);
            });
        });
    });

    Controller.app.post('/editar_post', function(req, res){
        u = Controller.model.updatePost(req);

        u.then(function (suc) {
            res.render("edita_post", suc);
        }, function (err) {
            res.render("editar_post", {aviso: err.message});
        });
    });

    Controller.app.post('/remover_post', function(req, res){
        rm = Controller.model.removerPost(req);

        ret = {};

        rm.then(function (suc) {
            ret.aviso = "Post removido com sucesso.";
        }, function (err) {
            ret.aviso = err.message;
        }).then(function () {

            posts = Controller.model.buscaPosts();

            posts.then(function (suc) {
                ret.posts = suc;
            }, function (err) {
                ret.aviso = ret.aviso?ret.aviso + '<br>' + err.message:err.message;
            }).then(function () {
                res.render("postagens", ret);
            });
        });
    });

    Controller.app.get('/posts', function(req, res){
        var posts = Controller.model.buscaPosts();

        posts.then(function () {
            res.render("postagens", {posts: posts});
        }, function (err) {
            res.render("postagens", {posts: [], aviso: err.message});
        })
    });

    Controller.app.get('*', function(req, res){
        res.status(404).send('what???');
    });
}

module.exports = Controller;
