var mongoose = require('mongoose');

var DB = {
    mongoose: mongoose,
    User: null,
    Post: null
}

DB.create_schemas = function () {
    var PostSchema = new DB.mongoose.Schema({
        titulo: String,
        texto: String,
        preview: String,
        dt_criacao: { type: Date, default: Date.now }
    });

    DB.Post = DB.mongoose.model('Post', PostSchema);
    return true;
}

DB.connect = function () {
    DB.mongoose.connect('mongodb://localhost/blog');
    return true;
}

DB.disconnect = function () {
    DB.mongoose.disconnect();
    return true;
}

module.exports = DB;
