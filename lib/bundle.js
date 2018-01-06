const SwaggerParser = require('swagger-parser');
const config = require('../config');
const fs = require('fs-extra');
const path = require('path');

const parser = new SwaggerParser();
const validateOptions = {
    allow: {
        empty: false,
        json: true,
        unknown: false,
        yaml: false
    }
};

const apiPath = path.resolve(config.APP_ROOT, 'api', 'api.json');
const outputPath = path.resolve(config.OUTPUT_DIR, 'api.json');

(async function bundleApi() {

    try {

        const bundledApi = await parser.validate(apiPath, validateOptions);

        await fs.outputFile(outputPath, JSON.stringify(bundledApi));

        console.log('API name: %s, Version: %s', bundledApi.info.title, bundledApi.info.version); // eslint-disable-line no-console

    } catch (error) {

        throw new Error(error);

    }

}());
