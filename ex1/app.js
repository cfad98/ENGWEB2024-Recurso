const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const booksRouter = require('./routes/books');

const app = express();

// Conectar ao MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/livros';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);

module.exports = app;
