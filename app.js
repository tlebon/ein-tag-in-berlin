require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const flash = require('connect-flash')


mongoose.Promise = Promise;
mongoose
  .connect('mongodb://localhost/ein-tag-in-berlin', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(
    session({
        secret: 'deiner-tag-in-berlin-secret-app',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection, ttl: 99999999999 }),
    })
)

require('./utils/passport')

app.use(passport.initialize())
app.use(passport.session())


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(__dirname + '/views/partials');


// default value for title local
app.locals.title = 'Ein Tag in Berlin';



const index = require('./routes/index');
app.use('/', index);


const auth = require('./routes/auth');
app.use('/', auth);


const priv = require('./routes/priv');
app.use('/priv', priv);


module.exports = app;
