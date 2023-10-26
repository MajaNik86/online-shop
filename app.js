const path  =require('path');
const express = require('express');

const db= require('./data/database')
const baseRoutes = require('./router/base.router');


const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static('public')) 

app.use(baseRoutes);

db.connectToDb().then(function(){
    app.listen(3000)
}).catch(function(error){
    console.log('Failed to connect to database');
    console.log(error);
})

