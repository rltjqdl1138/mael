const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const fs = require("fs")
require('./import')
//const db = new (require('./database'))()

//const db2 = new (require('./database'))()
//const db3 = new (require('./database'))()

app.listen(3000, ()=>{
    console.log("Express server has started on port 3000")
})

app.use(bodyParser.json());

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));


app.get('/', (req, res)=>{
    res.send('Hello World')
});

require('./router/main')(app, fs);