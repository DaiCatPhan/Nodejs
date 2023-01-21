const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;



// connect to db
const db = require('./config/db') 
db.connect();

// middleware xu li form du lieu
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoures','views')); 

// Router init
const route = require('./routes');
route(app);

app.listen(port, () => {
    console.log(` app listening on port ${port}`);
});
