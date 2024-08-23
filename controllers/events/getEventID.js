const { LocalStorage } = require('node-localstorage');
let localStorage = new LocalStorage('./scratch');


function eventID(req, res) {

    var id = localStorage.getItem('id_evento');
    //setTimeout(function() {
    res.render('events/eventID', {
        eventID : id
    }); // render the view and send to the view the response array
      //  }, 3000);
}

module.exports = eventID;