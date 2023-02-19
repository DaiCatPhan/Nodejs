const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

const app = express();
const port = 3000;

// middleware
app.use(SortMiddleware);

// cookie-parser
app.use(cookieParser());

// connect to mongoogseDB
const db = require('./config/db') 
db.connect();

// middleware xu li form du lieu
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// PUT 
app.use(methodOverride('_method'));

// Template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a,b) => a+b, 
            sortable: (field , sort) => {
                const sortType = field === sort.column ? sort.type : 'default' ;
                const icons = {
                    default: "fas fa-sort" ,
                    desc: "fas fa-sort-amount-up",
                    asc :"fas fa-sort-amount-down-alt", 
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `
                    <a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>
                `
            },
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resoures','views')); 

// Router init
const route = require('./routes/index');
route(app);

app.listen(port, () => {
    console.log(` app listening on port ${port}`);
});







/* 
   4 npm init -> tu tao ra trang package.json 
    tao file index.js   song song vs package.json

   5 cai express: npm install express -> trong package.json co them muc dependence :{express:"".}
    -> tu tao ra package-lock.json

    FILE index.js chay dong nay 
    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)

    node index.js la chay

    6 install nodemon & inspector
    nodemon : lắng nghe sự thay đổi của code khỏi cần f5 lại lun đả lắm
    npm i nodemon --save-dev : cai vao dự án thôi .
    cài xong nó nằm trong dexvdepence..

    k cần chạy node index.js nũa mà thay vào đó là npm start kkk
    trong script thêm vô :  "start": "nodemon --inspect src/index.js",

    7 add git
    - tạo 1 file .gitignore bỏ .vscode , node-module/ 

    8 install morgan
        là log cái request HTTP ra củng k cần quan trọng lắm
        Khỏi cài củng đc
        npm i morgan --save-dev 

    9. templace engine(handlebars)    
        thu vien handlebars 
        npm install express-handlebars

        Chia layout 

})


*/
