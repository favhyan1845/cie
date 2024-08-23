var formurlencoded = require('form-urlencoded');
let base64 = require('base-64');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const publicIp = require('public-ip');
const Alert = require("electron-alert");

var clientID = "admin"; // app clientID
var clientSecret = "tecnoprocesoscie"; // app clientSecret
var APIKEY = "X-API-KEY";
var KEYPW = "C13Back3nd";
const AutorizationBasic = base64.encode(clientID + ":" + clientSecret);

// const AutorizationBasic = new Function(base64.encode(clientID + ":" + clientSecret));

var fecha_actual = "";

function secondSource(jsonResponse, ip) {

    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        global.localStorage = new LocalStorage('./scratch');
    }

    localStorage.setItem('token', jsonResponse.userData.token);
    localStorage.setItem('operador_id', jsonResponse.userData.id_usuario);
    localStorage.setItem('operador_nombre', jsonResponse.userData.nombre);
    localStorage.setItem('operador_apellido', jsonResponse.userData.apellido);
    localStorage.setItem('centro_atencion_nombre', jsonResponse.userData.centro_atencion);
    localStorage.setItem('centro_atencion_id', jsonResponse.userData.id_centro_atencion);
    localStorage.setItem('centro_atencion_direccion', jsonResponse.userData.direccion_centro_atencion);
    localStorage.setItem('ciudad', jsonResponse.userData.ciudad);
    localStorage.setItem('operador_ip', ip);

    const urlPUT = 'https://186.29.71.205/ciegis/backend/index.php/api/login/auth_log/'


    console.log(localStorage.getItem('token'));
    const obj = {
        token: localStorage.getItem('token'),
        ip_address: ip,
        date: fecha_actual,
    };



    var formData = formurlencoded(obj);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //console.log(xhr)
        if (xhr.readyState === 4) {
            //console.log(xhr.readyState)
            var data = xhr.responseText;
        }
    };
    xhr.open("POST", urlPUT, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send(formData);
}

function cie(req, res) {

    /* Obtener parametros */
    const username = req.body.username;
    const password = req.body.password;


    const urlCRUD5 = 'https://186.29.71.205/ciegis/backend/index.php/api/login/' + username + '/' + password;

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {

            var data = xhr.responseText;
            var jsonResponse = JSON.parse(data);
            //console.log(jsonResponse);
            if (jsonResponse.code == 410 || jsonResponse.code == 411 || jsonResponse.code == 412) {
                /* 410 - Variables no definidas */
                /* 411 - Parametros vacios */
                /* 412 - Usuario y/o contrasena no son validos */

                let alert = new Alert();
                var strMensaje = "";

                if (jsonResponse.code == 410) {
                    strMensaje = "Variables no definidas.";
                } else if (jsonResponse.code == 411) {
                    strMensaje = "Parametros vacios.";
                } else if (jsonResponse.code == 412) {
                    strMensaje = "<p style='font-family: Swiss721BT-Light-Heavy, Helvetica; font-size:14pt; font-style:italic'>Usuario y/o contraseña no son validos.</p>";
                }


                let swalOptions = {
                    title: "<p style='font-family: Swiss721BT-Light-Heavy, Helvetica; font-size:14pt; font-style:italic'>Acceso Denegado</p>",
                    text: strMensaje,
                    icon: "warning",
                    showCancelButton: false,
                    html: strMensaje
                };

                //Mensaje con marco 
                //let promise = alert.fireWithFrame(swalOptions, "Acceso Denegado", null, false);

                //Mensaje sin marco 
                alert.fireFrameless(swalOptions, null, true, false);

                //Para evaluar la respuesta del usuario
                /*promise.then((result) => {
                    if (result.value) {
                        // confirmed
                    } else if (result.dismiss === Alert.DismissReason.cancel) {
                        // canceled
                    }
                })*/

                res.render('users/login', { message_peticion: jsonResponse.mensaje });

            } else if (jsonResponse.code == false) {
                /* Error sin autorizacion */

                strMensaje = "Sin Autorización de ingreso.";

                let swalOptions = {
                    title: "Acceso Denegado",
                    text: strMensaje,
                    icon: "warning",
                    showCancelButton: false
                };

                //Mensaje sin marco 
                alert.fireFrameless(swalOptions, null, true, false);

                res.render('users/login', { message_peticion: jsonResponse.error });
            } else if (jsonResponse.code == 200) {

                /*  Usuario y/o contrasena son validos */

                strMensaje = "<p style='font-family: Swiss721BT-Light-Heavy, Helvetica; font-size:10pt; font-style:italic'>Logueado Satisfactoriamente...</p>";
                let swalOptions = {
                    position: "top-end",
                    title: strMensaje,
                    icon: "success",
                    //html: strMensaje,
                    timer: 2000
                };
                Alert.fireToast(swalOptions);

                get_publicIp()
                    .then(val => { secondSource(jsonResponse, val) })

                const { LocalStorage } = require('node-localstorage');
                let localStorage = new LocalStorage('./scratch');
                var operador_ip = localStorage.getItem('operador_ip');

                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                const dias_semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                const fecha = new Date();
                var fecha_texto = dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
                localStorage.setItem('fecha_formateada', fecha_texto);
                fecha_formateada = localStorage.getItem('fecha_formateada');

                const fecha_raw = new Date();
                const dia = ('0' + fecha_raw.getDate()).slice(-2);
                const mes = ('0' + (fecha_raw.getMonth() + 1)).slice(-2);
                const año = fecha_raw.getFullYear();
                const hora = ('0' + (fecha_raw.getHours())).slice(-2);
                const minutos = ('0' + (fecha_raw.getMinutes())).slice(-2);
                const segundos = ('0' + (fecha_raw.getSeconds())).slice(-2);

                fecha_actual = dia + '-' + mes + '-' + año + ' ' + hora + ':' + minutos + ':' + segundos;
                localStorage.setItem('fecha_inicio_sesion', fecha_actual);
                fecha_inic_sesion = localStorage.getItem('fecha_inicio_sesion');


                res.render('cie', {
                    /* res.render('users/home', { */
                    token: jsonResponse.userData.token, //token
                    message: jsonResponse.mensaje, //mensaje de respuesta
                    operador_id: jsonResponse.userData.id_usuario, //id operador
                    operador_nombre: jsonResponse.userData.nombre, //nombre operador
                    operador_apellido: jsonResponse.userData.apellido, //apellido dinámico
                    ciudad: jsonResponse.userData.ciudad, //ciudad centro de atención
                    centro_atencion_id: jsonResponse.userData.id_centro_atencion, //identificador centro de atención
                    centro_atencion_nombre: jsonResponse.userData.centro_atencion, //nombre centro de atención
                    centro_atencion_direccion: jsonResponse.userData.direccion_centro_atencion, //dirección centro de atención
                    fecha_inicio_sesion: fecha_inic_sesion, //hora inicio de sesión del operador
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

                    //arreglo con las entidades asignadas al evento
                    entidad: 'Bomberos', //nombre de la entidad asignada
                    estacion: 'Puente Aranda', //nombre de la estacion de la entidad asignada
                    direccionEntidad: 'Calle 20 #68a-22', //direccion de la estacion de la entidad asignada
                    estadoEntidad: 'Confirmado', //estado actual de respuesta al reporte

                    //eventID : null
                });
            }
        }
    };

    xhr.open("GET", urlCRUD5);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send();


    async function get_publicIp() {
        let ip_address = await publicIp.v4();
        return ip_address;
    }

}



module.exports = cie;