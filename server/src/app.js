const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const mainRouter = require('./routes/api.router.js');
const authRouter = require('./routes/auth.api.router.js');

const app = express();
const { PORT } = process.env;
const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));

app.use('/', mainRouter);
app.use('/auth', authRouter);

module.exports = app;
