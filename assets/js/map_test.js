let map;

/**
* Build a string of HTML code to be shown in infoMarker.
*
* @param {Object}   resort  Information of the resort.
* @returns {string} A string literal with HTML code.
* 
*/
function txtInfoWindowToHTML(resort){
    return `<p><strong>${resort.name}</strong><br> Altitude base:
                    ${resort.altitudeB}<br>Altitude top:${resort.altitudeT}<br>Slopes: ${resort.pists}
                    <br>Number of lifts: ${resort.nrLifts} </p>`;
}

/**
* Build a string of HTML code to be shown in class: txt-places.
*
* @param {Object}   resort  Information of the resort
* @returns {string} A string literal with HTML code
* 
*/
function txtResortToHTML(resort){ 
    let forecastTxt = 
        `<h2>${resort.name}</h2>
        <p>${resort.info}</p>
        <div>
            <h3>Forecast at top: ${resort.forecast[1].date}</h3>
            <div class = "flex-container">`;
    
    /* Do not want item 0 but the next 3. */
    for (let i = 1; i < 4 ; i++){ 
        forecastTxt += 
                `<div class = "forecast"> 
                    ${resort.forecast[i].time}<br>
                    <img src="assets/images/weather/${resort.forecast[i].upper.wx_icon}"> <br>
                    ${resort.forecast[i].upper.temp_avg_c}&#8451<br>
                    ${resort.forecast[i].upper.windspd_avg_ms}m/s
                </div>`;
    }

    forecastTxt += 
            `</div>
        </div>
        <div>
                <h3>Snow Report</h3>
                <p><small>New snow:</small> ${resort.snowReport.newsnow_cm}<br>
                <small>Last snow:</small> ${resort.snowReport.lastsnow}<br>
                <small>Runs open:</small> ${resort.snowReport.pctopen}%<br>
                <small>Snow report:</small> ${resort.snowReport.conditions} </p>
            </div>
            <div><br><a href=${resort.homePage} target="_blank">More info</a></div>`;

    
    return forecastTxt;           
}

/**
* Put a marker at a certain position in the map. It also connects an InfoWindow to the marker. When user clicks on marker the 
* InfoWindow is shown and text besides the map is changet to represent the current resort.
*
* @param {Object}   resort  Information of the ski resort
* @returns {Object} The marker
* 
*/
function buildMarker(resort){  
     
    let infoWindow = new google.maps.InfoWindow({content: txtInfoWindowToHTML(resort)});
            
    let marker = new google.maps.Marker({position: resort.position, icon:"assets/images/yellow-marker48.gif"});
            
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
        $("#place-txt").css("background-color","#ffffff");
        $("#place-txt").html(txtResortToHTML(resort));
    });
    return marker;
}

function returnFetchSnowReport(resortId){
    return fetch(`https://api.weatherunlocked.com/api/snowreport/${resortId}?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`)
    .then((snowRes) => {
        if (!snowRes.ok){
            throw new Error("Something is wrong fetching snowreport for "+ resortId);
        }
        return snowRes.json();
    })
    .then ((snowReport) => {
        resort.snowReport = snowReport;
    }).catch((error) => {throw(error)});
}

function returnFetchForecast(resortId)
    return fetch(`https://api.weatherunlocked.com/api/resortforecast/${resortId}?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`)
    .then( (forecastRes) => {
        if (!forecastRes.ok){
            throw new Error("Something is wrong fetching weather forecast from" + resortId);
        }
        return forecastRes.json();
    })
    .then ((wForecast) => {
        resort.forecast = wForecast.forecast;
    }).catch((error) => {throw (error)});
}

/**
* Fetches snowreport and forecast for a ski resort, from Wheather unlockeds API.
*
* @param {Object}   resort  Information of the ski resort.
* @returns {Object} A map marker
* 
*/
function getResortInfo(resort) {
    /* let snowRep;
    let weatherRep;
    */ 
    fetch(`https://api.weatherunlocked.com/api/snowreport/${resort.id}?app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`,{mode:`no-cors`})
    .then((snowRes) => {
        if (!snowRes.ok){
            throw new Error("Something is wrong fetching snowreport"+resort.name);
        }
        return snowRes.json();
    })
    .then ((snowReport) => {
            /* snowRep = snowReport; */
        resort.snowReport = snowReport;
        return (fetch(`https://api.weatherunlocked.com/api/resortforecast/${resort.id}?hourly_interval=6&app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`,{mode: `no-cors`}))
    })
    .then( (weatherRes) => {
        if (!weatherRes.ok){
            throw new Error("Something is wrong fetching weather forecast");
        }
        return weatherRes.json();
    })
    .then ((weather) => {
        /* weatherRep = weather */
        resort.forecast = weather.forecast;
    })
    .catch((error) => {console.error("error: ", error) });

    
    return buildMarker(resort);
    /*return buildMarker(resort, snowRep, weatherRep); */
} 

/**
* Fetches all the resort from a file and makes a marker for each resort. Making a MarkerClusterer with the markers.
*
*/
function makeMarkersCluster(){ 
    fetch("assets/data/resorts.json")
    .then((res) => {
        if (!res.ok){
            throw new Error("Something went wrong when fetching resorts");
        }
        return res.json();
    })
    .then((resorts) => {
        let fetchQueue =[];
        resorts.forEach( (resort) => {
            fetchQueue.push(fetchSnowReport(resort.id));
            fetchQueue.push(fetchForecast(resort.id));
        })
        return fetchQueue;
    }) 
    .then (Promise.all(fetchQueue))
    -then ((markers) => {
        new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});
    }) 
    .catch((error) => console.error("Error:", error))
}

/**
* Inits an puts a map with markers, in MarkersCluster, in the page. 
*
*/
function initMap(){
    
    map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );
    makeMarkersCluster();
}