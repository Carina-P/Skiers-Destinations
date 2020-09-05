let map;

const resortsURL = "assets/data/resorts.json";
const weatherFrontURL = `https://api.weatherunlocked.com/api/`;
const weatherEndURL = `app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`; 

const fetchResortInfo = (url) => {
    return fetch(url)
        .then( res => res.json())
        .catch( error => console.log("Error!", error));
};
 
const fetchSnowInfo = (resort) => {
    let snowReportURL = weatherFrontURL+`snowreport/${resort.id}?`+weatherEndURL;
    return fetchResortInfo(snowReportURL);
}

const fetchForecastInfo = (resort) => {
    let forecastURL = weatherFrontURL+`resortforecast/${resort.id}?hourly_interval=6&`+weatherEndURL;
    return fetchResortInfo(forecastURL);
}

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
 
    if ((resort.forecast==undefined) || (resort.snowReport==undefined)){
        return(`At the moment our providor of snow and weather information can not
        give information about ${resort.name}. Please pick another reasort by clicking on
        marker in the map! <br> You can also try to reload the page.`);
    }

    let forecastTxt = 
        `<h2 class = "text-center">${resort.name}</h2>
        <p>${resort.info}</p>
        <hr class="block-divider"> 
        <div>
            <h3 class="text-center">Forecast at top: ${resort.forecast[1].date}</h3>
            <div class = "flex-container">`;
     
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
        <hr class="block-divider"> 
        <div>
                <h3 class="text-center">Snow Report</h3>
                <p><small>New snow:</small> ${resort.snowReport.newsnow_cm}<br>
                <small>Last snow:</small> ${resort.snowReport.lastsnow}<br>
                <small>Runs open:</small> ${resort.snowReport.pctopen}%<br>
                <small>Snow report:</small> ${resort.snowReport.conditions} </p>
            </div>
            <div><br><a href=${resort.homePage} target="_blank">More info</a></div>`;

    
    return forecastTxt;           
}

/**
* Put a marker at a certain position in the map. It also connects an InfoWindow
* to the marker. When user clicks on marker the 
* InfoWindow is shown and text besides the map is changet to represent the 
* current resort.
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
        if (resort.fetchSnowOK) {
            $("#place-txt").html(txtResortToHTML(resort));
        }
        else {
            $("#place-text").html(`At the moment our providor of snow and weather information can not
            give information about ${resort.name}. Please pick another reasort by clicking on
            marker in the map! <br> You can also try to reload the page.`);
        }
    });

    return marker;
}

/**
* Fetches snowreport and forecast for a ski resort, from Wheather Unlocked API.
*
* @param {Object}   resort  Information of the ski resort.
* @returns {Object} A map marker
* 
*/

function getResortInfo(resort)
{
    Promise.all([fetchSnowInfo(resort),fetchForecastInfo(resort)])
    .then (result => {
        resort.snowReport = result[0];
        resort.forecast = result[1].forecast;
        resort.marker = buildMarker(resort); 
    })
    .catch (error => console.log("Error: ", error));
}

/* function getResortInfo(resort) {
   
    let urlUW1 = `https://api.weatherunlocked.com/api/`;
    let urlUW2 =  `/${resort.id}?`;
    let urlUW3 = 

    $.ajax(urlUW1 + `snowreport` + urlUW2 + urlUW3)
        .done( snowData => {
            resort.snowReport = snowData;
            $.ajax(urlUW1 + `resortforecast` + urlUW2 + `hourly_interval=6&` + urlUW3)
                .done( forecastData => {
                    resort.forecast = forecastData.forecast;
                })
                .fail((xhr, status) => console.log('error:', xhr, `status:`,status));
        })
        .fail((xhr, status) => {
            console.log('error:', xhr, `status:`, status);
        });

    
    return buildMarker(resort); 
} */


/**
 * Make a marker in the map for each resort and make cluster(s) if markers
 * are close. 
 * The resorts are fetched from a file. 
 * Using googles MakerClusterer to put markers close to each other in clusters.
 *
 */
function putResortMarkersInMap(){
     
    let resorts = [];
    fetchResortInfo(resortsURL)
    .then( resortsInfo => { 
        resorts = resortsInfo;
        let markers = resorts.map(resort => buildMarker(resort));
        let markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});
    })  
    .catch((error) => console.error("Error:", error)); 
}
/*
function putMarkersInMap(){ 
    fetch("assets/data/resorts.json")
    .then( res => res.json())
    .then( resorts => resorts.map(getResortInfo))  
    .then ( (markers) => {
        let clusterOfMarkers = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});
    })
    .catch((error) => console.error("Error:", error))
}*/

/**
* Inits and puts a map with markers, in MarkersCluster, in the page. 
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
}