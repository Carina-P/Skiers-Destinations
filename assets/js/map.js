function initMap(){
    
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );

    var infoWindow = new google.maps.InfoWindow({content: "this is a test"});

    var marker = new google.maps.Marker({position:{lat: 63.399043, lng: 13.081506}, map:map, icon: "assets/images/yellow-marker48.gif"});
        
    marker.addListener("click", function(){
            infoWindow.open(map, marker);
            $("#place-txt").css("background-color","#ffffff");
            $("#place-txt").html("<p>Text about Ski resort</p>");
    });
    
    let resorts = [
        {lat: 45.297309, lng: 6.579732}, 
        {lat: 46.096081, lng: 7.228551}
    ];

   
    let markers = resorts.map(function(resort) {
          return new google.maps.Marker({
            position: resort,
            icon:"assets/images/yellow-marker48.gif"
          });
        });

        
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});
}