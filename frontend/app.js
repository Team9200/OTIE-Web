import express from 'express';
import exphbs from 'express-handlebars';
import request from 'request';
import path from 'path';
import 'dotenv/config';

const app = express();
const API_URL = "http://openti.info:5000";

app.use(express.static(path.join(__dirname, '/public')));

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        equal: function (a, b, options) {
            if (a === b) {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        date: function (timestamp, options) {
            var date = new Date(timestamp);
            return date.toLocaleString();
        },
        isAdmin: function (user, options) {
            if (!user) {
                return options.inverse(this);
            } else if (user.role === 'admin') {
                return options.fn(this);
            }
            return options.inverse(this);
        },
        json: function (context) {
            return JSON.parse(JSON.stringify(context));
        },
        stringify: function (context) {
            return JSON.stringify(context);
        },
        parse: function (context) {
            return JSON.parse(context);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/search', function (req, res) {
    res.render('search');
});

app.get('/board', function (req, res) {
    request.get({
        url: API_URL + '/api/malware/get'
    }, function (err, response, body) {
        body = JSON.parse(body);
        res.render('board/board', {
            result: body.message
        });
    });
});

app.get('/board/:id', function (req, res) {
    request.get({
        url: API_URL + '/api/malware/get',
        qs: {
            page: req.params.id
        }
    }, function (err, response, body) {
        body = JSON.parse(body);
        res.render('board/board', {
            result: body.message
        });
    });
});

app.get('/login', function (req, res) {
    res.render('user/login');
});

app.get('/register', function (req, res) {
    res.render('user/register');
});

app.get('/block/', function (req, res) {
    res.render('block');
});

app.get('/status', function (req, res) {
    res.render('status', {
        data: {

        },
        length: 3
    });
});

app.get('/profile/:username', function (req, res) {
    request.get({
        url: API_URL + '/api/malware/search',
        qs: {
            type: 'ana',
            query: req.params.username
        }
    }, function (err, response, body) {
        // body = JSON.stringify(body);
        res.render('user/profile', {
            result: body
        });
    });
});

app.get('/malware/:azid', function (req, res) {
    request.get({
        url: API_URL + '/api/malware/search',
        qs: {
            type: 'azid',
            query: req.params.azid
        }
    });
});

app.listen(process.env.PORT, function () {
    console.log('frontend server on!');
});