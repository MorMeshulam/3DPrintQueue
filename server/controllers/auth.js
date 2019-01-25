var secret = require('../config/secrets');

var AuthController = (function () {

    this.isAuthenticate = false;

    function auth(token) {
        if (token === secret.AUTH_TOKEN) {
            this.isAuthenticate = true;
            console.log('authentication success:', token);
            return true;
        }
        else {
            console.log('authentication failed:', token);
            return false;
        }
    }

    return {
        auth
    }

});

var ctrl = AuthController();

module.exports = ctrl;