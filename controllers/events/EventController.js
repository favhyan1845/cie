var formurlencoded = require('form-urlencoded');
let base64 = require('base-64');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var clientID = "admin"; // app clientID
var clientSecret = "tecnoprocesoscie"; // app clientSecret
var APIKEY = "X-API-KEY";
var KEYPW = "C13Back3nd";

const { LocalStorage } = require('node-localstorage');
let localStorage = new LocalStorage('./scratch');

const AutorizationBasic = base64.encode(clientID + ":" + clientSecret);

var id_evento_principal_bd = ""
    /* INSERT Events */
function insert(req, res) {
    //console.log(req.body)
    var modo_geolocalizacion = req.body.modo_geolocalizacion;
    if (modo_geolocalizacion == "") { modo_geolocalizacion = null };
    var latitud = req.body.latitud_inp;
    if (latitud == "") { latitud = null };
    var longitud = req.body.longitud_inp;
    if (longitud == "") { longitud = null };
    const fecha_inicio = req.body.hora_inicial;
    const fecha_fin = req.body.hora_final;

    var pais_inp = req.body.pais_inp;
    if (pais_inp == "") { pais_inp = null };
    var departamento_inp = req.body.departamento_inp;
    if (departamento_inp == "") { departamento_inp = null };
    var region_inp = req.body.region_inp;
    if (region_inp == "") { region_inp = null };
    var ciudad_inp = req.body.ciudad_inp;
    if (ciudad_inp == "") { ciudad_inp = null };
    const asociated_id = req.body.asociated_id;
    const incomplete_report = req.body.incomplete_report;

    var inp_geocode = req.body.inp_geocode;
    if (inp_geocode == "") { inp_geocode = null };
    var inp_places = req.body.inp_places;
    if (inp_places == "") { inp_places = null };
    var inp_localidad = req.body.inp_localidad;
    if (inp_localidad == "") { inp_localidad = null };
    var inp_barrio = req.body.inp_barrio;
    if (inp_barrio == "") { inp_barrio = null };
    var inp_edificio = req.body.inp_edificio;
    if (inp_edificio == "") { inp_edificio = null };
    var inp_postal = req.body.inp_postal;
    if (inp_postal == "") { inp_postal = null };
    var inp_piso = req.body.inp_piso;
    if (inp_piso == "") { inp_piso = null };
    var inp_apto = req.body.inp_apto;
    if (inp_apto == "") { inp_apto = null };

    var id_evento1 = req.body.inp_evt1; //nuevo
    if (id_evento1 == "") { id_evento1 = null };
    var descripcion_evento1 = req.body.descripcion[0]; //nuevo
    if (descripcion_evento1 == "") { descripcion_evento1 = null };
    var comentarios_evento1 = req.body.comentarios[0]; //nuevo
    if (comentarios_evento1 == "") { comentarios_evento1 = null };
    var id_evento2 = req.body.inp_evt2; //nuevo
    if (id_evento2 == "") { id_evento2 = null };
    var descripcion_evento2 = req.body.descripcion[1]; //nuevo
    if (descripcion_evento2 == "") { descripcion_evento2 = null };
    var comentarios_evento2 = req.body.comentarios[1]; //nuevo
    if (comentarios_evento2 == "") { comentarios_evento2 = null };

    var prioridad = req.body.head_reporte_prioridad_inp;
    if (prioridad == "") { prioridad = null };
    var reporta = req.body.reporta_inp;
    if (reporta == "") { reporta = null };


    //const check = JSON.parse(JSON.stringify(req.body));




    var token = localStorage.getItem('token');
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


    if ((asociated_id == 0 && incomplete_report == 2) || (asociated_id == 0 && incomplete_report == 5) || (asociated_id == 0 && incomplete_report == 10)) {

        var obj = {
            token: token,
            ESTADO_EVENTO: 1, //se envía siempre 1 dado que corresponde al estado activo del evento (por default)
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_GEOESPACIAL: 1, //falta definir el flujo de generación del ID
            LATITUD: latitud,
            LONGITUD: longitud,
            DIRECCION: inp_geocode,
            ID_PRIORIDAD: prioridad,
            PAIS: pais_inp,
            REGION: region_inp,
            DEPARTAMENTO: departamento_inp,
            CIUDAD: ciudad_inp,
            LOCALIDAD: inp_localidad,
            BARRIO: inp_barrio,
            EDIFICIO_CASA: inp_edificio,
            PISO: inp_piso,
            APTO: inp_apto,
            CODIGO_POSTAL: inp_postal,
            NOMBRE_UBICACION: inp_places,
            MODO_GEOLOCALIZACION: modo_geolocalizacion,
            REPORTA: reporta,

            ID_EVENTO1: id_evento1, //nuevo
            DESCRIPCION_EVENTO1: descripcion_evento1, //nuevo
            COMENTARIOS_EVENTO1: comentarios_evento1, //nuevo
            ID_EVENTO2: id_evento2, //nuevo
            DESCRIPCION_EVENTO2: descripcion_evento2, //nuevo
            COMENTARIOS_EVENTO2: comentarios_evento2, //nuevo
            PRINCIPAL: asociated_id,
            ID_USUARIO: operador_id,
            DESCRIPCION: descripcion_evento1
        };

        //console.log("entra barrio")
        console.log(obj)
        var formData = formurlencoded(obj);
        //console.log(formData)
        const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/events/insert';

        var xhr = new XMLHttpRequest();
        console.log(xhr.responseText)
        xhr.onload = function() {

            var data = this.responseText;
            console.log(data)
            var jsonResponse = JSON.parse(data);
            console.log(jsonResponse);
            if (jsonResponse.code == 200) {
                console.log("respuesta evento")
                console.log(jsonResponse)
                    //console.log(res);

                id_evento_principal_bd = jsonResponse.idData
                    //console.log(id_evento_principal_bd)
                localStorage.setItem('id_evento', id_evento_principal_bd);


                //var a = insertIncident(jsonResponse.idData, req.body);
                var a = insertIncident(id_evento_principal_bd, incomplete_report, req.body);

                /* res.render('cie', {
                    eventID : id_evento_principal_bd
                }); */

                /*              res.render('cie', {
                              /* res.render('users/home', { 
                                  message: "Evento guardado",
                                  allIncident: '',
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

                                  eventID : id_evento_principal_bd
                              });*/

            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader(APIKEY, KEYPW);
        xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
        xhr.send(formData);

    } else {
        localStorage.setItem('id_evento', asociated_id);
        var a = insertIncident(asociated_id, incomplete_report, req.body);
    }
}

function insertIncident(id, incomplete, data) {

    var token = localStorage.getItem('token');
    //console.log(data);
    var id_evento = id;
    var inp_tel = data.inp_tel;
    var id_evento1 = data.inp_evt1;
    if (id_evento1 == "") { id_evento1 = null };
    var descripcion1 = data.descripcion[0];
    if (descripcion1 == "") { descripcion1 = null };
    var comentarios1 = data.comentarios[0];
    if (comentarios1 == "") { comentarios1 = null };
    var id_evento2 = data.inp_evt2;
    if (id_evento2 == "") { id_evento2 = null };
    var descripcion2 = data.descripcion[1];
    if (descripcion2 == "") { descripcion2 = null };
    var comentarios2 = data.comentarios[1];
    if (comentarios2 == "") { comentarios2 = null };
    var fecha_inicio = data.hora_inicial;
    var fecha_fin = data.hora_final;
    var reporta = data.reporta_inp;
    if (reporta == "") { reporta = null };
    var incomplete_report = incomplete;
    const asociated_id = data.asociated_id;


    if (incomplete_report == 1) { //valor de 1 corresponde a incidente no info
        console.log("entra a Llamada sin información")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 1,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada sin información", //validacion sobre una linea js
            COMENTARIOS1: "Llamada sin información",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 3) { //valor de 3 corresponde a incidente falso broma
        console.log("entra a broma")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 3,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada de Broma", //validacion sobre una linea js
            COMENTARIOS1: "Llamada de Broma",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 4) { //valor de 4 corresponde a incidente no procede
        console.log("entra a Llamada No Procede")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 4,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada No Procede", //validacion sobre una linea js
            COMENTARIOS1: "Llamada No Procede",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 6) { //valor de 6 corresponde a incidente acosador
        console.log("entra a Llamada acosador")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 6,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada Acosador", //validacion sobre una linea js
            COMENTARIOS1: "Llamada Acosador",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 7) { //valor de 7 corresponde a incidente solicitando informacion
        console.log("entra a Llamada solicitando informacion")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 7,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada Solicitando Información", //validacion sobre una linea js
            COMENTARIOS1: "Llamada Solicitando Información",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 8) { //valor de 8 corresponde a incidente fuera de la región
        console.log("entra a Fuera de la región de atención")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 8,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada Fuera de la región de atención", //validacion sobre una linea js
            COMENTARIOS1: "Llamada Fuera de la región de atención",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 9) { //valor de 9 corresponde a incidente P.Q.R.
        console.log("entra a P.Q.R.")
        var obj = {
            token: token,
            ID_EVENTO: 0,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 9,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: 0,
            DESCRIPCION1: "Llamada P.Q.R.", //validacion sobre una linea js
            COMENTARIOS1: "Llamada P.Q.R.",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: null
        };
    } else if (incomplete_report == 5) { //valor de 5 corresponde a incidente-evento Alarma
        console.log("entra a alarma")
        var obj = {
            token: token,
            ID_EVENTO: id_evento,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 5,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: id_evento1,
            DESCRIPCION1: "Llamada de Alarma", //validacion sobre una linea js
            COMENTARIOS1: "Llamada de Alarma",
            ID_EVENTO2: null, //nuevo
            DESCRIPCION2: null, //validacion sobre una linea js
            COMENTARIOS2: null,
            REPORTA: reporta,
            PRINCIPAL: asociated_id
        };
    } else if (incomplete_report == 10) { //valor de 10 corresponde a incidente-evento prueba
        console.log("entra a alarma")
        var obj = {
            token: token,
            ID_EVENTO: id_evento,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 10,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: id_evento1, //nuevo
            DESCRIPCION1: descripcion1, //validacion sobre una linea js
            COMENTARIOS1: comentarios1,
            ID_EVENTO2: id_evento2, //nuevo
            DESCRIPCION2: descripcion2, //validacion sobre una linea js
            COMENTARIOS2: comentarios2,
            REPORTA: reporta,
            PRINCIPAL: asociated_id
        };
    } else if (incomplete_report == 2) {
        var obj = {
            token: token,
            ID_EVENTO: id_evento,
            TELEFONO: inp_tel,
            ID_VERACIDAD: 2,
            FECHA_INICIO: fecha_inicio,
            FECHA_FIN: fecha_fin,
            ID_EVENTO1: id_evento1, //nuevo
            DESCRIPCION1: descripcion1, //validacion sobre una linea js
            COMENTARIOS1: comentarios1,
            ID_EVENTO2: id_evento2, //nuevo
            DESCRIPCION2: descripcion2, //validacion sobre una linea js
            COMENTARIOS2: comentarios2,
            REPORTA: reporta,
            PRINCIPAL: asociated_id
        };
    }
    console.log(obj);

    var formData = formurlencoded(obj);

    const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/incidents/insert';


    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var data = xhr.responseText;
        console.log(data)
    };
    xhr.open("POST", url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send(formData);
}


module.exports = insert;