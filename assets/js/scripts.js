let map; 
let resortsInMap = [];
const mapIcon = "assets/images/yellow-marker48.gif";
 
const resortsURL = "assets/data/resorts.json"; 
const weatherFrontURL = `https://api.weatherunlocked.com/api/`;
const weatherEndURL = 
    `app_id=754144cc&app_key=108769d13601e41f8dfeb934ee961859`;
 
/**
 * Constructor for ResortInMap
 */
function ResortInMap(resort){
    this.id = resort.id;
    this.name = resort.name;
    this.info = resort.info;
    this.position = resort.position;
    this.altitudeB = resort.altitudeB;
    this.altitudeT = resort.altitudeT;
    this.pists = resort.pists;
    this.nrLifts = resort.nrLifts;
    this.homePage = resort.homePage;

    this.getId = () => this.id;

    /**
    * Build a string literal of HTML code for the content of a infoMarker. The
    * infoMarker is connected to marker for this resort.
    * 
    * @returns {string} A string of HTML code. 
    */
    this.contentInfoWindow = () => {
        return `<h5>${this.name}</h5>
            <p>Alt base: ${this.altitudeB}<br>
            Alt top: ${this.altitudeT}<br>
            Slopes: ${this.pists}<br>
            Nr of lifts: ${this.nrLifts} </p>`;
    };

    /**
    * Build a string literal of HTML code with information about the resort.
    *
    * @param {Object}   snowReport  Information of snow conditions
    * @param {Object}   forecastReport  Weather forecast
    * @returns {string} A string of HTML code
    *
    */
    this.addResortTxt = (snowReport, forecastReport) => {
        let txt =
            `<h2 class = "text-center">${this.name}</h2>
            <p>${this.info}</p>
            <hr class="block-divider">
            <div>
                <h5 class="text-center">Weather at top`;

        if (forecastReport === undefined) {
            txt += `: </h5>
            <div>
            <p>At the moment our provider of information can not
            give us weather information for ${this.name}.</p>
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
            for (let i = 1; i < 4; i++){
                txt += `<div class = "forecast">
                    ${forecast[i].time}<br>
                    <img src="assets/images/weather/${forecast[i].upper.wx_icon}">
                    <br>${forecast[i].upper.temp_avg_c}&#8451<br>
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
            give us the snow report for ${this.name}.</p>
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
                    <small>Snow report:</small> ${snowReport.conditions} </p></div>`;
        } 
        txt += `</div>
                <div class="text-center"><a href=${this.homePage}
                    target="_blank">More info</a></div>`;

        return txt;
    };

    /**
    * Put a marker at resorts position in map and connect an InfoWindow
    * to the marker. When user clicks on marker the
    * InfoWindow is shown and also information about resort is shown
    * beside the map.
    *
    * @param {Object}   snowReport Contains updated snowreport for resort
    * @param {Object}   forecastReport Contains an updated forecast for resort 
    * @returns {Object} Resorts marker
    *
    */
    this.buildMarker = (snowReport, forecastReport) => {
        let infoWindow = new google.maps.InfoWindow({content:
            this.contentInfoWindow()});
        let marker = new google.maps.Marker({position: this.position,
            icon: mapIcon});

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
            $("#resort-info").css("background-color","#ffffff");
            $("#resort-info").html(this.addResortTxt(snowReport, forecastReport));
        });

        return marker;
    };
} 

/**
 * Fetches information from json file.
 *
 * @param {String} url the files url
 * @returns {Promise} resorts
 */
function fetchResortInfo(url){
    return fetch(url).then( (res) => {
            if (!res.ok) {
                console.log(
                    "Something went wrong when fetching information, status: ",
                    res.status, res.statusText);
            }
            return res.json();
        })
        .catch( (error) => console.log("Error!", error));
}

/**
 * Fetches snowreport for a specific resort from Weahter Unlocked
 *
 * @param {number} resortId Resorts id in Weather Unlocked API
 *
 * @returns {Promise} snowreport
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
 * @returns {Promise} forecast
 */
function fetchForecastInfo(resortId){
    let forecastURL = weatherFrontURL+
        `resortforecast/${resortId}?hourly_interval=6&`+weatherEndURL;
    
    return fetchResortInfo(forecastURL);
}
 
/** 
 * Get map marker for a ski resort
 * 
 * @param {Object} weatherInfo Contains snowreport and forecast for resort
 * @param {number} index  Index of resort in ratedList that weatherInfo
 *                        is valid for.
 * @returns {Objec} A google map marker
 */
function getMarker(weatherInfo, index){
    let snowReport = weatherInfo[0];
    let forecastReport = weatherInfo[1];
    let resort = resortsInMap[index];

    return resort.buildMarker(snowReport, forecastReport);
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
        allResorts.forEach((resort) => {
            resortsInMap.push(new ResortInMap(resort)); 
        });
        return Promise.all(resortsInMap.map(resort =>
            Promise.all([fetchSnowInfo(resort.getId()),
                fetchForecastInfo(resort.getId())])));
    })
    .then( resortsInfo => {
        const clustersOfMarkers =
            new MarkerClusterer(map, resortsInfo.map(getMarker),
            {imagePath: "assets/images/m"});})
    .catch( error => {console.error("Error:", error);});
}

/**
* Creates a map with markers for ski resorts. 
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
 
$(document).ready(emailjs.init("user_cnNZR4MUEsDbHZ4M6sFAo")); 
 
$(".js-collapse").on("click", function () { 
  $(".navbar-collapse").collapse("hide");
}); 
 
$("#mail-form").submit( () => {
    $("#mail-sending").html(`<img src="assets/css/loader.gif" alt="loading..."/>
                            <span>sending mail...</span>`);
    emailjs.sendForm("gmail","skiers_destinations", "#mail-form")
    .then( () => {
        $("#mail-feedback").modal();
        $(".modal-title").html(`<strong>Your email is sent</strong>`);
        $(".modal-body").html(`<p>We will read it during the day.</p>
                            <p>Thank you for contributing to this page!</p>`);
        $("#mail-form").trigger("reset");
        $("#mail-sending").html(``);
    }, (error) => {
        $("#mail-feedback").modal();
        $(".modal-title").html(`<strong>Error</strong>`);
        $(".modal-body").html(`<p>Unfortunately we could not send the mail.</p>
                                    <p>Please contact the programmer!</p>`);
        $("#mail-form").trigger("reset");
        $("#mail-sending").html(``);
        console.log(error);
    });
    return false;
}); 