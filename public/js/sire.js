// function that switch the view regarding SAB info
function showSireMap(map) {
    // lluvias en tiempo real
    var lluviasTiempoReal = "<iframe class='divsire' src='https://app.sab.gov.co/sab/lluvias.htm'></iframe>"
        // Sitios propensos a deslizamiento por lluvias //REVISAR
    var deslizamientoPorLluvia = "<iframe class='divsire' src='https://app.sab.gov.co/sitiospropensos/faces/inicio.xhtml'></iframe>"
        // Lluvia diaria y acumulada en los ultimos dias //REVISAR
    var lluviaDiariaYAcumulada = "<iframe class='divsire' src='https://app.sab.gov.co/lluvias/'></iframe>"
        // niveles de cauces
    var nivelesCauces = "<iframe class='divsire' src='https://app.sab.gov.co/sab/niveles.htm'></iframe>"
        // Rios y quebradas propensos a crecientes torrenciales
    var riosQuebradas = "<iframe class='divsire' src='https://app.sab.gov.co/sab/riosquebradas.htm'></iframe>"
        // Ultimo sismo registrado por IDIGER
    var ultimoSismo = "<iframe class='divsire' src='https://app.sab.gov.co/sab/sismo.htm'></iframe>"
        // Areas propensas a incendios forestales
    var incendiosForestal = "<iframe class='divsire' src='https://app.sab.gov.co/sab/temperatura.htm'></iframe>"

    if (map === 'lluvias_tiempo_real') divsiremaps.innerHTML = lluviasTiempoReal
    if (map === 'deslizamiento_lluvia') divsiremaps.innerHTML = deslizamientoPorLluvia
    if (map === 'lluvia_diaria_acumulada') divsiremaps.innerHTML = lluviaDiariaYAcumulada
    if (map === 'niveles_cauces') divsiremaps.innerHTML = nivelesCauces
    if (map === 'rios_quebradas') divsiremaps.innerHTML = riosQuebradas
    if (map === 'ultimo_sismo') divsiremaps.innerHTML = ultimoSismo
    if (map === 'incendios') divsiremaps.innerHTML = incendiosForestal

}

