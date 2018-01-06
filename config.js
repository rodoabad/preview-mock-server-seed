const path = require('path');

const APP_ROOT = __dirname;

module.exports = Object.freeze({
    API_FILEPATH: path.join(APP_ROOT, 'api', 'api.json'),
    APP_ROOT,
    OUTPUT_DIR: path.join(APP_ROOT, 'dist')
});
