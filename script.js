// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(47.623026,-122.339840); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h2>Legend: The Impact of Gentrification on monthly 1BR Rental Rates in Seattle</h2>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson
var myGeoJSON= {
  "type":"FeatureCollection",
  "features":
  [{"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[-85.60546875,49.03786794532644],[-96.6796875,40.713955826286046],
                                [-79.62890625,37.71859032558816],[-81.2109375,49.26780455063753],
                                [-85.60546875,49.03786794532644]]]}},
   {"type":"Feature",
    "properties":{myColor: 'green'},
    "myColor" : "green",
     "geometry":{"type":"Polygon",
                 "coordinates":[[[-113.203125,58.35563036280967],[-114.78515624999999,51.944264879028765],
                                 [-101.6015625,51.944264879028765],[-112.32421875,58.263287052486035],
                                 [-113.203125,58.35563036280967]]]
                }}]};


/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 12,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(47.617144, -122.338578),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Amazon Headquarters",
              window_content: "<h3>Amazon HQ</h3><p>Amazon's headquarter is located within the South Lake Union corridor.</p>"
             },
             {position: new google.maps.LatLng(47.619813,-122.335659),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "South-Lake Union ($1,900)",
              window_content: "<h3>South Lake Union ($1,900)</h3><p>This formererly dilapidated warehouse and industrial region now houses the Amazon HQ.</p>"
            },
            {position: new google.maps.LatLng(47.614702,-122.344796),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "Belltown ($1,910)",
             window_content: '<h3>Belltown ($1,910) </h3><p>Located on Settle\'s waterfront, this former low-rent industrial artdistrict has been transformed into a trendy restaurant and boutique-filled neighbourhood that houses a portion of the Amazon complex. and it has also experienced drastically increasing rental rates.</p>'
           },
           {position: new google.maps.LatLng(47.624140,-122.356310),
            map: my_map,
            icon: blueURL, // this sets the image that represents the marker in the map
            title: "Lower Queen Anne ($1,675)",
            window_content: '<h3>Lower Queen Anne ($1,675)</h3><p>A neighbourhing corridor, LQA has also seen marked but less drastic increases in rental costs.</p>'
          },
          {position: new google.maps.LatLng(47.638823, -122.3488),
           map: my_map,
           icon: blueURL, // this sets the image that represents the marker in the map
           title: "East Queen Anne ($1,630)",
           window_content: '<h3>East Queen Anne ($1,630)</h3><p>A more economical neighbourhood of mostly single mid-twenties, early-thirties professionals.</p>'
         },
         {position: new google.maps.LatLng(47.610136, -122.342057),
          map: my_map,
          icon: blueURL, // this sets the image that represents the marker in the map
          title: "Pike Place Market ($1,725)",
          window_content: '<h3>Pike Place Market ($1,725)</h3><p>A popular tourist spot. This public market opened in 1907 and is one of Seattle\'s main attractions.</p>'
        },
        {position: new google.maps.LatLng(47.625305, -122.322183),
         map: my_map,
         icon: blueURL, // this sets the image that represents the marker in the map
         title: "Broadway ($1,600)",
         window_content: '<h3>Broadway ($1,600)</h3><p>A major thoroughfare, this district houses major transit streets. All the better to get to work!</p>'
       }
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var romeCircle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    map: my_map,
    bounds: {
      north: 42.685,
      south: 40.671,
      east: 12.501,
      west: 12.485
    },

    center: {"lat": 41.9000, "lng":12.5000},
    radius: 1000
  });
  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// form outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
