const router = require('express').Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));

const dadosaneel = new mongoose.Schema({
    distibuidora: String,
    codigo: String,
    titular: String,
    classe: String,
    subgrupo: String,
    modalidade: String,
    credito: String,
    municipio: String,
    uf: String,
    cep: String,
    data: String,
    tipo: String,
    fonte: String,
    potencia: String
});

router.get('/', (req, res) => {
    //res.render('todasunidades/todasunidades')
    res.redirect('dados/1')
});

router.get('/dados/:page', (req, res, next) => {
    const dtaneel = mongoose.model('dadosaneel', dadosaneel);
    let perpage = 100;
    let page = req.params.page || 1;

    dtaneel
        .find({})
        .skip((perpage * page) - perpage)
        .limit(perpage)
        .exec((err, unidades) => {
            dtaneel.countDocuments((err, count) => {
                if (err) return next(err);
                res.render('todasunidades/todasunidades', {
                    products: unidades,
                    current: page,
                    pages: Math.ceil(count / perpage),
                    totalregistros: count
                })
            })
        })
});

router.get('/uf/:estado?/:page?', (req, res) => {
    const estado = req.params.estado;
    if (estado) {
        const dtaneel = mongoose.model('dadosaneel', dadosaneel);
        let perpage = 100;
        let page = req.params.page || 1;
        const estadomaiusculo = estado.toUpperCase();
        dtaneel
            .find({ "uf": estadomaiusculo })
            .skip((perpage * page) - perpage)
            .limit(perpage)
            .exec((err, estados) => {
                dtaneel.countDocuments({"uf":estadomaiusculo}, (err, count)=>{
                    if(err) return next(err);
                    res.render('estado/estado',{
                        estados,
                        current:page,
                        pages: Math.ceil(count / perpage),
                        uf: estadomaiusculo,
                        totalregistros:count
                    })
                })
            })
        }else{
            res.redirect('/dados/1');
        }
});

router.get('/municipio?/:cidade?/:page?', (req, res) => {
    const cidade = req.params.cidade;
    if (cidade) {
        const dtaneel = mongoose.model('dadosaneel', dadosaneel);
        let perpage = 100;
        let page = req.params.page || 1;
        
        dtaneel
            .find({ "municipio": {$regex:cidade, $options: "i"} })
            .skip((perpage * page) - perpage)
            .limit(perpage)
            .exec((err, city) => {
                dtaneel.countDocuments({"municipio":{$regex:cidade, $options: "i"}}, (err, count)=>{
                    if(err) return next(err);
                    res.render('municipio/municipio',{
                        cidades:city,
                        current:page,
                        pages: Math.ceil(count / perpage),
                        cidade: cidade,
                        totalmunicipios:count
                    })
                })
            })
        }else{
            res.redirect('/dados/1');
        }
});

router.post('/estado/', (req, res)=>{
    const estado = req.body.uf
    res.redirect(`/uf/${estado}`);
});

router.post('/city/', (req, res)=>{
    const cidade = req.body.municipio
    res.redirect(`/municipio/${cidade}`);
})

module.exports = router;