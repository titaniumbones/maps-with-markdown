
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(43.6344998,-79.3805541); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "";


var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var red_markers = [];
var blue_markers = [];


function initialize() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 13,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    var all_my_markers =
            [{position: new google.maps.LatLng(43.6254364,-79.3693453),
              map: my_map,
              icon: blueURL,
              title: "first Marker",
              window_content: "<h1>Royal Canadian Yacht Club</h1><p>Founded in 1852, with deep colonial ties and prestige.</p>"
             },
             {position: new google.maps.LatLng(43.633325,-79.4003356),
              map: my_map,
              icon: blueURL, 
              title: "second Marker",
              window_content: "<h1>National Yacht Club</h1><p>Founded in 1894 at the Queens Quay Wharf.</p>"
            },
            {position: new google.maps.LatLng(43.6353243,-79.4010072),
             map: my_map,
             icon: redURL,
             title: "third Marker",
             window_content: "<h1>Queens Quay Wharf</h1><p>AKA Aquatics Club Reservation. Location of NYC in 1904 and AYC in 1919.</p>"
           },
             {position: new google.maps.LatLng(43.6329744,-79.4005928),
              map: my_map,
              icon: redURL,
              title: "fourth Marker",
              window_content: "<h1>Alexandia Yacht Club</h1><p>Founded in 1906.</p>"
             },
             {position: new google.maps.LatLng(43.639026,-79.348815),
             map: my_map,
             icon: blueURL,
             title: "fifth Marker",
              window_content:"<h1>Original Location of AYC</h1><p>Previously known as Fisherman's Island, now a park of Cherry Beach."
           },
            {position: new google.maps.LatLng(43.6439459,-79.3909462),
             map: my_map,
             icon: redURL,
             title: "sixth Marker",
              window_content:"<h1>Original Shoreline of Toronto</h1><p>Past this point is man-made shore."
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


function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}

function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
