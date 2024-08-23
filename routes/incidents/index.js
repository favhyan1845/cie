const express = require('express');
const router = express.Router();
const GetIncident = require('../../controllers/incidents/getIdIncident');


router.get('/', (req, res) => {
    data = "";
    res.render('incidents/index', { message_peticion: data });
});

router.post('/getAsociatedIncident', GetIncident);

module.exports = router;