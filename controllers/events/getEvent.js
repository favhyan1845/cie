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


function getEventInfo(req, res) {
    var objID = JSON.parse(JSON.stringify(req.body)); //Parse ID from request body
    var id = objID["id"]; //obtain the id value
    var token = localStorage.getItem('token');
    const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/events/' + id + '/' + token;

    var xhr = new XMLHttpRequest();
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data); //parse the response
        //console.log(jsonResponse);
        if (jsonResponse.code == 200) {
            //console.log(id);
            res.render('events/eventInfo', {
                eventinfo: jsonResponse.eventData
            }); // render the view and send to the view the response array

        }

    };

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send();
}



module.exports = getEventInfo;