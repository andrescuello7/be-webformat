require('dotenv').config();
const morgan = require('morgan');
const express = require("express");
const database = require("./database");

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware: Logger de solicitudes HTTP con Morgan
app.use(morgan('dev'));

// Settings: config options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes: routes (default routes are defined in app.routes)
app.use('/chatgpt', require("./router/router"));

// Server
app.listen(PORT, async () => {
    const db = await database.connect();
    console.log(`Server listening on port ${PORT} \nDatabase ${db}`);
});
