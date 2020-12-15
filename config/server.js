const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('../app/components/routes');
const port = process.env.PORT || 3000;

const server = (app) => {
    app.disable('x-powered-by');
    app.set('port', port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/', routes);

    app.get('/', (req, res) => {
        res.send('<h1>¡PetGram!</h1>');
    });
};

module.exports = server;