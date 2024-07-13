require('dotenv').config();
const morgan = require('morgan');
const express =  require("express");
const router =  require("./router/router");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware: Logger de solicitudes HTTP con Morgan
app.use(morgan('dev'));

// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/chatgpt', router);

// Server
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
})
