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


function getAllEvents(req, res) {

    var token = localStorage.getItem('token');

    var objTime = JSON.parse(JSON.stringify(req.body)); //Parse ID from request body
    //console.log(objTime)
    var hora_previa = objTime["hora_previa"];
    var hora_actual = objTime["hora_actual"];
    var tipo_evt_principal = objTime["tipo_evt_principal"];

    var obj = {
        token: token,
        TIPO_EVENTO: tipo_evt_principal,
        FIRST_DATE: hora_previa,
        SECOND_DATE: hora_actual
    };

    //console.log(obj)
    var formData = formurlencoded(obj);
    //console.log(formData)
    formData = formData.replaceAll("+", " ")
    formData = formData.replaceAll("%3A", ":")
    console.log(formData)
        //console.log("hola")
    const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/events/all/';

    var xhr = new XMLHttpRequest();
    //console.log(xhr.responseText)
    xhr.onload = function() {

        var data = this.responseText;
        //console.log(data)
        var jsonResponse = JSON.parse(data);
        //console.log(jsonResponse);
        //console.log(jsonResponse.eventData.lenght)
        if (jsonResponse.code == 200) {
            console.log("respuesta todos los evento")
                //console.log(jsonResponse)
                //console.log(res);

            res.render('events/all', { eventData: jsonResponse.eventData });

        }
    };
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded ; charset=UTF-8');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send(formData);
}

module.exports = getAllEvents;