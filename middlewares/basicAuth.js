const basicAuth = require('basic-auth');
const auth = (req, res, next) => {
    const credentials = basicAuth(req);

    if (!credentials || credentials.name !== 'admin' || credentials.pass !== 'admin') {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }

    next();
};

module.exports = auth;
