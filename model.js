var db = require('./db');

var Model = {
    db: db
}

Model.init = function () {
    Model.db.create_schemas();
}

Model.novoPost = function (request) {
    return new Promise(function (resolve, reject){

        titulo = request.body.titulo;
        corpo = request.body.texto;

        if (titulo && corpo) {
            c = Model.db.connect();

            if (c) {

                np = new Model.db.Post({
                    titulo: titulo,
                    texto: corpo,
                    preview: corpo.substr(0, 446)
                });

                np.save();

                Model.db.disconnect();

                resolve({aviso: "Post gravado com sucesso!"})
            } else {
                reject(Error("Nao foi possivel conectar com o banco."))
            }
        } else {
            reject(Error("Titulo e corpo sao campos obrigatorios."))
        }
    });
}

Model.buscaPosts = function () {
    return new Promise(function (resolve, reject){
        c = Model.db.connect();

        if (c) {
            Model.db.Post.find().sort({dt_criacao: -1}).exec(function(err, objs){

                Model.db.disconnect();

                if (err) {
                    reject(Error(err));
                } else if (objs.length > 0) {
                    resolve(objs);
                } else {
                    reject(Error("Nenhum Post encontrado"));
                }
            });
        } else {
            reject(Error("Erro ao conectar com o banco."))
        }
    });
}

Model.buscaPostsHome = function () {
    return new Promise(function (resolve, reject){
        c = Model.db.connect();

        if (c) {
            Model.db.Post.find().limit(4).sort({dt_criacao: -1}).exec(function(err, objs){

                Model.db.disconnect();

                if (err) {
                    reject(Error(err));
                } else if (objs.length > 0) {
                    resolve(objs);
                } else {
                    reject(Error("Erro ao realizar busca."));
                }
            });
        } else {
            reject(Error("Erro ao conectar com o banco."))
        }
    });
}

Model.buscaPost = function (request) {
    return new Promise(function (resolve, reject){
        id = request.params.id;

        c = Model.db.connect();

        if (id) {

            if (c) {
                Model.db.Post.find({_id: id}).limit(1).exec(function(err, objs) {
                    
                    Model.db.disconnect();

                    if (err) {
                        reject(Error(err));
                    } else if (objs.length > 0){
                        resolve(objs[0]);
                    } else {
                        reject(Error("Erro ao realizar busca."));
                    }

                });
            } else {
                reject(Error("Nao foi possivel se conectar ao banco."));
            }
        } else {
            reject(Error("E necessario um ID para realizar a busca."));
        }
    });
}

Model.updatePost = function (request) {
    return new Promise(function (resolve, reject){

        titulo = request.body.titulo;
        corpo = request.body.texto;
        id = request.body.id_post;

        if (titulo && corpo && id) {
            c = Model.db.connect();

            if (c) {

                preview = corpo.substr(0, 446)

                Model.db.Post.findByIdAndUpdate(id, { $set: { titulo: titulo, preview: preview, texto: corpo }},
                                                { new: true }, function (err, obj) {
                    
                    Model.db.disconnect();

                    if (err) {
                        reject(Error(err));
                    } else {
                        obj.aviso = "Post editado com sucesso.";
                        resolve(obj);
                    }
                });

            } else {
                reject(Error("Nao foi possivel conectar com o banco."))
            }
        } else {
            reject(Error("Titulo, corpo e ID sao campos obrigatorios."))
        }
    });
}

Model.removerPost = function (request) {
    return new Promise(function (resolve, reject){

        id = request.body.id_post;

        if (id) {
            c = Model.db.connect();

            if (c) {

                Model.db.Post.findByIdAndRemove(id, null, function (err, obj) {
                    
                    Model.db.disconnect();

                    if (err) {
                        reject(Error(err));
                    } else {
                        resolve(obj);
                    }
                });

            } else {
                reject(Error("Nao foi possivel conectar com o banco."))
            }
        } else {
            reject(Error("ID e um campo obrigatorio."))
        }
    });
}

module.exports = Model;
