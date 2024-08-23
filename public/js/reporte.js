function limpiar() {
    console.log('limpiando');
    document.getElementById("inp_tel").value = "";
    document.getElementById("inp_geocode").value = "";
    document.getElementById("inp_places").value = "";
    document.getElementById("inp_localidad").value = "";
    document.getElementById("inp_barrio").value = "";
    document.getElementById("inp_edificio").value = "";
    document.getElementById("inp_postal").value = "";
    document.getElementById("inp_piso").value = "";
    document.getElementById("inp_apto").value = "";
    document.getElementById("descripcion-cont1").value = "";
    document.getElementById("comentarios-cont1").value = "";
    document.getElementById("descripcion-cont2").value = "";
    document.getElementById("comentarios-cont2").value = "";

    document.getElementById("head_reporte_tipo_evento").value = "";
    document.getElementById('head_reporte_tipo_evento').innerHTML = "Evento";
    document.getElementById("head_reporte_prioridad").value = "";
    document.getElementById('head_reporte_prioridad').innerHTML = "Prioridad";
    document.getElementById('filtro_reporta').innerHTML = "Reporta";
    document.getElementById("head_reporte_prioridad_inp").value = "";
    document.getElementById("evento_representativo").value = "";
    document.getElementById("reporta_inp").value = "";
    document.getElementById("pais_inp").value = "";
    document.getElementById("departamento_inp").value = "";
    document.getElementById("region_inp").value = "";
    document.getElementById("ciudad_inp").value = "";
    document.getElementById("latitud_inp").value = "";
    document.getElementById("longitud_inp").value = "";
    document.getElementById("modo_geolocalizacion").value = "";
    document.getElementById("hora_inicial").value = "";
    document.getElementById("hora_final").value = "";

    document.getElementById('info_evt_tel').value = "";
    document.getElementById('info_evt_dir').value = "";
    document.getElementById('info_evt_loc').value = "";
    document.getElementById('info_evt_barrio').value = "";
    document.getElementById('info_evt_postal').value = "";
    document.getElementById('info_evt_prioridad').value = "";
    document.getElementById('info_evt_descripcion1').value = "";
    document.getElementById('info_evt_edificio').value = "";
    document.getElementById('info_evt_piso').value = "";
    document.getElementById('info_evt_apto').value = "";

    $("#info_evt_descripcion1").html("");
    document.getElementById('info_evt_comentario1').value = "";
    $("#info_evt_comentario1").html("");
    document.getElementById('info_evt_comentario2').value = "";
    $("#info_evt_comentario2").html("");
    document.getElementById('info_evt_id').value = "";
    document.getElementById('info_evt_tipo').value = "";

    document.getElementById('asociated_id').value = "0";
    document.getElementById("addBtn").style.border = "2px solid #ffffff";
    document.getElementById("addBtn").style.backgroundImage = "url('../img/Formulario/cruz_pasiva.png')";
    $("#asociate_events").html("<div class='asociate_events_info_head'>Incidentes Asociados a Evento Seleccionado</div>");
    $("#all_event_load").html("");
    

    $("#event_type_load").html("");
    document.getElementById('incomplete_report').value = "2";
    
    document.getElementById('inp_evt1').value = "";
    document.getElementById('evt1_desc').value = "";
    document.getElementById('inp_evt2').value = "";
    document.getElementById('evt2_desc').value = "";
    $("#filtro_prioridad").html("Prioridad");
    $("#preguntas_evt1").html("");
    $("#preguntas_evt2").html("");
    

    

/*     document.getElementById("cont_izq_reporte").scrollTop = 0;
    document.getElementById("cont_izq_reporte").scrollLeft = 0;
    $("#cont_izq_reporte").scrollTop(0);
    $("#cont_izq_reporte").scrollLeft(0); */
}

function limpiar_geo() {
    console.log('limpiando geo');

    document.getElementById("location-input").value = "";
    document.getElementById("place-input").value = "";

    document.getElementById("inp_geocode").value = "";
    document.getElementById("inp_places").value = "";
    document.getElementById("inp_localidad").value = "";
    document.getElementById("inp_barrio").value = "";
    document.getElementById("inp_postal").value = "";
    document.getElementById('inp_localidad').style.display = "block";
    document.getElementById('cont-btn-localidad').style.display = "none";

}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('head_reporte_num_hora').innerHTML = h + ":" + m + ":" + s;

    t = setTimeout(function() {
        startTime()
    }, 500);
}
startTime();


var priorityvalue="";
var prioritydesc = "";
const priorityElement = document.getElementById("priority_dropdown");
priorityElement.addEventListener("click", getPriority);

function getPriority(event) {
    const selectedpriorityvalue = event.target.getAttribute("priority");
    priorityvalue = event.target.getAttribute("value");
    prioritydesc = event.target.getAttribute("priority");
    document.getElementById('head_reporte_prioridad').innerHTML = selectedpriorityvalue;
    document.getElementById('head_reporte_prioridad_inp').value = priorityvalue;
    $("#filtro_prioridad").html(prioritydesc);


};

