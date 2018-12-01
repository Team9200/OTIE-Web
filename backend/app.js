import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import database from './database';
import cookieParser from 'cookie-parser';
import path from 'path';

import 'dotenv/config';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

app.use('/', router);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './app/index.html'));
});

app.listen(process.env.PORT, function () {
    database();
    console.log("server on!");
});