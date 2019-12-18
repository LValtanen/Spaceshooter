var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var cors = require('cors')



var indexRouter = require('./api/routes/index');
var scoresRouter = require('./api/routes/scores');

    mongoose.connect('mongodb+srv://username:' + process.env.MONGO_ATLAS_PW + '@cluster0-xhf9c.mongodb.net/test?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/scores', scoresRouter);

module.exports = app;
