const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

//middleware
app.use(bodyParser.json());
app.use('/', routes);

app.use((req, res, next) => {
    let err = new Error('Route not found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;