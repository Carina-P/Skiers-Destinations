/* A google map */
let map;
/* Googles MarkerClusterer */
let clustersOfMarkers;
/* Will contain information of all resorts shown in map */
let resorts;
 
/* url to file with information about resorts */
const resortsURL = "assets/data/resorts.json";
/* the beginning part of url used both for fetching snowreport but also
forecast from Wheather Unlocked */
const weatherFrontURL = `https://api.weatherunlocked.com/api/`;
/* the end part of url fetching information from Weather Unlocked */
const weatherEndURL = 
    `app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`; 

/**
 * Fetches information from json file.
 * 
 * @param {sting literal} url the files url
 * 
 * @returns {Promis}
 */
function fetchResortInfo(url){
    return fetch(url)
        .then( res => res.json())
        .catch( error => console.log("Error!", error));
};
 
/**
 * Fetches snowreport for a specific resort from Weahter Unlocked
 * 
 * @param {number} resortId Resorts id in Weather Unlocked API
 * 
 * @returns {Promise} 
 */
function fetchSnowInfo(resortId){
    let snowReportURL = weatherFrontURL+`snowreport/${resortId}?`+
        weatherEndURL;
    return fetchResortInfo(snowReportURL);
}

/**
 * Fetches forecast for a specific resort from Wheather unlocked
 * 
 * @param {number} resortId Resorts id in Weather Unlocked API
 * 
 * @returns {Promise} 
 */
function fetchForecastInfo(resortId){
    let forecastURL = weatherFrontURL+
        `resortforecast/${resortId}?hourly_interval=6&`+weatherEndURL;
    return fetchResortInfo(forecastURL);
}

/**
* Build a string literal of HTML code for the content of a infoMarker, that is 
* connected to marker.
*
* @param {Object}   resort  Information of the resort to be shown.
* @returns {string} A string literal with HTML code.
* 
*/
function contentInfoWindow(resort){    
    return `<h5>${resort.name}</h5>
            <p>Alt base: ${resort.altitudeB}<br>
            Alt top: ${resort.altitudeT}<br>
            Slopes: ${resort.pists}<br>
            Nr of lifts: ${resort.nrLifts} </p>`;
}

/**
* Build a string literal of HTML code with information about a ski resort.
*
* @param {Object}   resort  Information of the resort
* @returns {string} A string literal with HTML code
* 
*/
function addResortTxt(resort, snowReport, forecastReport){ 

    if(resort === undefined){
        return(`<h2>Something is wrong</h2>
        <p>Unfortunately we could not fetch any resort information. 
        Please let us know that this happend!</p>`);
    }
    
    let txt = 
        `<h2 class = "text-center">${resort.name}</h2>
        <p>${resort.info}</p>
        <hr class="block-divider">
        <div>
            <h5 class="text-center">Weather at top`;
    
    if (forecastReport === undefined) {
        txt += `: </h5>
        <div>
        <p>At the moment our provider of information can not
        give us weather information for ${resort.name}.</p>
        <p>Sometimes it helps to reload the page!</p>
        <p> Notice that usually is information 
        for other resorts in place. Check by clicking on other resorts 
        marker.</p>
        </div>`;
    }
    else {
        let forecast = forecastReport.forecast;

        txt += ` ${forecast[1].date}:</h5>
            <div class = "flex-container justify-content-center">`;
        
        for (let i = 1; i < 4 ; i++){ 
            txt += `<div class = "forecast"> 
                        ${forecast[i].time}<br>
                        <img src="assets/images/weather/
                        ${forecast[i].upper.wx_icon}"> <br>
                        ${forecast[i].upper.temp_avg_c}&#8451<br>
                        ${forecast[i].upper.windspd_avg_ms}m/s
                    </div>`;
        }
    }

    txt+=  `</div>
        </div>
        <hr class="block-divider"> 
        <div>
        <h5 class="text-center">Snow Report</h5>`;

    if (snowReport === undefined){
        txt += `<p>At the moment our provider of information can not
        give us the snow report for ${resort.name}.</p>
        <p>Sometimes it helps to reload the page!</p>
        <p> Notice that usually is information 
        for other resorts in place. Check by clicking on other resorts 
        marker.</p>`;
    }
    else {
        txt += `<div class="text-center"><p><small>New snow:</small> 
                ${snowReport.newsnow_cm}<br>
                <small>Last snow:</small> ${snowReport.lastsnow}<br>
                <small>Runs open:</small> ${snowReport.pctopen}%<br>
                <small>Snow report:</small> ${snowReport.conditions} </p></div>`
    }

    txt += `</div>
            <div class="text-center"><a href=${resort.homePage} 
                target="_blank">More info</a></div>`;
        
    return txt;           
}

/**
* Put a marker at a certain position in the map. It also connects an InfoWindow
* to the marker. When user clicks on marker the 
* InfoWindow is shown and text besides the map is changet to represent the 
* current resort.
*
* @param {Object}   resort  Contains information of the ski resort
* @param {Object}   snowReport Contains updated snowreport for resort
* @param {Object}   forecastReport Contains an updated forecast for resort
*
* @returns {Object} Resort map marker
* 
*/
function buildMarker(resort, snowReport, forecastReport){  
     
    let infoWindow = new google.maps.InfoWindow({content: 
        contentInfoWindow(resort)});
     
    let marker = new google.maps.Marker({position: resort.position, 
        icon:"assets/images/yellow-marker48.gif"});
     
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
        $("#resort-info").css("background-color","#ffffff");
        $("#resort-info").html(addResortTxt(resort, snowReport, forecastReport)
        );
    });   

    return marker;
}

/** Get map marker for a ski resort 
 * @{Object} weatherInfo Contains snowreport and forecast for resort
 * @{number} index  Index of resort that weatherinformation is valid for.
 * 
 * @returns {Objec} A google map marker
*/
function resortMarker(weatherInfo, index){
    let snowReport = weatherInfo[0];
    let forecastReport = weatherInfo[1];
    let resort = resorts[index];
    
    return buildMarker(resort, snowReport, forecastReport);
} 
 
/** 
 * Make a google map marker for each resort and using googles MarkerClusterer
 * to put markers, that are close to one another, in clusters. 
 * The resorts are fetched from a file.
 * Snowreport and forecast, respectively, are fetched from Weather Unlockeds 
 * API. 
 */
function putResortMarkersInMap(){ 
    
    fetchResortInfo(resortsURL)
    .then( allResorts => {  
        resorts = allResorts;
        return Promise.all( resorts.map(resort => 
            Promise.all([fetchSnowInfo(resort.id), 
                fetchForecastInfo(resort.id)]))); 
    })
    .then( resortsInfo => {clustersOfMarkers = 
        new MarkerClusterer(map, resortsInfo.map(resortMarker), 
            {imagePath: 'assets/images/m'});})
    .catch( error => {console.error("Error:", error);}); 
} 

/**
* Creates a map with markers for ski resorts in the page. 
*
*/
function initMap(){ 
    map = new google.maps.Map(document.getElementById("map"), 
        {
            zoom: 3,
            center: {lat: 45.297309, lng: 6.579732}
        }
    );
    putResortMarkersInMap();
    $("#map-loading").html(``);
}