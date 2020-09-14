const router = require('express').Router();

router.get('/',(req, res)=>{
    res.render('todasunidades/todasunidades')
});

module.exports = router;