function url(variable){
    window.location.href = variable;
}

function checkTimes(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTimes() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    min = checkTimes(m);
    seg = checkTimes(s);
    document.getElementById('hora_hoy').innerHTML = h + ":" + min + ":" + seg;

    t = setTimeout(function() {
        startTimes()
    }, 600);
}
startTimes();

function cerrar_sesion(){
    console.log("hola cerrando")
    $('#myModal6').modal('show');
}

function cancelar_cerrar_sesion(){
    console.log("hola cerrando modal")
    $('#myModal6').modal('hide');
}