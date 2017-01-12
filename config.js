/**
 * Created by joeny on 12/23/16.
 */
// Shared env vars in all environments
var shared = {
    URL_PATH: process.env.URL_PATH || 'http://localhost:3000/',
    URL_DOMAIN: process.env.URL_DOMAIN || 'www.mywaterbuffalo',
    API_TOKEN: process.env.API_TOKEN,
    DEBUG: process.env.DEBUG || true,
    VERSION: process.env.VERSION || 'debug'
};

var debug = null;

if (process.env.DEBUG == 'false'){
    debug = false;
} else {
    debug = true;
}

var environments = {
    development: {
        ENV_VARS: shared,
        API_CONFIG: {
            url: 'http://127.0.0.1:8000/',
            path: 'http://localhost:3000/',
            domain: 'localhost',
            accounts: 'rest-auth/'
        },
        GLOBAL_SETTINGS: {
            debug: debug,
            version: '.debug'
        }
    },
    production: {
        ENV_VARS: shared,
        API_CONFIG: {
            url: 'https://api.mywaterbuffalo.com/',
            path: 'https://wwww.mywaterbuffalo.com',
            domain: 'www.mywaterbuffalo',
            accounts: 'rest-auth/'
        },
        GLOBAL_SETTINGS: {
            debug: false,
            version: process.env.VERSION || 'error'
        }
    }
};

// environments.production.buildpack  = process.env.BUILDPACK_URL;

module.exports = environments;