
var url_allEvents = "/events/getAllEvents";
var url_eventType = "/events/getEventType"
var url_eventTypeId1 = "/events/getEventTypebyId1"
var url_eventTypeId2 = "/events/getEventTypebyId2"



function getData(){  
    openReport();
    
      
}

function activarSIRE(){
    document.getElementById("btn_SIRE").style.border = "2px solid rgba(113, 222, 110, 1)";
    document.getElementById("btn_SIRE").style.backgroundImage = "url('../img/Panel_operador/sire_activo.png')";
    document.getElementById("btn_CIE").style.border = "2px solid rgba(113, 222, 110, 0.3)";
    document.getElementById("btn_CIE").style.backgroundImage = "url('../img/Panel_operador/Monitoreo.png')";
}


function openReport(){
    $('#myModal3').modal('show');
    limpiar();
    $('#myModal3').show().scrollTop(0);
    $("#cont_izq_reporte").scrollTop(0);
    document.getElementById('inp_geocode').readOnly = true;
    document.getElementById('inp_places').readOnly = true;

    document.getElementById('info_evt_tel').readOnly = true;
    document.getElementById('info_evt_dir').readOnly = true;
    document.getElementById('info_evt_loc').readOnly = true;
    document.getElementById('info_evt_barrio').readOnly = true;
    document.getElementById('info_evt_postal').readOnly = true;
    document.getElementById('info_evt_prioridad').readOnly = true;
    document.getElementById('info_evt_edificio').readOnly = true;
    document.getElementById('info_evt_piso').readOnly = true;
    document.getElementById('info_evt_apto').readOnly = true;

    document.getElementById('info_evt_id').readOnly = true;
    document.getElementById('info_evt_tipo').readOnly = true;


    
    //document.getElementById('info_evt_descripcion1').readOnly = true;
    //document.getElementById('info_evt_comentario1').readOnly = true;

    document.getElementById('preguntas_evt1').readOnly = true;
    document.getElementById('evt1_desc').readOnly = true;
    document.getElementById('preguntas_evt2').readOnly = true;
    document.getElementById('evt2_desc').readOnly = true;
    document.getElementById('inp_evt2').readOnly = true;

    document.getElementById('descripcion-cont2').readOnly = true;
    document.getElementById('comentarios-cont2').readOnly = true;
    document.getElementById('preguntas_evt1').style.border = "1px solid #009061";
    document.getElementById('preguntas_evt1').style.backgroundColor = "transparent";
    document.getElementById('preguntas_evt2').style.border = "1px solid #009061";
    document.getElementById('preguntas_evt2').style.backgroundColor = "transparent";   
   
    
    document.getElementById("addBtn").disabled = true;
    document.getElementById("tipoevt2").disabled = true;
    document.getElementById('tipoevt2').style.border = "1px solid #C1C1C1";


    hora_apertura_reporte = reportTime();
    document.getElementById('hora_inicial').value = hora_apertura_reporte;

    hora_previa_reporte = reportTime_5hours_before();
    document.getElementById('hora_previa').value = hora_previa_reporte;

    hora_actual_reporte = reportTime_actual();
    document.getElementById('hora_actual').value = hora_actual_reporte;

    document.getElementById('event_table').setAttribute("tipo_evento_consultado", "");

    console.log(hora_apertura_reporte)
    console.log(hora_previa_reporte)

    document.getElementById('asociable_events').style.background ="url('../img/loader.gif')"
    document.getElementById('asociable_events').style.backgroundSize ="100%";
    document.getElementById('asociable_events').style.backgroundRepeat ="no-repeat";
    document.getElementById('asociable_events').style.backgroundPositionY ="-7px";


    document.getElementById('asociate_events').style.background ="url('../img/loader.gif')"
    document.getElementById('asociate_events').style.backgroundSize ="85%";
    document.getElementById('asociate_events').style.backgroundRepeat ="no-repeat";
    document.getElementById('asociate_events').style.backgroundPositionY ="7px";
    document.getElementById('asociate_events').style.backgroundPositionX ="20px";

    //sstyle="background: url('../img/loader.gif'); background-position-y:-7px"

}

function closeReport(){
    console.log("cierra modal")
    $('#myModal3').modal('hide');
    $('#myModal4').modal('hide');
    hora_cierre_reporte = reportTime();
    document.getElementById('hora_final').value = hora_cierre_reporte;  
    

}

