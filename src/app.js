const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

const indeRoutes = require('./routes/index');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(indeRoutes);

app.listen(app.get('port'),()=>{
    console.log('O servidor esta rodando na porta', app.get('port'));

});