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
  //var myLatlng;
    
  
    // Re-init map before show modal
    $('#myModal2').on('show.bs.modal', function(event) {   
      initAutocomplete();
      $("#location-map2").css("width", "100%");
      $("#map_canvas2").css("width", "100%");
    });
  
    // Trigger map resize event after modal shown
    $('#myModal2').on('shown.bs.modal', function() {
      initAutocomplete();
      google.maps.event.trigger(map, "resize");
      //map.setCenter(myLatlng);
    });

  
})

function initAutocomplete() { 
  
  var map = new google.maps.Map(document.getElementById("map_canvas2"), {
    center: { lat: 4.67, lng: -74.095 },
    zoom: 12,
    mapTypeId: "roadmap",
    zoomControl: true,
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

  
  // Create the search box and link it to the UI element.
  const input = document.getElementById("place-input");
  const searchBox = new google.maps.places.SearchBox(input);
  
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());

  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

 
    if (places.length == 0) {
      return;
    }
    
    const map = new google.maps.Map(document.getElementById("map_canvas2"), {
    center: { lat: 4.67, lng: -74.095 },
    zoom: 13,
    mapTypeId: "roadmap",
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

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      
      if (places[0].geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(places[0].geometry.viewport);
      } else {
        bounds.extend(places[0].geometry.location);
      }
    });

    localidad_value="";
    cod_postal_value="";
    neighborhood_value="";
    pais="";
    departamento="";
    ciudad="";
    

    // Create a marker for each place.
    console.log(places)
    console.log(typeof places)
    address_components = places[0].address_components;
    console.log(address_components)

   address_components.forEach(element => {
      console.log(element.types[0])
      console.log(element.long_name)
      if(element.types[0] == 'sublocality_level_1') {
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
  

    console.log(places[0].geometry.location)

    //lati = places[0].geometry.location.lat
    //lngd = places[0].geometry.location.lng
    
    //localidad_value = removeAccents(places[0].address_components[2].long_name);
    //cod_postal_value = removeAccents(places[0].address_components[5].long_name);
    //neighborhood_value = removeAccents(places[0].address_components[1].long_name);
    location_value = removeAccents(places[0].name);

    //pais = removeAccents(places[0].address_components[5].long_name);
    //departamento = removeAccents(places[0].address_components[4].long_name);
    //ciudad = removeAccents(places[0].address_components[3].long_name);
    //console.log(lati,lngd,localidad_value, cod_postal_value,neighborhood_value)
       var myMarker = new google.maps.Marker({
          map,
          position: places[0].geometry.location,
          draggable:true
        })

        google.maps.event.addListener(myMarker, 'dragend', function(evt){
          lat_marker = evt.latLng.lat().toFixed(10);
          long_marker = evt.latLng.lng().toFixed(10);

          console.log(lat_marker,long_marker)
         
        });

        lat_search = myMarker.getPosition().lat();
        long_search = myMarker.getPosition().lng();

       console.log(lat_search + long_search);

    
    map.fitBounds(bounds);
    
  });

}    
  
function getGoogleResponse2(){
  modo_geolocalizacion = 1

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

  console.log(lat_final + "," +long_final)
  console.log(typeof lat_final)
  console.log(long_final.toString().replace(".",","))
  console.log(lat_final.toString().replace(".",","))

  
  document.getElementById("location-input").value = "";
  document.getElementById("place-input").value = "";

  document.getElementById('latitud_inp').value = lat_final;
  document.getElementById('longitud_inp').value = long_final;

  document.getElementById('pais_inp').value = pais;
  document.getElementById('departamento_inp').value = departamento;
  document.getElementById('region_inp').value = departamento;
  document.getElementById('ciudad_inp').value = ciudad;
  
}