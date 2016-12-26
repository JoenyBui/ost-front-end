/**
 * Created by joeny on 12/23/16.
 */
// Shared env vars in all environments
var shared = {
    apiUrl: process.env.API_URL || 'http://127.0.0.1:8000',
    apiToken: process.env.API_TOKEN,
    debug: process.env.DEBUG || true,
    version: process.env.VERSION || 'debug'
};

var debug = null;

if (process.env.DEBUG == 'false'){
    debug = false;
} else if (process.env.DEBUG == 'true') {
    debug = true;
}

//
var environments = {
    development: {
        ENV_VARS: shared,
        API_CONFIG: {
            url: 'http://127.0.0.1:8000',
            path: 'http://localhost:3000/',
            domain: 'localhost'
        },
        GLOBAL_SETTINGS: {
            debug: debug,
            version: '.debug'
        }
    },
    production: {
        ENV_VARS: shared,
        API_CONFIG: {
            url: 'https://api.mywaterbuffalo.com',
            path: 'https://wwww.mywaterbuffalo.com',
            domain: 'www.mywaterbuffalo'
        },
        GLOBAL_SETTINGS: {
            debug: false,
            version: process.env.VERSION || 'error'
        }
    }
};

// environments.production.buildpack  = process.env.BUILDPACK_URL;

module.exports = environments;