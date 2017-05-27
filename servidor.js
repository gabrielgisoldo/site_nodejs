var http = require("http");
var express = require("express");
var bp = require("body-parser");
var kleidust = require('klei-dust');

var Servidor = {
    app: express(),
    http: http,
    server: null
}

Servidor.config = function (engine) {
    // Servidor.app.set('view engine', engine == undefined? 'ejs':engine);
    kleidust.setOptions({extension: 'html'});
    Servidor.app.set('views', 'views');
    Servidor.app.engine('html', kleidust.dust);
    Servidor.app.set('view engine', 'html');
    Servidor.app.use(bp());
    Servidor.app.use('/css', express.static('views/css'));
    Servidor.app.use('/js', express.static('views/js'));
    Servidor.app.use('/pictures', express.static('views/pictures'));
    return true;
}

Servidor.start_server = function (port) {
    Servidor.server = Servidor.http.createServer(Servidor.app);
    Servidor.server.listen(port == undefined? 8080:port);
    return true;
}

Servidor.close_server = function () {
    Servidor.server.close();
    Servidor.server = null;
    return true;
}

module.exports = Servidor;
