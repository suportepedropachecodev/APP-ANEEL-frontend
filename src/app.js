const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');

let usuario = process.env.NODE_USER
let senha = process.env.NODE_PASS

if(process.env.NODE_ENV !== 'producao'){
    require('dotenv').config();
    usuario = process.env.NODE_USER
    senha = process.env.NODE_PASS
}else{
    usuario = process.env.NODE_USER
    senha = process.env.NODE_PASS
};

const strconn = `mongodb+srv://${usuario}:${senha}@cluster0.azubg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const app = express();

mongoose.connect(strconn,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('Conectando com MongoDB'))
.catch(err => console.log(err));

const indeRoutes = require('./routes/index');
const { mongo } = require('mongoose');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(indeRoutes);

app.listen(app.get('port'),()=>{
    console.log('O servidor esta rodando na porta', app.get('port'));

});