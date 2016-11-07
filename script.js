// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(43.349243, -78.365479); // center of map
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
        zoom: 7,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(44.232701, -76.478391),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map to the one
                             // located at the URL which is given by the variable blueURL, see above
              title: " FortFrontenac",
              window_content: "<h3>Fort Frontenac</h3><p> Also called Fort Oswego by 18th century trader John Long- he describes this fort as being the key to the United States as it facilitated passageway to the North and to the Hudson River.</p>"
             },
             {position: new google.maps.LatLng(42.299369, -83.096096),
              map: my_map,
              icon: blueURL, // this sets the image that represents the marker in the map
              title: " FortDetroit",
              window_content: "<h3> Fort Detroit</h3><p> An initially highly contentious fort, through agreements between the French and the Iroquois the fort was finally built. The French claimed that the fort would act as a place of arbitration for the hunting grounds surrounding it as well as provide the Iroquois with arms and provisions.</p>"
            },
            {position: new google.maps.LatLng(43.262389, -79.063116),
             map: my_map,
             icon: blueURL, // this sets the image that represents the marker in the map
             title: " FortNiagara",
             window_content: "<h3> Fort Niagara</h3><p> An important fort which would later come into British posession thanks to negotiations with the Seneca Native Indians. This fort was also the strategical supply point for the British and key for being able to quickly transport troops west in case of rebellion or war.</p>"

           },
           {position: new google.maps.LatLng(42.652579, -73.756232),
            map: my_map,
            icon: redURL, // this sets the image that represents the marker in the map
            title: " Albany",
            window_content: "<h3> Albany</h3><p>Albany was a major trade hub where many Native groups such as the Iroquois and the western tribes often sold their pelts. The merchants at this post would often send agents to other forts such as Fort Frontenac in order to procure goods.  </p>"
          },
          {position: new google.maps.LatLng(41.866748, -77.838135),
           map: my_map,
           icon: redURL, // this sets the image that represents the marker in the map
           title: "NativeTerritory",
           window_content: "<h3> Native Territories</h3><p>According to 18th century trader John Long, all land beneath Lake Ontario, Lake Erie, and the St. Lawrence River was claimed by the Five Nations Natives.</p>"
         },
         {position: new google.maps.LatLng(43.654460, -77.893066),
          map: my_map,
          icon: redURL, // this sets the image that represents the marker in the map
          title: "War on the Lake",
          window_content: "<h3>War on the Lake</h3><p>In one of his accounts John Long writes that women and children sometimes sang war songs while rowing their canoes across Lake Ontario. </p>"
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
        legendHTML += "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> <div>" + marker.window_content + "</div></div>";
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