const reportaElement = document.getElementById("reporta_dropdown");
reportaElement.addEventListener("click", getReporta);

function getReporta(event) {
    var selectedreportavalue = event.target.getAttribute("value");
    var selectedreportadesc = event.target.getAttribute("value");


    document.getElementById('reporta_inp').value = selectedreportavalue;
    document.getElementById('filtro_reporta').innerHTML = selectedreportavalue;
    document.getElementById('head_reporte_reporta').innerHTML = selectedreportadesc;

};




function reportTime() {
    var hora_reporte = '';
    var today = new Date();
    var a = today.getFullYear();
    var mes = ("0" + (today.getMonth() + 1)).slice(-2);
    var d = ("0" + today.getDate()).slice(-2);
    var h = ("0" + today.getHours()).slice(-2);
    var m = ("0" + today.getMinutes()).slice(-2);
    var s = ("0" + today.getSeconds()).slice(-2);
    hora_reporte = String(d) + "-" + String(mes) + "-" + String(a) + " " + String(h) + ":" + String(m) + ":" + String(s)
    return hora_reporte
}

function reportTime_actual() {
    var hora_reporte = '';
    var today = new Date();
    var a = today.getFullYear();
    var mes = ("0" + (today.getMonth() + 1)).slice(-2);
    var d = ("0" + today.getDate()).slice(-2);
    var h = ("0" + today.getHours()).slice(-2);
    var m = ("0" + today.getMinutes()).slice(-2);
    var s = ("0" + today.getSeconds()).slice(-2);
    hora_reporte = String(d) + "-" + String(mes) + "-" + String(a) + " " + String(h) + ":" + String(m) + ":" + String(s)
    return hora_reporte
}

function reportTime_5hours_before() {
    var hora_reporte = '';
    var today_now = new Date();
    var today_before = new Date(today_now-18000000)
    var a = today_before.getFullYear();
    var mes = ("0" + (today_before.getMonth() + 1)).slice(-2);
    var d = ("0" + today_before.getDate()).slice(-2);
    var h = ("0" + today_before.getHours()).slice(-2);
    var m = ("0" + today_before.getMinutes()).slice(-2);
    var s = ("0" + today_before.getSeconds()).slice(-2);
    
    console.log(today_now)
    console.log(today_before);
    hora_reporte = String(d) + "-" + String(mes) + "-" + String(a) + " " + String(h) + ":" + String(m) + ":" + String(s)
    return hora_reporte
}


function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    //const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    //return str.split('').map( letra => acentos[letra] || letra).join('').toString();
}

function validaNumericos(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
    }
    return false;
}
var descripcion ="";
function habilitar() {
    tel = document.getElementById("inp_tel").value;
    latitud = document.getElementById("latitud_inp").value;
    longitud = document.getElementById("longitud_inp").value;
    descripcion = document.getElementById("descripcion-cont1").value;
    comentarios = document.getElementById("comentarios-cont1").value;
    tipo_evento = document.getElementById("inp_evt1").value;

    //
    val = 0;

    if (tel == "") {
        val++;
    }
    if (latitud == "") {
        val++;
    }
    if (longitud == "") {
        val++;
    }
    if (descripcion == "") {
        val++;
    }
    if (comentarios == "") {
        val++;
    }
    if (tipo_evento == "") {
        val++;
    } 
    if (val == 0) {
        document.getElementById("addBtn").disabled = false;
        document.getElementById("addBtn").style.border = "2px solid #009061";
        document.getElementById("addBtn").style.color = "#009061";
        document.getElementById("addBtn").style.backgroundImage = "url('../img/Formulario/cruz_activa.png')";
    } else {
        document.getElementById("addBtn").disabled = true;
    }
}
document.getElementById("inp_tel").addEventListener("keyup", habilitar);
document.getElementById("btn_guardar_info").addEventListener("click", habilitar);
document.getElementById("btn_guardar_info2").addEventListener("click", habilitar);
document.getElementById("descripcion-cont1").addEventListener("keyup", habilitar);
document.getElementById("comentarios-cont1").addEventListener("keyup", habilitar); 
document.getElementById("inp_evt1").addEventListener("keyup", habilitar);
document.getElementById("tipoevt1").addEventListener("click", habilitar);
//document.getElementById("tabla_evento").addEventListener("change", habilitar);


/*
const input_info = document.getElementById("inp_tel");
const boton_enviar = document.getElementById("addBtn");

input_info.addEventListener('keyup' , (e) => {
  const value = e.currentTarget.value;
  boton_enviar.disabled = false;
  if (value === ""){
    boton_enviar.disabled = true;
  } 
  //else {
    //boton_enviar.disabled = false;
  //}

});
*/