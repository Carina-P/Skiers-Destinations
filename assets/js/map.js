function getResortInfo(){
    let resortId = 512001;
    fetch(`https://api.weatherunlocked.com/api/snowreport/${resortId}?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`)
    .then((snowRes) => {
        if (!snowRes.ok){
            throw new Error("Something is wrong fetching snowreport");
        }
        return snowRes.json();
    })
    .then ((snowReport) => {
        console.log(snowReport)
        return (fetch(`https://api.weatherunlocked.com/api/resortforecast/${resortId}?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`))
    })
    .then( (weatherRes) => {
        if (!weatherRes.ok){
            throw new Error("Something is wrong fetching weather forecast");
        }
        return weatherRes.json();
    })
    .then ((weather) => {
        console.log(weather);
    })
    .catch((error) => {console.error("error: ", error) });
 
}

function initMap(){
    
    let map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );

    fetch("assets/data/resorts.json")
    .then((res) => {
        if (!res.ok){
            throw new Error("Something went wrong when fetching resorts");
        }
        return res.json();
    })
    .then((resorts) => {
        let markers = [];

        resorts.forEach((resort) => {
            let infoWindow = new google.maps.InfoWindow({content: `<p><strong>${resort.name}</strong><br> Altitude base:
                    ${resort.altitudeB}<br>Altitude top:${resort.altitudeT}<br>Slopes: ${resort.pists}
                    <br>Number of lifts: ${resort.nrLifts} </p>`
                });

            let marker = new google.maps.Marker({position:resort.position, map:map, icon: "assets/images/yellow-marker48.gif"});
        
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
                $("#place-txt").css("background-color","#ffffff");
                $("#place-txt").html(`<h2>${resort.name}</h2>`);
            });
            markers.push(marker);
        })
        return markers;
    }) 
    .then((markers) => {
        let markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});  
    })
    .catch((error) => console.error("Error:", error)); 
 
    getResortInfo();
}