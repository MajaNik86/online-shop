const path  =require('path');
const express = require('express');
const csrf = require('csurf');

const expressSession = require('express-session');
const createSessionConfig = require('./config/session');

const db= require('./data/database')
const addCsrfTokenMiddleware =require('./middlewares/csrf.token');
const errorHandleMiddleware = require('./middlewares/error.handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');

const baseRoutes = require('./router/base.router');
const authRoutes = require('./router/auth.router');
const adminRoutes = require('./router/admin.router');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public')) ;
app.use(express.urlencoded({ extended: false })) ; 

const sessionConfig = createSessionConfig(); 

app.use(expressSession(sessionConfig))

app.use(csrf());
app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use('/admin',adminRoutes)

app.use(errorHandleMiddleware)

db.connectToDb().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log('Failed to connect to database');
    console.log(error);
})

