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


function getEventTypebyId1(req, res) {
    var objID = JSON.parse(JSON.stringify(req.body)); //Parse ID from request body
    var id = objID["id"]; //obtain the id value
    var token = localStorage.getItem('token');
    const url = 'https://186.29.71.205/ciegis/backend/index.php/api/dsktp/type_events/get_by_code/' + id + '/' + token;

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        var data = this.responseText;
        var jsonResponse = JSON.parse(data); //parse the response
        //console.log(jsonResponse.typeEventData);

        if ((jsonResponse.typeEventData !== undefined) && (jsonResponse.typeEventData.length != 0)) {
            //console.log(id);
            //console.log(jsonResponse.typeEventData.length)
            // console.log(jsonResponse.typeEventData)

            if (jsonResponse.code == 200) {
                //console.log(id);
                res.render('events/eventTypeId1', {
                    eventTypeinfo: jsonResponse.typeEventData
                }); // render the view and send to the view the response array

            }
        } else {
            console.log('no existe el tipo evento');
            res.render('events/eventTypeId1null', {}); // render the view and send to the view the response array
        }
    };

    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader(APIKEY, KEYPW);
    xhr.setRequestHeader("Authorization", "Basic " + AutorizationBasic);
    xhr.send();
}



module.exports = getEventTypebyId1;