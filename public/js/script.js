
require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/FeatureTable",
    "esri/Graphic",
    
    "esri/core/watchUtils",
    "esri/WebMap",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleFillSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/widgets/LayerList",
    "esri/geometry/geometryEngine",
    //"esri/tasks/query",
], function(esriConfig, Map, MapView, FeatureLayer, FeatureTable, Graphic, watchUtils , WebMap, GraphicsLayer, SimpleFillSymbol,
    SimpleRenderer, LayerList , geometryEngine) {
  
    // Send key    
    esriConfig.apiKey = "AAPKfce303aa42be4afd8aded3b28769b9378mMhRZF_arFAJ1OChssDv7q1nRSBXEWJHVW1bJ1_A1utnTE3mNuqNLQkEPjZ_F59";

    
    
    // Map declaration
    const map = new Map({
        basemap: "dark-gray-vector" // Basemap layer service
    });

    // Set map attributes
    const view = new MapView({
        map: map,
        center: [-74.095, 4.67], // Longitude, latitude
        zoom: 14, // Zoom level
        container: "viewDiv", // Div element
        popup: {
          dockOptions: {
            // Disables the dock button from the popup
            buttonEnabled: false,
            // Ignore the default sizes that trigger responsive docking
            breakpoint: false,
          }
        },
        ui: {
            components: ["attribution"]
        }
    });

    // Set symbology 

    const trailheadsRenderer = {
    "type": "unique-value",
    "field": "PRIORIDAD",
    "field2": "ESTADO_EVENTO",
    "fieldDelimiter": "_",
    "uniqueValueInfos": [{
      "value": "1_1",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/91b7993121474aff909d2d7f0c1c86e5/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "1_2",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/b475bf85478b4b3ba0bc0281739c2e23/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "1_3",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/21c2a2d852214cccb997f399e5d7c755/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "2_1",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/1082b4fac1ef4831a9989c5a963946ec/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "2_2",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/f216fc687a2749fdb0b45e927fe85fa4/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "2_3",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/6f98310a1acf4e5a9e2599265ccef0b8/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "3_1",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/20c5ec4b0e964a1abecd5ff6c8b5589b/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "3_2",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/46039cceac2142cabcf299e91f12e644/data',
      "width": "18px",
      "height": "18px"
      }
    },{
      "value": "3_3",
      "symbol": {
      "type": "picture-marker",
      "url": 'https://cieadmin.maps.arcgis.com/sharing/rest/content/items/aa7541c8fc104dec8381cdb1b1d2f9e1/data',
      "width": "18px",
      "height": "18px"
      }
    }
  ]
}; 



   /*  const trailheadsRenderer = {
        "type": "simple",
        "symbol": {
            "type": "picture-marker",
            "url": 'http://static.arcgis.com/images/Symbols/SafetyHealth/FireFighter.png',
            "width": "18px",
            "height": "18px"
        }
    } */

    const localidadRenderer = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "rgba(249, 249, 199, .05)",
          outline: {
            color: "blue",
            width: 1
          }
        })
      });

      const codpostalRenderer = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "rgba(249, 249, 199, .05)",
          outline: {
            color: "red",
            width: 1
          }
        })
      });

      const barrioRenderer = new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: "rgba(249, 249, 199, .05)",
          outline: {
            color: "orange",
            width: 1
          }
        })
      });

    // Popup config
    const popupTrailheads = {
            "title": "Evento No. {OBJECTID_1} - {EVENTO}",
            //"title": "Evento No. {OBJECTID} - {EVENTO}",

            "content": "<b>Estado del Evento:</b> {ESTADO_EVENTO}<br><b>Prioridad:</b> {PRIORIDAD}<br><b>Estado del Reporte:</b> {ESTADO_REPORTE}<br><b>Descripción:</b> {DESCRIPCION}"
        }
        // Table features declaration
    let selectedFeature, id;
    var features = [];

    // Declaration feature layer included popup and symbology
    var trailheadsLayer = new FeatureLayer({
      
      //url: "https://arcgis-server.tecnologiayprocesos.local/WAServer/rest/services/Hosted/Eventos060692021/FeatureServer",
      
      //url: "https://services3.arcgis.com/i8zpmntUumgzHwXj/arcgis/rest/services/eventos32ktest/FeatureServer",  //url test 30k
      url: "https://services3.arcgis.com/i8zpmntUumgzHwXj/arcgis/rest/services/eventos300821/FeatureServer",  //URL BASE ANTIGUA FUNCIONAL
      

        //url: "https://services3.arcgis.com/i8zpmntUumgzHwXj/arcgis/rest/services/EventsLayer/FeatureServer",
        //url: "https://arcgis-server.tecnologiayprocesos.local/WAServer/services/Hosted/EVENTS/MapServer/WFSServer",
        //url: "https://services3.arcgis.com/i8zpmntUumgzHwXj/arcgis/rest/services/Eventos_gdb/FeatureServer",
        //url: "https://services.arcgis.com/deQSb0Gn7gDPf3uV/arcgis/rest/services/hidrantes/FeatureServer",
        
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        minScale: 50000,
        //refreshInterval: 0.1
    });

    var localidadLayer = new FeatureLayer({
        url: "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/ordenamientoterritorial/localidad/MapServer",
        title: "Localidad",
        renderer: localidadRenderer,
        minScale: 50000,
        visible: false
    });


    var codpostalLayer = new FeatureLayer({
        url: "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/gestionpublica/postalesnacionales/MapServer/1",
        title: "Código Postal",
        renderer: codpostalRenderer,
        minScale: 50000,
        visible: false
    });
    
    var barrioLayer = new FeatureLayer({
        url: "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/catastro/sectorcatastral/MapServer/0",
        title: "Barrio",
        renderer: barrioRenderer,
        minScale: 50000,
        visible: false
    });


    // Add feature layer
    view.map.add(trailheadsLayer);
    view.map.add(localidadLayer);
    view.map.add(codpostalLayer);
    view.map.add(barrioLayer);



    view.when(function() {
      


      trailheadsLayer.on("click", function(){
        console.log('trailheadsLayer')
      })
  

      //const turnLayer = document.getElementById("cont_turn_layer");    

        var layerList = new LayerList({
            view: view,
            //container: turnLayer
          });
          view.ui.add(layerList,"bottom-left" );
          
        
        trailheadsLayer.title = "Eventos";
        trailheadsLayer.outFields = ["*"];

        //TABLE
        // Get references to div elements for toggling table visibility
        const tableDiv = document.getElementById("tableDiv");

        // Create FeatureTable
        var featureTable = new FeatureTable({
            view: view, // make sure to pass in view in order for selection to work
            layer: trailheadsLayer,
            map: map,
            syncSelection: true,
            zoomToSelection: true,
            editable: true,
            
            fieldConfigs: [{
                    name: "OBJECTID_1",
                    //name: "OBJECTID",
                    label: "ID",
                    direction: "desc"
                },
                {
                  name: "ID",
                  label: "ID GEO"
                },  
                {
                  name: "EVENTO",
                  label: "Tipo de Evento"
                },
                {
                  name: "PRIORIDAD",
                  label: "Prioridad"
                },
                {
                  name: "ESTADO_EVENTO",
                  label: "Estado del Evento"
                },
                {
                  name: "ESTADO_REPORTE",
                  label: "Estado del Reporte"
                },
                {
                    name: "DESCRIPCION",
                    label: "Descripción"
                },
                {
                  name: "TIPO_EVENTO",
                  label: "Clase de evento"
                },
                {
                    name: "FECHA_REPORTE",
                    label: "Fecha del Incidente",
                },
                
            ],

            container: tableDiv

        });

/*         
        function zoomToSelectedFeature(id_zoom) {
            // Create a query off of the feature layer
            const query = trailheadsLayer.createQuery();
            console.log("entra ZOOM" + id_zoom)
            console.log(typeof id_zoom)
            
             // Iterate through the features and grab the feature's objectID
            const featureIds = features.map((result) => {

              var a = result.feature.getAttribute(trailheadsLayer.objectIdField);
              console.log(a)
              console.log(typeof a)
              return result.feature.getAttribute(trailheadsLayer.objectIdField);
              
            }); 
            // Set the query's objectId
            query.objectIds = featureIds;
            // Make sure to return the geometry to zoom to
            query.returnGeometry = true;
            // Call queryFeatures on the feature layer and zoom to the resulting features
            trailheadsLayer.queryFeatures(query).then((results) => {
             
             
/*               view.goTo({
                target: results.features[0].geometry,
                zoom: 17
            }); 
            //console.log(results.features)
console.log(results.features)
              
              view.goTo(results.features).catch((error) => {
                if (error.name != "AbortError") {
                  console.error(error);
                }
              });
              
            });
          } 
          */

/* 
          featureTable.on("selection-change", (event) => {
            let addedRows = event.added; // An array of features added to the selection
            console.log(addedRows)
            let removedRows = event.removed;  // An array of features removed from the selection
          }); */
        
        featureTable.on("selection-change", function(changes) {
          //features = [];
          

            // If row is unselected in table, remove it from the features array
            changes.removed.forEach(function(item) {
                const data = features.find(function(data) {
                    return data.feature === item.feature;
                });
            });


            // If a row is selected, add to the features array
            changes.added.forEach(function(item) {
              //features = [];

          var array = []
          var array_selected = []
          console.log(array_selected)
          console.log(changes)   
          console.log(item)


          id_zoom = item.objectId;
          //id_zoom = changes.added[0].feature.attributes.OBJECTID_1;
          console.log(id_zoom)
          console.log(typeof id_zoom)
          console.log(changes.added[0].feature.attributes.OBJECTID_1);
          //console.log(changes.added[0].feature.attributes.OBJECTID);


          array_selected = array.push(id_zoom);
          console.log(array_selected)


          //featureTable.clearSelection();
          //featureTable.selectRows([id_zoom],true);
          

          const query = trailheadsLayer.createQuery();
          query.returnGeometry = true;
          query.where = "OBJECTID_1 = " + id_zoom
          //query.where = "OBJECTID = " + id_zoom

          a = trailheadsLayer.queryFeatures(query).then((results) => {
            console.log(results)
           view.goTo({
                target: results.features[0].geometry,
                zoom: 17
            });  
          })
          console.log(a)
              



              const feature = item.feature;
                features.push({
                    feature: feature
                });
                console.log("item tabla")
                console.log(item.feature.attributes.OBJECTID_1)
                //console.log(item.feature.attributes.OBJECTID)

               console.log("array")
               console.log(feature)

                // Listen for row selection in the feature table. If the popup is open and a row is selected that is not the same feature as opened popup, close the existing popup.
                if ((feature.attributes.OBJECTID !== id) && (view.popup.visible === true)) {
                    featureTable.deselectRows(selectedFeature);
                    view.popup.close();
                }
            }); 
        });

        // listen to refresh event 
        featureTable.on("refresh", function(event) {
          console.log("refresh event - ", event);
          featureTable.centerOnSelection();
        });


  // Listen for the click on the view and select any associated row in the table
  view.on("immediate-click", (event) => {
    view.hitTest(event).then((response) => {
      console.log(response)

      var tipo_evt = response.results[0].graphic.attributes.TIPO_EVENTO
      console.log(tipo_evt)

      var punto_seleccionado  = response.results[0].graphic.attributes.OBJECTID_1
      //var punto_seleccionado  = response.results[0].graphic.attributes.OBJECTID

      console.log(punto_seleccionado)
      
      /* const candidate = response.results.find((result) => {
        return (
          result.graphic &&
          result.graphic.layer &&
          result.graphic.layer === featureLayer
        );
      }); */


      // Select the rows of the clicked feature
      //candidate && featureTable.selectRows(candidate.graphic);
    });
  });



        //FILTER BY CHECKBOX
        // Add filter to each checkbox
        cbox_prioridad_alta.addEventListener("change", () => filterByQuery(cbox_prioridad_alta, '1', "prioridad"));
        cbox_prioridad_media.addEventListener("change", () => filterByQuery(cbox_prioridad_media, '2', "prioridad"));
        cbox_prioridad_baja.addEventListener("change", () => filterByQuery(cbox_prioridad_baja, '3', "prioridad"));
        //cbox_urgencia_menor.addEventListener("change", () => filterByQuery(cbox_urgencia_menor, '4'));
        //cbox_no_urgente.addEventListener("change", () => filterByQuery(cbox_no_urgente, '5'));

        cbox_evento_padre.addEventListener("change", () => filterByQuery(cbox_evento_padre, '1', "tipoEvento"));
        cbox_incidente_asociado.addEventListener("change", () => filterByQuery(cbox_incidente_asociado, '2', "tipoEvento"));


        let cbox_on = []

        function filterByQuery(cbox, expression,variableFiltro) {

            cbox_on.push(cbox)
            if (variableFiltro == "prioridad"){
            var exp = `PRIORIDAD='${expression}'`}
            if (variableFiltro == "tipoEvento"){
            var exp = `TIPO_EVENTO='${expression}'`}

            if (cbox.checked === true) {
                trailheadsLayer.definitionExpression = exp
                if (cbox_on.length > 1) {
                    cbox_on[0].checked = false
                    cbox_on.splice(0, 1)
                }
            }
            if (cbox.checked === false) {
                trailheadsLayer.definitionExpression = ""
            }
        }



        //EXPANDED FILTER 
        //Tomar elementos HTML

        const seasonsElement = document.getElementById("seasons-filter");
        //Funcion de filtrado desplegable
        // Añadir funcion de filtro a los elementos HTML
        seasonsElement.addEventListener("click", filterBySeason);

        // Funcion de filtrado
        function filterBySeason(event) {
            const selectedSeason = event.target.getAttribute("data-season");
            if (selectedSeason == "0") {
                trailheadsLayer.definitionExpression = ""
            } else {

                var exp = "ESTADO_EVENTO= '" + selectedSeason + "'"
                trailheadsLayer.definitionExpression = exp

            }
        };

        //ADD NEW FEATURE

        function applyEditsToLayer(edits) {
          console.log(edits)
          trailheadsLayer
                .applyEdits(edits)
                .then((results) => {
                    // if features were added - call queryFeatures to return
                    //    newly added graphics
                    console.log(editsResult.addFeatureResults)
                    if (results.addFeatureResults.length > 0) {
                        var objectIds = [];
                        results.addFeatureResults.forEach((item) => {
                            objectIds.push(item.objectId);
                        });
                    
                        //featureTable.refresh();
                        // query the newly added features from the layer
                       /*  trailheadsLayer
                            .queryFeatures({
                                objectIds: objectIds
                            })
                            .then((results) => {
                                console.log(
                                    results.features.length,
                                    "features have been added."
                                );
                            }); */

                            featureTable.refresh();  
                    }
                })
                .catch((error) => {
                    console.error();
                });
        }


        var url_eventID = "/events/eventID"

        function getEventID() {
          console.log("entra get event ID")
              $.ajax({
                  type: "POST",
                  url: url_eventID, // the URL of the controller action method
                  contentType: "application/x-www-form-urlencoded",
                  data: null, // optional data
                  success: function(result) {   
                      console.log(result)                   
                      $("#id_geo_cont").html(result);

                      // do something with result
                  },
                  error: function(req, status, error) {
                      alert(error);
                      // do something with error   
                  }
              });
     
              
      }





        const addBtn = document.getElementById("addBtn");
        //addBtn.addEventListener("click", getEventID);
        addBtn.addEventListener("click", function() {
          setTimeout(function() { addFeatures();
          }, 10000);
        });

        

       const actualizarBtn = document.getElementById("btn_diligenciar_reporte");
       actualizarBtn.addEventListener("click", actualizar_feature_table);
        
        var intervalID = window.setInterval(actualizar_data, 300000);

        function actualizar_feature_table(){
          featureTable.refresh();
        }
        
        function actualizar_data(){
          featureTable.refresh();
        console.log("entra actualizar data")
        var url_getReport_EventStatus = "/events/getReport_EventStatus"
            
        $.ajax({
          type: "POST",
          url: url_getReport_EventStatus, // the URL of the controller action method
          contentType: "application/x-www-form-urlencoded",
          data: null, // optional data
          success: function(result) {
                              
              $("#cambio_estado_cont").html(result);
              console.log("entra actualizar data dentro ajax")
              setTimeout(function() {
                array_para_cambio()
            }, 6000);
              
              // do something with result
          },
          error: function(req, status, error) {
              console.log(error);
              // do something with error   
          }
        }); 
        
        }
        
        function applyEditsToEvents(params) {
        
        trailheadsLayer
        .applyEdits(params)
        .then((editsResult) => {
        console.log("entra apply edits to events")   
        console.log(editsResult.updateFeatureResults)
        
        // Get the objectId of the newly added feature.
        // Call selectFeature function to highlight the new feature.
        /*      if (editsResult.addFeatureResults.length > 0) {
          const objectId = editsResult.addFeatureResults[0].objectId;
          selectFeature(objectId);
        } */
        })
        .catch((error) => {
        console.log("error = ", error);
        });  
        
        }
        

        
      function array_para_cambio() {
        
        var databaseOID="";
        var databaseID="";
        var databaseTipoEvt="";
        var databasePrioridad="";
        var databaseDesc="";
        var databaseClaseEvt="";
        var databaseFecha="";
        var latitude="";
        var longitude="";
        var databaseGOID="";
        var databaseEstadoEvt ="";
        var array = [];
        var array2 = [];
        var arraytotal = [];
        var arraytotal2 = [];
        var updateFeatures = []; 
        var updateFeatures2 = []; 
        
        var feature = [];  
        
        var input = document.getElementsByName('array[]');
        
        for (var i = 0; i < input.length; i++) {
        if(input[i].value == 3){
          array.push(input[i].id)
          
        } else if (input[i].value == 2) {
          array2.push(input[i].id)
          
        
        } 
          //console.log()
          //console.log(input[i].value)
          //console.log(input[i].nom_estado)   
        }
        console.log(array);
        console.log(array.length)
        console.log(array2);
        console.log(array2.length)
        console.log(arraytotal);
        console.log(arraytotal.length)
        console.log(arraytotal2);
        console.log(arraytotal2.length)
        
        //var array2filter = array1.filter(function(obj) { return array2.indexOf(obj) == -1; });
        
        
        if (array2.length > 0){
        for(var i = 0; i < array2.length; i++) {
          const query = trailheadsLayer.createQuery();
          query.returnGeometry = true;
          query.where = "ID = " + array2[i]
          a = trailheadsLayer.queryFeatures(query).then((results) => { 
            //console.log(results)
            databaseOID = results.features[0].attributes.OBJECTID_1
            //databaseOID = results.features[0].attributes.OBJECTID
            //console.log(databaseOID)
            databaseID = results.features[0].attributes.ID
            //console.log(databaseID)
            databaseGOID = results.features[0].attributes.GlobalID
            //console.log(databaseGOID)
            databaseTipoEvt = results.features[0].attributes.EVENTO
            //console.log(databaseTipoEvt)
            databasePrioridad = results.features[0].attributes.PRIORIDAD
            //console.log(databasePrioridad)
            databaseDesc = results.features[0].attributes.DESCRIPCION
            //console.log(databaseDesc)
            databaseClaseEvt = results.features[0].attributes.TIPO_EVENTO
            //console.log(databaseClaseEvt)
            databaseFecha = results.features[0].attributes.FECHA_REPORTE
            //console.log(databaseFecha)
            latitude = results.features[0].geometry.latitude
            //console.log(latitude)
            longitude = results.features[0].geometry.longitude
            //console.log(longitude)
            databaseEstadoEvt= results.features[0].attributes.ESTADO_EVENTO
            //console.log(databaseEstadoEvt)
            var data = {
                //LATITUDE: latitude,
                //LONGITUDE: longitude, 
               // objectId: databaseOID,
                //FID: databaseOID,
                OBJECTID_1: databaseOID,
                //OBJECTID: databaseOID,
                GlobalID:databaseGOID,
                ID: databaseID,
                EVENTO: databaseTipoEvt,
                PRIORIDAD: databasePrioridad,
                ESTADO_EVENTO: 2,
                ESTADO_REPORTE: 1,
                DESCRIPCION: databaseDesc,
                TIPO_EVENTO: databaseClaseEvt,
                FECHA_REPORTE: databaseFecha
                          
              };
        
            if (databaseEstadoEvt == 1){
                           
              feature = new Graphic(null, null, data);
              updateFeatures.push(feature);  
              
        
            }
           
        
        
          })
          
        }
        console.log(updateFeatures)   
        const UpdateEdits = {
          updateFeatures: updateFeatures
        };
        
        console.log(UpdateEdits)
        
        applyEditsToEvents(UpdateEdits)
        }
        
        if (array.length > 0){
        for(var i = 0; i < array.length; i++) {
          const query = trailheadsLayer.createQuery();
          query.returnGeometry = true;
          query.where = "ID = " + array[i]
          a = trailheadsLayer.queryFeatures(query).then((results) => { 
            //console.log(results)
            databaseOID = results.features[0].attributes.OBJECTID_1
            //databaseOID = results.features[0].attributes.OBJECTID
            //console.log(databaseOID)
            databaseID = results.features[0].attributes.ID
            //console.log(databaseID)
            databaseGOID = results.features[0].attributes.GlobalID
            //console.log(databaseGOID)
            databaseTipoEvt = results.features[0].attributes.EVENTO
            //console.log(databaseTipoEvt)
            databasePrioridad = results.features[0].attributes.PRIORIDAD
            //console.log(databasePrioridad)
            databaseDesc = results.features[0].attributes.DESCRIPCION
            //console.log(databaseDesc)
            databaseClaseEvt = results.features[0].attributes.TIPO_EVENTO
            //console.log(databaseClaseEvt)
            databaseFecha = results.features[0].attributes.FECHA_REPORTE
            //console.log(databaseFecha)
            latitude = results.features[0].geometry.latitude
            //console.log(latitude)
            longitude = results.features[0].geometry.longitude
            //console.log(longitude)
            databaseEstadoEvt= results.features[0].attributes.ESTADO_EVENTO
            //console.log(databaseEstadoEvt)
            var data = {
                //LATITUDE: latitude,
                //LONGITUDE: longitude, 
               // objectId: databaseOID,
                //FID: databaseOID,
                OBJECTID_1: databaseOID,
                //OBJECTID: databaseOID,
                GlobalID:databaseGOID,
                ID: databaseID,
                EVENTO: databaseTipoEvt,
                PRIORIDAD: databasePrioridad,
                ESTADO_EVENTO: 3,
                ESTADO_REPORTE: 1,
                DESCRIPCION: databaseDesc,
                TIPO_EVENTO: databaseClaseEvt,
                FECHA_REPORTE: databaseFecha
                          
              };
        
            if (databaseEstadoEvt == 1){
                           
              feature = new Graphic(null, null, data);
              updateFeatures2.push(feature);  
              
        
            }
           
        
        
          })
          
        }
        console.log(updateFeatures2)   
        const UpdateEdits = {
          updateFeatures: updateFeatures2
        };
        
        console.log(UpdateEdits)
        
        applyEditsToEvents(UpdateEdits)
        }
        
        
        /* 
        if (array2.length > 0){
        for(var i = 0; i < array2.length; i++) {
        console.log("elkin " + array2[i])
        const query = trailheadsLayer.createQuery();
        query.returnGeometry = true;
        query.where = "ID = " + array2[i]
        a = trailheadsLayer.queryFeatures(query).then((results) => { 
          console.log(results)
          databaseOID = results.features[0].attributes.OBJECTID_1
          //databaseOID = results.features[0].attributes.OBJECTID
          console.log(databaseOID)
          databaseID = results.features[0].attributes.ID
          console.log(databaseID)
          databaseGOID = results.features[0].attributes.GlobalID
          console.log(databaseGOID)
          databaseTipoEvt = results.features[0].attributes.EVENTO
          console.log(databaseTipoEvt)
          databasePrioridad = results.features[0].attributes.PRIORIDAD
          console.log(databasePrioridad)
          databaseDesc = results.features[0].attributes.DESCRIPCION
          console.log(databaseDesc)
          databaseClaseEvt = results.features[0].attributes.TIPO_EVENTO
          console.log(databaseClaseEvt)
          databaseFecha = results.features[0].attributes.FECHA_REPORTE
          console.log(databaseFecha)
          latitude = results.features[0].geometry.latitude
          console.log(latitude)
          longitude = results.features[0].geometry.longitude
          console.log(longitude)
        
          var data = {
            //LATITUDE: latitude,
            //LONGITUDE: longitude, 
           // objectId: databaseOID,
            //FID: databaseOID,
            OBJECTID_1: databaseOID,
            //OBJECTID: databaseOID,
            GlobalID:databaseGOID,
            ID: databaseID,
            EVENTO: databaseTipoEvt,
            PRIORIDAD: databasePrioridad,
            ESTADO_EVENTO: 2,
            ESTADO_REPORTE: 1,
            DESCRIPCION: databaseDesc,
            TIPO_EVENTO: databaseClaseEvt,
            FECHA_REPORTE: databaseFecha
                      
          };
          console.log(data)
         
        
        
        var feature = new Graphic(null, null, data);
        updateFeatures.push(feature);  
        console.log(updateFeatures)   
        
        
        
        
        
        
        })
        
        }
        const UpdateEdits = {
        updateFeatures: updateFeatures
        };
        
        console.log(UpdateEdits)
        
        applyEditsToEvents(UpdateEdits)
        }
        */
        /*           
        if (array.length > 0){
        for(var i = 0; i < array.length; i++) {
        console.log("elkin " + array[i])
        const query = trailheadsLayer.createQuery();
        query.returnGeometry = true;
        query.where = "ID = " + array[i]
        a = trailheadsLayer.queryFeatures(query).then((results) => { 
          console.log(results)
          databaseOID = results.features[0].attributes.OBJECTID_1
          //databaseOID = results.features[0].attributes.OBJECTID
          console.log(databaseOID)
          databaseID = results.features[0].attributes.ID
          console.log(databaseID)
          databaseGOID = results.features[0].attributes.GlobalID
          console.log(databaseGOID)
          databaseTipoEvt = results.features[0].attributes.EVENTO
          console.log(databaseTipoEvt)
          databasePrioridad = results.features[0].attributes.PRIORIDAD
          console.log(databasePrioridad)
          databaseDesc = results.features[0].attributes.DESCRIPCION
          console.log(databaseDesc)
          databaseClaseEvt = results.features[0].attributes.TIPO_EVENTO
          console.log(databaseClaseEvt)
          databaseFecha = results.features[0].attributes.FECHA_REPORTE
          console.log(databaseFecha)
          latitude = results.features[0].geometry.latitude
          console.log(latitude)
          longitude = results.features[0].geometry.longitude
          console.log(longitude)
        
          var data = {
            //LATITUDE: latitude,
            //LONGITUDE: longitude, 
           // objectId: databaseOID,
            //FID: databaseOID,
            OBJECTID_1: databaseOID,
            //OBJECTID: databaseOID,
            GlobalID:databaseGOID,
            ID: databaseID,
            EVENTO: databaseTipoEvt,
            PRIORIDAD: databasePrioridad,
            ESTADO_EVENTO: 3,
            ESTADO_REPORTE: 1,
            DESCRIPCION: databaseDesc,
            TIPO_EVENTO: databaseClaseEvt,
            FECHA_REPORTE: databaseFecha
                      
          };
          console.log(data)
          
        
        var feature = new Graphic(null, null, data);
        
        updateFeatures.push(feature);  
        console.log(updateFeatures)   
        
        
        
        
        
        
        })
        
        }
        const UpdateEdits = {
        updateFeatures: updateFeatures
        };
        
        console.log(UpdateEdits)
        
        applyEditsToEvents(UpdateEdits)
        }
        */
        
        
        
        }
        
   
        

        

        function addFeatures() {
          
          getEventID();


          setTimeout(function() {
            
          var id_evento_principal = $('#id_geo').val();
          console.log("id bd "+ id_evento_principal)


          var value = document.getElementById('asociated_id').value;
          console.log("value"+ value)
          console.log(typeof value)
          var priorityvalue = document.getElementById('head_reporte_prioridad_inp').value;
          console.log("prioridad"+ priorityvalue)
          console.log(typeof priorityvalue)
          var tipo_evt1 = document.getElementById('evt1_desc').value;
          const lower = tipo_evt1.toLowerCase();
          var tipo_evento_format = tipo_evt1.charAt(0).toUpperCase() + lower.slice(1);
          console.log("tipoevt"+ tipo_evento_format)
          console.log(typeof tipo_evento_format)
          var descripcion = document.getElementById("descripcion-cont1").value;
          console.log("descripcion"+ descripcion)
          console.log(typeof descripcion)


        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = fecha.getMonth() + 1;
        var año = fecha.getFullYear();
        var hora = fecha.getHours() + 5;
        var minutos = fecha.getMinutes();


        const FechaEsri = mes + '/' + dia + '/' + año + ' ' + hora + ':' + minutos;
          
          // data to be added to the map
          var latlongpos = lat_final + ";" + long_final
          
          prioridad = parseInt(priorityvalue);
          tipo_evt = tipo_evento_format.toString();
          description = descripcion.toString();
          id_bd = parseInt(id_evento_principal);
          console.log(lat_final);
          console.log(typeof lat_final);

          console.log(long_final);
          console.log(typeof long_final);

          console.log(latlongpos);
          console.log(typeof latlongpos);

          console.log(tipo_evt);
          console.log(typeof tipo_evt);

          console.log(prioridad);
          console.log(typeof prioridad);

          console.log(description);
          console.log(typeof description);

          console.log(FechaEsri);
          console.log(typeof FechaEsri);


          var data = [];
          if (value == "0"){

/*             var input_evento = document.createElement("input");
            input_evento.value = id_bd;
            input_evento.id = id_bd;
            input_evento.setAttribute("estado_evento", "ACTIVO")
            input_evento.setAttribute("prioridad", prioridad)
            input_evento.setAttribute("estado_reporte", "SIN INFORMAR")
            input_evento.style.type = "hidden"
            document.body.appendChild(input_evento);
 */


            


            data = [{
              LATITUDE: lat_final,
              LONGITUDE: long_final,
              EVENTO: tipo_evt,
              PRIORIDAD: prioridad,
              DESCRIPCION: description,
              FECHA_REPORTE: FechaEsri,
              TIPO_EVENTO: 1,
              ID: id_bd 
          }];

          }else{
            data = [{
              LATITUDE: lat_final,
              LONGITUDE: long_final,
              EVENTO: tipo_evt,
              PRIORIDAD: prioridad,
              DESCRIPCION: description,
              FECHA_REPORTE: FechaEsri,
              TIPO_EVENTO: 2,
              ID: id_bd 
          }];
          }

          
            // create an array of graphics based on the data above
            var graphics = [];
            graphics[0] = graphic = new Graphic({
                geometry: {
                    type: "point",
                    latitude: data[0].LATITUDE,
                    longitude: data[0].LONGITUDE
                },
                attributes: data[0]
            });
console.log(graphics)
            // addEdits object tells applyEdits that you want to add the features
            const addEdits = {
                addFeatures: graphics
            };
console.log(addEdits)
            // apply the edits to the layer
            
            applyEditsToLayer(addEdits);
            featureTable.refresh();  
           
    
            //featureTable.refresh();  
         // }else {
            console.log("solo cierra");
         
          }, 5000);
          }
       // }


        var url_eventInfoMoniroting = "/events/monitoringEventInfo"

        function monitoringEvent(id) {
          console.log("entra get event monitoring")
          setTimeout(() => {
              $.ajax({
                  type: "POST",
                  url: url_eventInfoMoniroting, // the URL of the controller action method
                  contentType: "application/x-www-form-urlencoded",
                  data: {id:id}, // optional data
                  success: function(result) {
                    loader_monitoring();
                      
                      $("#cont_monitoring_event").html(result);

                      // do something with result
                  },
                  error: function(req, status, error) {
                      alert(error);
                      // do something with error   
                  }
              });
          }, 500);
      
      }

      var url_reportByEventCount = "/events/reportByEventCount"

      function reportByEvent(id) {
        console.log("entra reportes")
        console.log(id)

        setTimeout(() => {
            $.ajax({
                type: "POST",
                url: url_reportByEventCount, // the URL of the controller action method
                contentType: "application/x-www-form-urlencoded",
                data: {id:id}, // optional data
                success: function(result) {
                       
                    $("#cont_report_by_event").html(result);

                    // do something with result
                },
                error: function(req, status, error) {
                    alert(error);
                    // do something with error   
                }
            });
        }, 500);
    
    }



        // Get information of each event
        view.on("click", function(event) {
            var screenPoint = { x: event.x, y: event.y };
            view.hitTest(screenPoint).then(function(response) {
                if (response.results.length > 1) {
                  console.log("ingresa a click")
                  console.log(response)

                  tipo_evt_padre = response.results[0].graphic.attributes.TIPO_EVENTO;
                  console.log(tipo_evt_padre)

                  id_event_selected = response.results[0].graphic.attributes.ID;
                  console.log(id_event_selected)
                    
                  if (tipo_evt_padre == 1){
                    reportByEvent(id_event_selected);
                    monitoringEvent(id_event_selected);
                    //activar monitoreo de eventos
                  }else{

                    $("#cod_evento").html("");
                    $("#tipo_evento_lab").html("");
                    $("#tipo_prioridad_lab").html("");
                    $("#causas_txt").html("");
                    $("#entidades_panel").html("");
                    $("#input_danos_materiales").val("-");
                    $("#input_danos_animales").val("-");
                    $("#input_danos_integridad").val("-");
                    $("#input_danos_insumos").val("-");
                    $("#input_danos_soportes").val("-");
                 }
                  
                 /*  console.log(response.results[0].graphic)
                    var intersect_bario = geometryEngine.intersects(trailheadsLayer, localidadLayer)
                    console.log(intersect_bario) */
                    //verificar capa
                    /* var graphic = response.results.filter(function (result) {    // check if the graphic belongs to the layer of interest   
                      return result.graphic.layer === myLayer;   })[0].graphic;  */
                }

            })
        })
    });





    
    //Add each element to map
    view.ui.add(document.getElementById("tableContainer"), "bottom-right");
    view.ui.add("content-user", "top-left");
    //view.ui.move("zoom", "bottom-right");
    view.ui.add("resumen", "manual");
    view.ui.add("diagnostico", "manual");
    view.ui.add("filtros", "bottom-right");
    view.ui.add("filtro_tipo_evento", "bottom-right");

    view.ui.add("panel", "manual");
    


});