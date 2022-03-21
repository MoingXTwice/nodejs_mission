const express = require('express');
const bodyParser = require('body-parser')
const connect = require('./schemas');
const app = express();

connect();

const postRouter = require('./routes/posts');

const useMiddleWare = (req, res, next) => {
    console.log('Request URL : ', req.originalUrl, ' - ', new Date());
    next();
};

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(express.json());
app.use(useMiddleWare);

app.use('/api', [postRouter]);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => {
    console.log('열렸엉');
});