function openEventType1(){
    $('#myModal4').modal('show');
    document.getElementById('event_table').setAttribute("tipo_evento_consultado", "evento1");
    console.log(document.getElementById('event_table').getAttribute("tipo_evento_consultado"));
    $("#event_table").html("");
    document.getElementById('inp_evt1').value = "";
    document.getElementById('inp_evt1').value = "";
    document.getElementById('evt1_desc').value = "";
    $("#preguntas_evt1").html("");

    getEventType();
}


function openEventType2(){
    $('#myModal4').modal('show');
    document.getElementById('event_table').setAttribute("tipo_evento_consultado", "evento2");
    console.log(document.getElementById('event_table').getAttribute("tipo_evento_consultado"));
    $("#event_table").html("");
    document.getElementById('inp_evt2').value = "";
    document.getElementById('evt2_desc').value = "";
    $("#preguntas_evt2").html("");
    getEventType2();
}

function openCloseEvent(){
    $('#myModal5').modal('show'); 
}

function closeCloseEvent(id_veracidad){
    if (id_veracidad == '0'){
        $('#myModal5').modal('hide'); 
    }else{
    
    console.log(id_veracidad)
    console.log( typeof id_veracidad)
    veracidad = parseInt(id_veracidad);
    console.log(veracidad)
    console.log(typeof veracidad)

    document.getElementById('incomplete_report').value = veracidad;
    console.log(document.getElementById('incomplete_report').value)
    console.log(typeof document.getElementById('incomplete_report').value)
    closeReport();
    $('#myModal5').modal('hide'); 
    
    document.getElementById('event_form').submit();
    }
}

function openSeleccionarLocalidad(){
    $('#myModal7').modal('show'); 
}

function closeSeleccionarLocalidad(localidad){
    $('#myModal7').modal('hide'); 
    document.getElementById('cont-btn-localidad').style.display = "none";
    document.getElementById('inp_localidad').style.display = "block";
    document.getElementById('inp_localidad').value = localidad;    
}


/* function sendIncompleteReport(){
    document.getElementById('incomplete_report').value = "3";
    closeReport();
} */

var event_type_loader;
var all_event_loader;
var event_description_loader;
var incident_asociated_loader;
var cie_loader;
var monitoring_loader;

function loader_all_event() {
    all_event_loader = setTimeout(show_all_event, 3000);
}

function show_all_event() {
  document.getElementById("loader_event_all").style.display = "none";
  document.getElementById("asociable_events").style.background = "none";
  document.getElementById("all_event_load").style.display = "block";

}

function loader_event_type() {
    event_type_loader = setTimeout(show_event_type, 3000);
}

function show_event_type() {
    document.getElementById("loader_event_type").style.display = "none";
    document.getElementById("event_type_load").style.display = "block";  
  }

  function loader_event_description() {
    event_description_loader = setTimeout(show_event_description, 3000);
}

function show_event_description() {
    document.getElementById("loader_event_info").style.display = "none";
    document.getElementById("info_event_load").style.display = "block";  
  }

  function loader_asociated_incident() {
    incident_asociated_loader = setTimeout(show_asoc_incident, 3000);
}

function show_asoc_incident() {
    document.getElementById("loader_event_asoc").style.display = "none";
    document.getElementById("asociate_events").style.background = "none";
    document.getElementById("asoc_event_load").style.display = "block";  
  }
  
  function loader_cie() {
    cie_loader = setTimeout(show_cie, 3000);
}

function show_cie() {
    document.getElementById("loader_cie").style.display = "none";
    document.getElementById("cie_homepage").style.display = "block";  
  }

  function loader_monitoring() {
    monitoring_loader = setTimeout(show_monitoring, 3000);
}

function show_monitoring() {
    document.getElementById("loader_event_monitoring").style.display = "none";
    document.getElementById("monitoring_load").style.display = "block";  
  }
  
  
function getAllEvents() {
    
    var hora_previa = document.getElementById("hora_previa").value;
    console.log(hora_previa);
    
    var hora_actual = document.getElementById("hora_actual").value;
    console.log(hora_actual);

    var tipo_evt_principal = document.getElementById("inp_evt1").value;
    console.log(tipo_evt_principal);

        $.ajax({
            type: "POST",
            url: url_allEvents, // the URL of the controller action method
            contentType: "application/x-www-form-urlencoded",
            data: {hora_previa:hora_previa, hora_actual:hora_actual, tipo_evt_principal:tipo_evt_principal}, // optional data
            success: function(result) {
                loader_all_event();
                $("#asociable_events").html(result);
                // do something with result
            },
            error: function(req, status, error) {
                alert(error);
                // do something with error   
            }
        });
   
}

