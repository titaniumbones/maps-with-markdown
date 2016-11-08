var my_map; 
var my_map_options;
var hotspot1 = new google.maps.LatLng(43.661710,-79.311976); // Ashbridges Bay Park
var hotspot2 = new google.maps.LatLng(43.716820,-79.226083); // Bluffer’s Park
var hotspot3 = new google.maps.LatLng(43.651991,-79.589138); // Centennial Park
var hotspot4 = new google.maps.LatLng(43.588397,-79.517094); // Colonel Samuel Smith Park
var hotspot5 = new google.maps.LatLng(43.685679,-79.502614); // Eglinton Flats
var hotspot6 = new google.maps.LatLng(43.778520,-79.460544); // G. Ross Lord Park
var hotspot7 = new google.maps.LatLng(43.641039,-79.466873); // Grenadier Pond
var hotspot8 = new google.maps.LatLng(43.621687,-79.475545); // Humber Bay Park East
var hotspot9 = new google.maps.LatLng(43.586966,-79.543057); // Marie Curtis Park
var hotspot10 = new google.maps.LatLng(43.631369,-79.326374); // Tommy Thompson Park
var hotspot11 = new google.maps.LatLng(43.628947,-79.394420); // Toronto Islands
var my_markers = [];
var infowindow = new google.maps.InfoWindow({content: ""});
var my_first_marker; 
var my_second_marker; 
var my_third_marker; 
var my_fourth_marker; 
var my_fifth_marker; 
var my_sixth_marker; 
var my_seventh_marker; 
var my_eighth_marker; 
var my_ninth_marker; 
var my_tenth_marker; 
var my_eleventh_marker; 

function initialize() {
    my_map_options = {
        center: hotspot1, // show Ashbridges Bay Park first
        zoom: 10,  
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
   
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    my_first_marker = new google.maps.Marker({
        position: hotspot1,
        map: my_map,
        title: "1",
        window_content:"<h1><font color=navy>Ashbridges Bay Park</font></h1><p>1561 Lake Shore Blvd E, Toronto, ON M4L 3W6<br>Common fish: Bass, carp, panfish, and trout.</p>"
    }); 
     my_second_marker = new google.maps.Marker({
        position: hotspot2,
        map: my_map,
        title: "2",
        window_content:"<h1><font color=navy>Bluffer’s Park</font></h1><p>7 Brimley Rd S, Scarborough, ON M1M 3W3<br>Common fish: Walleye, salmon, and trout.</p>"
    }); 
        my_third_marker = new google.maps.Marker({
        position: hotspot3,
        map: my_map,
        title: "3",
        window_content:"<h1><font color=navy>Centennial Park</font></h1><p>256 Centennial Park Rd, Etobicoke, ON M9C 5N3<br>Common fish: Carp.</p>"
    }); 
     my_fourth_marker = new google.maps.Marker({
        position: hotspot4,
        map: my_map,
        title: "4",
        window_content:"<h1><font color=navy>Colonel Samuel Smith Park</font></h1><p>3145 Lake Shore Boulevard West, Etobicoke, ON M8V 1L4<br>Common fish: Bass, pike, carp, and panfish.</p>"
    }); 
     my_fifth_marker = new google.maps.Marker({
        position: hotspot5,
        map: my_map,
        title: "5",
        window_content:"<h1><font color=navy>Eglinton Flats</font></h1><p>3601 Eglinton Ave W, Toronto, ON L5M 7C4<br>Common fish: Pike.</p>"
    }); 
       my_sixth_marker = new google.maps.Marker({
        position: hotspot6,
        map: my_map,
        title: "6",
        window_content:"<h1><font color=navy>G. Ross Lord Park</font></h1><p>4801 Dufferin St, North York, ON M3H 5T3<br>Common fish: Goldfish, punkinseed, rock bass, brown bullhead, and carp.</p>"
    }); 
       my_seventh_marker = new google.maps.Marker({
        position: hotspot7,
        map: my_map,
        title: "7",
        window_content:"<h1><font color=navy>Grenadier Pond</font></h1><p>1873 Bloor St W, Toronto, ON M6R 2Z3, Canada<br>Common fish: Carp, bluegill, punkinseed, black crappie, yellow perch, white perch, brown bullhead, and bass.</p>"
    }); 
       my_eighth_marker = new google.maps.Marker({
        position: hotspot8,
        map: my_map,
        title: "8",
        window_content:"<h1><font color=navy>Humber Bay Park East</font></h1><p>100 Humber Bay Park Rd W, Toronto, ON M8V 3X7<br>Common fish: Pike, bass, bluegills, punkinseed, and brown bullhead.</p>"
    }); 
       my_ninth_marker = new google.maps.Marker({
        position: hotspot9,
        map: my_map,
        title: "9",
        window_content:"<h1><font color=navy>Marie Curtis Park</font></h1><p>2 Forty Second St, Etobicoke, ON M8W 3P2<br>Common fish: Salmon, trout, carp, and brown bullhead.</p>"
    }); 
       my_tenth_marker = new google.maps.Marker({
        position: hotspot10,
        map: my_map,
        title: "10",
        window_content:"<h1><font color=navy>Tommy Thompson Park</font></h1><p>1 Leslie St, Toronto, ON M4M 3M2<br>Common fish: Bass, pike, yellow perch, trout, freshwater drum, black crappie, and brown bullhead.</p>"
    }); 
       my_eleventh_marker = new google.maps.Marker({
        position: hotspot11,
        map: my_map,
        title: "11",
        window_content:"<h1><font color=navy>Toronto Islands</font></h1><p>Toronto, ON M5J 2H3<br>Common fish: Bass, black crappie, bluegill, brown bullhead, punkinseed, yellow perch, and white perch.</p>"
    }); 
 

    var my_first_listener = google.maps.event.addListener(my_first_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
  
   var my_second_listener = google.maps.event.addListener(my_second_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });  
   var my_third_listener = google.maps.event.addListener(my_third_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
   var my_fourth_listener = google.maps.event.addListener(my_fourth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
   var my_fifth_listener = google.maps.event.addListener(my_fifth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_sixth_listener = google.maps.event.addListener(my_sixth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_seventh_listener = google.maps.event.addListener(my_seventh_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_eighth_listener = google.maps.event.addListener(my_eighth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_ninth_listener = google.maps.event.addListener(my_ninth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_tenth_listener = google.maps.event.addListener(my_tenth_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });
     var my_eleventh_listener = google.maps.event.addListener(my_eleventh_marker, 'click', function() {
        infowindow.setContent (this.window_content);
        infowindow.open(my_map, this); 
    });

    // add this new marker to the marker array, for our buttons. 
    my_markers.push({marker:my_first_marker, listener: my_first_listener}); 

  
    /* ----------------------------------------------------------------------------------- */
    /* end marker definition!! Be sure to paste new marker code ABOVE the "}" just below this */
  
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
