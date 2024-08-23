const express = require('express');
const router = express.Router();
const AuthCtrl = require('../../controllers/AuthController');
const { LocalStorage } = require('node-localstorage');
let localStorage = new LocalStorage('./scratch');

router.get('/', (req, res) => {
    data = "";
    res.render('users/login', { message_peticion: data });
});

var operador_id = localStorage.getItem('operador_id');
var operador_nombre = localStorage.getItem('operador_nombre');
var operador_apellido = localStorage.getItem('operador_apellido');
var centro_atencion_nombre = localStorage.getItem('centro_atencion_nombre');
var centro_atencion_id = localStorage.getItem('centro_atencion_id');
var centro_atencion_direccion = localStorage.getItem('centro_atencion_direccion');
var ciudad = localStorage.getItem('ciudad');
var fecha_inicio_sesion = localStorage.getItem('fecha_inicio_sesion');
var operador_ip = localStorage.getItem('operador_ip');
var fecha_formateada = localStorage.getItem('fecha_formateada');

router.post('/cie', AuthCtrl);

router.get('/cie', (req, res) => {
    res.render('cie', {
        operador_id: operador_id, //id operador
        operador_nombre: operador_nombre, //nombre operador
        operador_apellido: operador_apellido, //apellido dinámico
        ciudad: ciudad, //ciudad centro de atención
        centro_atencion_id: centro_atencion_id, //identificador centro de atención
        centro_atencion_nombre: centro_atencion_nombre,  //nombre centro de atención
        centro_atencion_direccion: centro_atencion_direccion, //dirección centro de atención
        fecha_inicio_sesion: fecha_inicio_sesion, //hora inicio de sesión del operador
        operador_ip: operador_ip,
        fecha_formateada: fecha_formateada,

        codigoEvento: null, //id evento
        tipoEvento: null, //tipo de evento
        prioridad: null, //prioridad
        direccionEvento: null, //direccion del evento
        telefono: null, //telefono del evento
        barrioEvento: null, //barrio del evento
        localidadEvento: null, //localidad del evento
        descripcionEvento: null, //descripcion del evento
    });
});

module.exports = router;