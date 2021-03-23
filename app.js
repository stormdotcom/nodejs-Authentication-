const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./config/connection');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/register');
const secret = require('./routes/secrets');
const logoutRoute = require('./routes/login');
const updateRoute = require('./routes/update');
const router = express.Router();
const favicon = require("serve-favicon");
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const CookieMaxAge = 1000 * 60 * 60;
const app = express();
const sessionStore = require('./config/session-config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'images/nodeicon.ico')));
db.authenticate().then(() =>
console.log('DB connected')).catch((err) => {
    console.log('Err connecting DB \n' + err);
});

const myStores = sessionStore


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/',  loginRoute);
app.use('/register',  signupRoute);
app.use('/secrets',  secret);
app.use('/logout', logoutRoute);
app.use('/updateProfile', updateRoute);

app.use(session({
  key: "user_id",
  secret: "wwwwwd",
  resave: false,
  saveUninitialized: true,
  store: myStores,
  cookie: {
      maxAge: CookieMaxAge
      // secure: false
  }
}));
myStores.sync();
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
