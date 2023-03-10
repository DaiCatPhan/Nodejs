const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cors = require('cors');


const app = express();
const port = 3000;

// cor
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
  }));

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
    nodemon : l???ng nghe s??? thay ?????i c???a code kh???i c???n f5 l???i lun ????? l???m
    npm i nodemon --save-dev : cai vao d??? ??n th??i .
    c??i xong n?? n???m trong dexvdepence..

    k c???n ch???y node index.js n??a m?? thay v??o ???? l?? npm start kkk
    trong script th??m v?? :  "start": "nodemon --inspect src/index.js",

    7 add git
    - t???o 1 file .gitignore b??? .vscode , node-module/ 

    8 install morgan
        l?? log c??i request HTTP ra c???ng k c???n quan tr???ng l???m
        Kh???i c??i c???ng ??c
        npm i morgan --save-dev 

    9. templace engine(handlebars)    
        thu vien handlebars 
        npm install express-handlebars

        Chia layout 

})


*/
