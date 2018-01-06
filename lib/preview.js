const Hapi = require('hapi');
const Swaggerize = require('swaggerize-hapi');
const config = require('../config');
const path = require('path');
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath();

const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: 8000 // eslint-disable-line no-magic-numbers
});

server.register(require('inert'), (err) => {

    if (err) {

        throw err;

    }

    server.route({
        handler: {
            file: {
                confine: false,
                path: path.join(config.OUTPUT_DIR, 'api.json')
            }
        },
        method: 'GET',
        path: '/localhost'
    });

    server.route({
        handler: {
            directory: {
                index: true,
                path: swaggerUiAssetPath
            }
        },
        method: 'GET',
        path: '/{param*}'
    });

});

server.register({
    options: {
        api: path.join(config.OUTPUT_DIR, 'api.json'),
        cors: true,
        handlers: path.join(config.APP_ROOT, 'handlers')
    },
    register: Swaggerize
});

server.start(() => {

    console.log('Mock server running at http://localhost:%s?url=localhost', server.info.port); // eslint-disable-line no-console

});

