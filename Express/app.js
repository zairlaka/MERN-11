var createError = require('http-errors');
const listEndpoints = require('express-list-endpoints');
var express = require('express');
// var path = require('path'); //
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// var indexRouter = require('./routes/index'); //
// var usersRouter = require('./routes/users'); //

var app = express();


var authRouter = require("./routes/authRouter")
var userRouter = require("./routes/userRouter")
var requestRouter = require("./routes/requestRouter")

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// other than development we will remove local url and || !origin
const whitelist = ['https://www.production.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOptions = {
  origin: function (origin, callback) {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Sorry: Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
// app.use(cors(corsOptions));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public'))); //

// app.use('/', indexRouter); //
// app.use('/users', usersRouter); //
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/request', requestRouter);

// console.log(listEndpoints(app));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
