require('dotenv').config();
const express = require('express');
const connect = require('./schemas');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors')
app.use(cors());

connect();

const useMiddleWare = (req, res, next) => {
    console.log('Request URL : ', req.originalUrl, ' - ', new Date());
    next();
};

const removeHeader = (req, res, next) => { //x-Powerd-By 제거
    res.removeHeader("X-Powered-By");
    next();
};

// swagger 적용
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// ejs 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 미들웨어
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(useMiddleWare);
app.use(removeHeader);

// routes 설정
const Router = require('./routes');
app.use("/api", Router);

app.get('/', (req, res) => {
    res.redirect('/api/posts');
});


module.exports = app;