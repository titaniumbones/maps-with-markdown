// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(43.639028,-79.403333); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow -- its content and position change when you click on a
// marker
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "";

// I'm complicating things a bit with this next set of variables, which will help us
// with marker colors
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];


/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initialize() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 19,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(43.639028,-79.403333),
              map: my_map,
              icon: redURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: "Fort York",
              window_content: "<h1>Fort York</h1><p>The fort was built in the late 18th century and early 19th century. Fort York was built to take control of Lake Ontario. It was Lieutenant Governor John Graves Simcoe who ordered the Bristish and Canadian military to build the fort against the United States.</p>"
             },
             {position: new google.maps.LatLng(43.6393,-79.40215),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: "Brick Powder Magazine",
              window_content: "<h1>Brick Powder Magazine</h1><p>The powder magazine was the building holding the entire fort's gun powder. The building was the only building made out either brick or stone. The were built sturdy so that a bullet can't go through the walls and ignite the gun powder. They are also built below ground level so that the enemey can't spot the building.</p>"
            },
            {position: new google.maps.LatLng(43.6389,-79.4043),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "Barrack",
             window_content: "<h1>Barrack</h1><p>The barrack is the building where all the men would sleep. Inside the building, is a row of bunk beds. If the men had a family, their family would have a spot in the barrack. A British soilder were allowed to bring his wife and one child to Canada.</p>"
           },
            {position: new google.maps.LatLng(43.63909,-79.40286),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: "Blockhouse",
             window_content: "<h1>Blockhouse 1</h1><p>The blockhouse had no weapons. It was a building for defense. There would be holes in all directions allowing soliders to shoot their musket at the enemy. The second level would have holes on the floor of the parameter of the building allowing the soliders to shoot their muskets down at the enemy.</p>"
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
        legendHTML += "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> <h3>" + marker.title + "</h3><div>" + marker.window_content + "</div></div>";
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

// I added this for fun.  It allows you to trigger the infowindow
// form outside the map.  
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
