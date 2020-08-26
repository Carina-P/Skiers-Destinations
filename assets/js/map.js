function initMap(){
    
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );

    var marker = new google.maps.Marker({position: {lat: 45.297309, lng: 6.579732}, map: map,
    icon: "assets/images/yellow-marker48.gif" });

    /*
    let markers = locations.map(function(location) {
          return new google.maps.Marker({
            position: location,
            icon:"assets/images/yellow-marker48.gif"
          });
        });
    console.log(markers);
        
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});*/
}