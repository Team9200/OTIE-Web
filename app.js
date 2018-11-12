import express from 'express';
import bodyParser from 'body-parser';

import 'dotenv/config';

const app = express();

app.listen(process.env.PORT, function () {
    console.log("server on!");
});