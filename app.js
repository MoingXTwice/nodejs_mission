const express = require('express');
const bodyParser = require('body-parser')
const connect = require('./schemas');
const app = express();
const port = 3000;
require('dotenv').config();

connect();

const postRouter = require('./routes/posts');

const useMiddleWare = (req, res, next) => {
    console.log('Request URL : ', req.originalUrl, ' - ', new Date());
    next();
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(useMiddleWare);

app.use('/api', [postRouter]);

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(port, () => {
    console.log(port, '번으로 서버가 연결되었습니다.');
});