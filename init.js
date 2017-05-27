var servidor = require('./servidor');
var model = require('./model');
var controler = require('./controller');

servidor.config();

model.init();

controler.init(servidor.app, model);

servidor.start_server();
