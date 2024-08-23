let base64 = require('base-64');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const publicIp = require('public-ip');
const { LocalStorage } = require('node-localstorage');
let localStorage = new LocalStorage('./scratch');

var clientID = "admin"; // app clientID
var clientSecret = "tecnoprocesoscie"; // app clientSecret
var APIKEY = "X-API-KEY";
var KEYPW = "C13Back3nd";

const AutorizationBasic = base64.encode(clientID + ":" + clientSecret);

async function getEventType(req, res) {
    var token = localStorage.getItem('token');
    const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/type_events/' + token;

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
                //console.log(data)
                res.render('events/index', { typeEventData: data.typeEventData });
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send();
}

module.exports = getEventType;