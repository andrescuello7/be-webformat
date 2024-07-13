require('dotenv').config();
const morgan = require('morgan');
const express =  require("express");
const router =  require("./router/router");
const database =  require("./config/database");

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
app.listen(PORT, async () => {
    const db = await database.connect();
    console.log(`Server listening on port ${PORT} \nDatabase ${db}`);
})