function getEventType() {
    
    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: url_eventType, // the URL of the controller action method
            contentType: "application/x-www-form-urlencoded",
            data: null, // optional data
            success: function(result) {
                loader_event_type();
                $("#event_table").html(result);
                // do something with result
            },
            error: function(req, status, error) {
                alert(error);
                // do something with error   
            }
        });
    }, 500);
}

function getEventType2() {
    
    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: url_eventType, // the URL of the controller action method
            contentType: "application/x-www-form-urlencoded",
            data: null, // optional data
            success: function(result) {
                loader_event_type();
                //console.log(result)
                $("#event_table").html(result);
                // do something with result
            },
            error: function(req, status, error) {
                alert(error);
                // do something with error   
            }
        });
    }, 500);
}


// Get the input field
//var input_evt_type1 = document.getElementById("inp_evt1");

// Execute a function when the user releases a key on the keyboard
/* input_evt_type1.addEventListener("keypress", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  console.log ("test repetido")
  if (event.defaultPrevented) {
    return; // Should do nothing if the default action has been cancelled
  }

  if (event.key == "Enter") {
    event.preventDefault();
    document.getElementById("tipoevt2").disabled = false;   
    document.getElementById("tipoevt2").style.border = "1px solid #71DE6E";
    document.getElementById("inp_evt2").readOnly = false;
    document.getElementById('descripcion-cont2').readOnly = false;
    document.getElementById('comentarios-cont2').readOnly = false;
    getEventTypebyId1_();
    console.log ("endpoint repetido")
    getAllEvents();  
  }
}); */


function event1_enter(event) {
    var x = event.key;
    if (x == "Enter") { 
        document.getElementById("tipoevt2").disabled = false;   
        document.getElementById("tipoevt2").style.border = "1px solid #009061";
        document.getElementById("inp_evt2").readOnly = false;
        document.getElementById('descripcion-cont2').readOnly = false;
        document.getElementById('comentarios-cont2').readOnly = false;
        getEventTypebyId1_();
        console.log ("endpoint repetido")
        getAllEvents();  
    }
  }



var FirstWord = "";
var priorityvalue="";
var tipo_evt1 ="";
var tipo_evento_format = "";

function getEventTypebyId1_() {
    
    var evt_type_val1 = document.getElementById("inp_evt1").value;
    console.log(evt_type_val1);

    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: url_eventTypeId1, // the URL of the controller action method
            contentType: "application/x-www-form-urlencoded",
            data: {id:evt_type_val1}, // optional data
            success: function(result) {
                //console.log(result);
                
                    $("#cont_request_info_evt1").html(result);
                    priorityvalue = document.getElementById('head_reporte_prioridad_inp').value;
                    var desc_prioridad ="";
                    desc_prioridad = document.getElementById('filtro_prioridad').textContent;
                    $("#head_reporte_prioridad").html(desc_prioridad);
                    
                    tipo_evt1 = document.getElementById('evt1_desc').value;
                    const lower = tipo_evt1.toLowerCase();
                    tipo_evento_format = tipo_evt1.charAt(0).toUpperCase() + lower.slice(1);
                    FirstWord = tipo_evento_format.split(" ", 1);
                    $("#head_reporte_tipo_evento").html(FirstWord);
                    
                    console.log(tipo_evento_format)
                    console.log(priorityvalue)
                
            },
            error: function(req, status, error) {
                console.log(error);

                
                // do something with error   
            }
        });
    }, 500);
}

/* // Get the input field
var input_evt_type2 = document.getElementById("inp_evt2");

// Execute a function when the user releases a key on the keyboard
input_evt_type2.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    getEventTypebyId2();
  }
}); */


function event2_enter(event) {
    var x = event.key;
    if (x == "Enter") { 
        getEventTypebyId2();
    }
  }


function getEventTypebyId2() {
    
    var evt_type_val2 = document.getElementById("inp_evt2").value;
    console.log(evt_type_val2);

    setTimeout(() => {
        $.ajax({
            type: "POST",
            url: url_eventTypeId2, // the URL of the controller action method
            contentType: "application/x-www-form-urlencoded",
            data: {id:evt_type_val2}, // optional data
            success: function(result) {
                //console.log(result);
                console.log("tipo_evt 2")
                $("#cont_request_info_evt2").html(result);
                // do something with result
            },
            error: function(req, status, error) {
                console.log(error);
                // do something with error   
            }
        });
    }, 500);
}


