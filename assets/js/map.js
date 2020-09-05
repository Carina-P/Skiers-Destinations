let map;
let clustersOfMarkers;
let resorts;


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
function contentInfoWindow(resort){    
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
            <h3 class="text-center">Weather at top`;
    
    if (forecastReport === undefined) {
        txt += `: </h3>
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

        txt += `${forecast[1].date} :</h3>
            <div class = "flex-container">`;
        
        for (let i = 1; i < 4 ; i++){ 
            txt += `<div class = "forecast"> 
                        ${forecast[i].time}<br>
                        <img src="assets/images/weather/${forecast[i].upper.wx_icon}"> <br>
                        ${forecast[i].upper.temp_avg_c}&#8451<br>
                        ${forecast[i].upper.windspd_avg_ms}m/s
                    </div>`;
        }
    }

    txt+=  `</div>
        </div>
        <hr class="block-divider"> 
        <div>
        <h3 class="text-center">Snow Report</h3>`;

    if (snowReport === undefined){
        txt += `<p>At the moment our provider of information can not
        give us the snow report for ${resort.name}.</p>
        <p>Sometimes it helps to reload the page!</p>
        <p> Notice that usually is information 
        for other resorts in place. Check by clicking on other resorts 
        marker.</p>`;
    }
    else {
        txt += `<p><small>New snow:</small> ${snowReport.newsnow_cm}<br>
                <small>Last snow:</small> ${snowReport.lastsnow}<br>
                <small>Runs open:</small> ${snowReport.pctopen}%<br>
                <small>Snow report:</small> ${snowReport.conditions} </p>`
    }

    txt += `</div>
            <div><br><a href=${resort.homePage} target="_blank">More info</a></div>`;
        
    return txt;           
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
function buildMarker(resort, snowReport, forecastReport){  
     
    let infoWindow = new google.maps.InfoWindow({content: contentInfoWindow(resort)});
     
    let marker = new google.maps.Marker({position: resort.position, icon:"assets/images/yellow-marker48.gif"});
     
    marker.addListener("click", () => {
        infoWindow.open(map, marker);
        $("#place-txt").css("background-color","#ffffff");
        $("#place-txt").html(addResortTxt(resort, snowReport, forecastReport));
    });   

    return marker;
}

function resortMarker(weatherInfo, index){
    let snowReport = weatherInfo[0];
    let forecastReport = weatherInfo[1];
    let resort = resorts[index];
    
    return buildMarker(resort, snowReport, forecastReport);
}
/**
* Fetches snowreport and forecast for a ski resort, from Wheather Unlocked API.
*
* @param {Object}   resort  Information of the ski resort.
* @returns {Object} A map marker
* 
*/
/*
function getWeatherInfo(resorts)
{   
    Promise.all([fetchSnowInfo(resort),fetchForecastInfo(resort)])
    .then (result => {
        resort.snowReport = result[0];
        resort.forecast = result[1].forecast; 
    })
    .catch (error => console.log("Error: ", error));
    
}*/

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
    
    fetchResortInfo(resortsURL)
    .then( allResorts => {  
        resorts = allResorts;
        return Promise.all( resorts.map(resort => Promise.all([fetchSnowInfo(resort), fetchForecastInfo(resort)])));
                           /* [
                                Promise.all([fetchSnowInfo(resorts[0]), fetchForecastInfo(resorts[0])]),
                                Promise.all([fetchSnowInfo(resorts[1]), fetchForecastInfo(resorts[1])]),
                                Promise.all([fetchSnowInfo(resorts[2]), fetchForecastInfo(resorts[2])]),
                                Promise.all([fetchSnowInfo(resorts[3]), fetchForecastInfo(resorts[3])]),
                                Promise.all([fetchSnowInfo(resorts[4]), fetchForecastInfo(resorts[4])]),
                                Promise.all([fetchSnowInfo(resorts[5]), fetchForecastInfo(resorts[5])]),
                                Promise.all([fetchSnowInfo(resorts[6]), fetchForecastInfo(resorts[6])]),
                                Promise.all([fetchSnowInfo(resorts[7]), fetchForecastInfo(resorts[7])]),
                                Promise.all([fetchSnowInfo(resorts[8]), fetchForecastInfo(resorts[8])]),
                                Promise.all([fetchSnowInfo(resorts[9]), fetchForecastInfo(resorts[9])])
                            ] 
                        );*/
    })
    .then( resortsInfo => resortsInfo.map(resortMarker))
    .then( markers =>  {clustersOfMarkers = new MarkerClusterer(map, markers, {imagePath: 'assets/images/m'});})
    .catch( error => {console.error("Error:", error);}); 
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