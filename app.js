require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const connect = require('./schemas');
const app = express();
const cors = require('cors')
app.use(cors());

connect();

const useMiddleWare = (req, res, next) => {
    console.log('Request URL : ', req.originalUrl, ' - ', new Date());
    next();
};

// ejs 세팅
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 미들웨어
app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(useMiddleWare);

// routes 설정
const Router = require('./routes');
app.use("/api", Router);

module.exports = app;