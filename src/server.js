const dotenv = require("dotenv").config();
const express = require("express");
const errorHandler = require("./util/middleware/errorHandler");
const path = require("path");
const ejs = require('ejs');
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require("./util/middleware/credentials");

const initializeServer = async () => {
    const app = express();

    port = process.env.PORT || 5000;

    app.use(credentials);
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../public')));

    app.use('/', require('./routes/root'));

    app.use('/client/video', require('./routes/api/client/clientVideo'));
    app.use('/curate', require('./routes/api/client/curateRoute'));
    app.use('/art', require('./routes/api/client/artRoute'));

    app.all('*', (req, res) => {
        res.status(404);
        if (req.accepts('html')) {
            res.sendFile(path.join(__dirname, 'views', '404.html'));
        } else if (req.accepts('json')) {
            res.json({ "error": "404 Not Found" });
        } else {
            res.type('txt').send("404 Not Found");
        }
    });

    app.use(errorHandler);

    app.listen(port, () => {
        console.log(`Server runnig on port ${port}`)
    });
};

initializeServer();