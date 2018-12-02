import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import database from './database';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

import 'dotenv/config';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));
app.use(cookieParser());

app.use('/', router);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './code/index.html'));
});

app.listen(process.env.PORT, function () {
    database();
    console.log("server on!");
});