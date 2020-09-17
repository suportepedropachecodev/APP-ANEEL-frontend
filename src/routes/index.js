const router = require('express').Router();
const mongoose = require('mongoose');

const dadosaneel = new mongoose.Schema({
    distibuidora: String,
    codigo:String,
    titular:String,
    classe:String,
    subgrupo:String,
    modalidade:String,
    credito:String,
    municipio:String,
    uf:String,
    cep:String,
    data:String,
    tipo:String,
    fonte:String,
    potencia:String
});

router.get('/',(req, res)=>{
    //res.render('todasunidades/todasunidades')
    res.redirect('dados/1')
});

router.get('/dados/:page',(req,res, next)=>{
    const dtaneel = mongoose.model('dadosaneel',dadosaneel);
    let perpage = 100;
    let page = req.params.page || 1;

    dtaneel
    .find({})
    .skip((perpage * page)-perpage)
    .limit(perpage)
    .exec((err, unidades)=>{
        dtaneel.countDocuments((err, count)=>{
            if(err) return next(err);
            res.render('todasunidades/todasunidades',{
                products:unidades,
                current:page,
                pages:Math.ceil(count/perpage),
                totalregistros:count
            })
        })
    })
})

module.exports = router;