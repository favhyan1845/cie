// Code goes here

var localidad_value = '';
var lat_marker = '';
var long_marker = '';
var lat_search = '';
var long_search = '';
var lat_final = '';
var long_final = '';
var modo_geolocalizacion = '';

var localidad_value="";
var cod_postal_value="";
var neighborhood_value="";
var pais="";
var departamento="";
var ciudad="";

$(document).ready(function() {
  var map = null;
  var myLatlng;


  function initializeGMap(lat, lng) {
    myLatlng = new google.maps.LatLng(lat, lng);

    
    var myOptions = {
      zoom: 12,
      zoomControl: true,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#263c3f" }],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [{ color: "#6b9a76" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [{ color: "#746855" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#1f2835" }],
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [{ color: "#f3d19c" }],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#2f3948" }],
        },
        {
          featureType: "transit.station",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ color: "#17263c" }],
        },
      ],
    };

    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);  
  
  /*
    
    //IMPLEMENTACIÓN KML  
    var src = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
    //var src = 'barriolegalizado.kml';

    // Adding kml
    var kmlLayer = new google.maps.KmlLayer(src, {
      suppressInfoWindows: true,
      preserveViewport: false,
      map: map
    });
*/
  }
  

  // Re-init map before show modal
  $('#myModal').on('show.bs.modal', function(event) {
    initializeGMap("4.67", '-74.095');
    $("#location-map").css("width", "100%");
    $("#map_canvas").css("width", "100%");
  });

  // Trigger map resize event after modal shown
  $('#myModal').on('shown.bs.modal', function() {
    google.maps.event.trigger(map, "resize");
    map.setCenter(myLatlng);
  });

  

// Get location form
var locationForm = document.getElementById('location-form');

// Listen for submiot
locationForm.addEventListener('submit', geocode);



function geocode(e){
  // Prevent actual submit
  e.preventDefault();
  
  var location = document.getElementById('location-input').value;
  location = removeAccents(location + ", Bogota");
  console.log(location);

  axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
    
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    components: {
          country: 'co'
      },
    params:{
      address:location,
      key:'AIzaSyCqKjwjNlu1k0-UvG0tWxXYT236WwIvLMI',
      region:'co'
    }
  })
  .then(function(response){
    // Log full response

    localidad_value="";
    cod_postal_value="";
    neighborhood_value="";
    pais="";
    departamento="";
    ciudad="";

   
    console.log(response.data.results[0]);
    console.log(typeof response.data.results[0].address_components)

    console.log(response.data.results[0].address_components)

    address_components = response.data.results[0].address_components;
    
    address_components.forEach(element => {
      console.log(element.types[0])
      //console.log(element.long_name)
      if(element.types[0] == 'political') {
        localidad_value = removeAccents(element.long_name)};
      if(element.types[0] == 'postal_code') {
        cod_postal_value = element.long_name};
      if(element.types[0] == 'neighborhood') {
        neighborhood_value = removeAccents(element.long_name)};
      if(element.types[0] == 'country') {
        pais = removeAccents(element.long_name)};
      if(element.types[0] == 'administrative_area_level_1') { 
        departamento = removeAccents(element.long_name)};
      if(element.types[0] == 'locality') {
        ciudad = removeAccents(element.long_name)};

    });

    if(ciudad == ""){
      ciudad = 'Bogota'
    }
    if(departamento == ""){
      departamento = 'Bogota'
    }
    if(pais == ""){
      pais = 'Colombia'
    }
   

    console.log(localidad_value);
    console.log(cod_postal_value);
    console.log(neighborhood_value);
    console.log(pais);
    console.log(departamento);
    console.log(ciudad);



    //localidad_value = removeAccents(response.data.results[0].address_components[3].long_name);
    //cod_postal_value = response.data.results[0].address_components[7].long_name;
    location_value = removeAccents(response.data.results[0].formatted_address);
    //neighborhood_value = removeAccents(response.data.results[0].address_components[2].long_name);
    
    //pais = removeAccents(response.data.results[0].address_components[6].long_name);
    //departamento = removeAccents(response.data.results[0].address_components[5].long_name);
    //ciudad = removeAccents(response.data.results[0].address_components[4].long_name);

    console.log(ciudad);

    if (response.data.status == "ZERO_RESULTS") {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No hay ubicaciones disponibles para el lugar '" + location + "'");
      return;
    }


    // Geometry
    lat_search = response.data.results[0].geometry.location.lat;
    long_search = response.data.results[0].geometry.location.lng;
    const lugar = {lat:lat_search,lng:long_search}
  
          // Initialize and add the map
  //function initMap() {
  // The location of Uluru

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map_canvas"), {
    zoom: 15,
    center: lugar,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });
  // The marker, positioned 
  var myMarker = new google.maps.Marker({
    position: lugar,
    map: map,
    draggable:true
  });
  google.maps.event.addListener(myMarker, 'dragend', function(evt){
    console.log(evt)
    lat_marker = evt.latLng.lat().toFixed(10);
    long_marker = evt.latLng.lng().toFixed(10);

  });
  
  
  })
  .catch(function(error){
    console.log(error);
  });

}
})

function getGoogleResponse(){
  modo_geolocalizacion = 0

  if (localidad_value == "Usaquen" || localidad_value == "Localidad de Chapinero" || localidad_value == "Santa Fe" || localidad_value == "San Cristobal" || localidad_value == "Usme"
  || localidad_value == "Tunjuelito" || localidad_value == "Bosa" || localidad_value == "Kennedy" || localidad_value == "Fontibon" || localidad_value == "Engativa"
  || localidad_value == "Suba" || localidad_value == "Barrios Unidos" || localidad_value == "Teusaquillo" || localidad_value == "Los Martires" || localidad_value == "Antonio Narino"
  || localidad_value == "Puente Aranda" || localidad_value == "La Candelaria" || localidad_value == "Rafael Uribe Uribe" || localidad_value == "Comuna Ciudad Bolivar" || localidad_value == "Sumapaz"){
  document.getElementById('inp_localidad').value = localidad_value
  }else {
    document.getElementById('inp_localidad').style.display = "none";
    document.getElementById('cont-btn-localidad').style.display = "block";
  }


  document.getElementById('inp_postal').value = cod_postal_value
  console.log(location_value)
  console.log("modo-geoloc" + modo_geolocalizacion) 
  document.getElementById('modo_geolocalizacion').value = modo_geolocalizacion;
  document.getElementById('inp_places').value = location_value
  document.getElementById('inp_geocode').value = location_value
  document.getElementById('inp_barrio').value = neighborhood_value

  if( lat_marker != '' && long_marker != ''){
    lat_final = lat_marker;
    long_final = long_marker;
    lat_marker = '' ;
    long_marker = '';
  }else{
    lat_final = lat_search;
    long_final = long_search;
  }
  console.log("latifin " + lat_final)
  console.log("longfin " + long_final)


  document.getElementById("location-input").value = "";
  document.getElementById("place-input").value = "";

  document.getElementById('latitud_inp').value = lat_final;
  document.getElementById('longitud_inp').value = long_final;

  document.getElementById('pais_inp').value = pais;
  document.getElementById('departamento_inp').value = departamento;
  document.getElementById('region_inp').value = departamento;
  document.getElementById('ciudad_inp').value = ciudad;

}

