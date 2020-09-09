/* Header-section----------------------------------------------------------- */
$(".js-collapse").on("click", function () {
  $(".navbar-collapse").collapse("hide");
});
/* End header-section ------------------------------------------------------ */

/* Map-section ------------------------------------------------------------- */
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
 * @returns {Promise} resorts
 */
function fetchResortInfo(url){
    return fetch(url)
        .then( (res) => res.json())
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
            {imagePath: "assets/images/m"});})
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
/* End map-section --------------------------------------------------------- */

/* Recommend-section ------------------------------------------------------- */
let sizeViewport = window.matchMedia("(max-width: 767px)");

/**
 * Constructor function for RatedResort
 */
function RatedResort( name, rating, nrOfVotes, lastVote){
    this.name = name;
    this.rating = rating;
    this.nrOfVotes = nrOfVotes;
    this.lastVote = lastVote;

    this.getRating = () => this.rating;
    this.setLastVote = (vote) => {this.lastVote = vote};

    /**
     * Returns a string literal of HTML code that contains stars representing
     * the value of the input parameter.
     *
     * @param {number} grade Value to be represented with stars in HTML code.
     *
     * @returns {string} HTML code
     */
    this.starsToHTML = (grade) => {

        let starsHTML =``;
        let fullStars = 0;

        if( grade===undefined || grade===null || typeof(grade)!="number"){
            console.log(
    "Error in starsToHTML, parameter has not got a value or is not a number");
            return("Error");
        }

        if (grade<1 || grade>5){
            console.log(
                "Error in function starsToHTML, grade is out of range");
            return("Error");
        }

        let rest = grade%1;

        if (rest >= 0.75){
            fullStars = Math.ceil(grade);
        }
        else {
            fullStars = Math.floor(grade);
        }

        for (let i=0; i<fullStars; i++){
            starsHTML += `<span class="fas fa-star yellow"></span>`;
        }

        if ((rest > 0.25) && (rest < 0.75)){
            starsHTML +=`<span class="fas fa-star-half-alt yellow"></span>`;
            fullStars++;
        }

        for (let i=fullStars; i<5; i++){
            starsHTML += `<span class="far fa-star yellow"></span>`;
        }

        return starsHTML;
    }
    /**
     * Returns HTML code with scrolldown of numbers 1 to 5.
     *
     * @param {string} id Place in DOM to insert the HTML code.
     *
     * @returns {literal} HTML code
     */
    this.noVoteHTML = (id) => {
        let voteHTML = `<label for = ${id}>Pick grade!:</label>
                    <select name = ${id} id=${id}>
                        <option value=0></option>`;
        for (let i=5; i>0; i--){
            voteHTML += `<option value=${i}>${i}</option>`;
        }

        voteHTML += `</select>`;
        return  voteHTML;
    }

    /**
    * HTML code for resort with rating, used when viewport is medium or larger.
    *
    * @param {number} rowIndex Indicates were in a table this information
    *                          belongs
    * @param {boolean} smallViewport Indicates if it is a viewport with small
    *                                 width
    *
    * @returns {string} HTLM code
    */
     this.rowToHTML = (rowIndex, smallViewport) => {
        let rowHTML = ``;
        if (smallViewport){
            rowHTML += `
                <div class="row">
                    <div class ="col-12">
                        <h4>Nr ${rowIndex+1}: ${this.name}</h4>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <h5>Rating average:</h5>`
        }
        else{
            rowHTML += `<td>${rowIndex+1}</td>
                        <td>${this.name}</td>
                        <td>`;
        }
        rowHTML += this.starsToHTML(this.rating);

        if (smallViewport){ rowHTML += `<p>`}
        else { rowHTML += `<span>`}

        rowHTML += `${this.rating.toFixed(2)}`

         if (smallViewport){ rowHTML += `
                    </p>
                </div>
                <div id = class="col-6">
                    <h5>Your rating:</h5>`;
        }
         else { rowHTML += `</span>
                </td>
                     <td>
                        <div>`};

        if (this.lastVote === 0) {
            let id = "gradeIndex" + rowIndex;
            rowHTML += this.noVoteHTML(id);
        }
        else {
            rowHTML += this.starsToHTML(this.lastVote);
            if (smallViewport){rowHTML += `<p>`}
            else {rowHTML += `<span> `}
            rowHTML += `${this.lastVote}`;
            if (smallViewport){rowHTML += `</p>`}
            else {rowHTML += `</span> `}
        }

        if(smallViewport){rowHTML +=
                        `</div>
                    </div>`;}
        else{
            rowHTML += `   </div>
                        </td>`;}

     return rowHTML;
    }
    /**
     * Put information about this resorts rating in the document.
     *
     * @param {number} rowIndex Indicates where in a table information belongs
     * @param {boolean} smallViewport Indicates if current viewport is small
     */
    this.toDocument = (rowIndex, smallViewport) => {
        let id = "#index"+rowIndex;

        $(id).html(this.rowToHTML(rowIndex, smallViewport));

        if (this.lastVote === 0) {
            $(`#gradeIndex${rowIndex}`).change({index : rowIndex},
                ratedList.updateList);
        }
    }
    /**
    * Update rating of resort with the last vote
    *
    * @param {number} vote The value of a new vote to be added to the rating.
    */
    this.calculateNewRating = (vote) => {
        if (typeof(this.rating)!="number" || typeof(this.nrOfVotes)!="number"
            || typeof(vote)!="number"){
            console.log(
                "Error in function calcNewRating, variables of wrong type");
            return("Error");
        }
        if(vote<1 || vote>5){
            console.log(
                "Error in function calculateNewRating, vote is out of range");
            return("Error");
        }

        this.rating = (this.rating*this.nrOfVotes++ +vote)/(this.nrOfVotes);
        this.lastVote = vote;
    }
}

/**
 * Constructor function for RatedList
 */
function RatedList(){
    this.fetchInitList = () => {
        let list =[];
        list.push(new RatedResort("Bad Gastein", 0.0, 0, 0));
        list.push(new RatedResort("Charmonix", 0.0, 0, 0));
        list.push(new RatedResort("Cortina d'Ampesso", 0.0, 0, 0));
        list.push(new RatedResort("Trysil", 0.0, 0, 0));
        list.push(new RatedResort("Val d'Isere", 0.0, 0, 0));
        list.push(new RatedResort("Val Thorens", 0.0, 0, 0));
        list.push(new RatedResort("Verbier", 0.0, 0, 0));
        list.push(new RatedResort("Zermatt", 0.0, 0, 0));
        list.push(new RatedResort("Zugspitze", 0.0, 0, 0));
        list.push(new RatedResort("Åre", 0.0, 0, 0));

        return list;
    }
    /**
     * Get lists values form localStorage or if not in localStorage starts
     * a new list.
     *
     * @returns {Object} An array of RatedResort
     */
    this.getList =  () => {
        let list = [];
        let table = JSON.parse(localStorage.getItem("ratingTable"));
        if (table === null) {return this.fetchInitList();}

        table.forEach(item => {list.push(new RatedResort(item.name,
            item.rating, item.nrOfVotes, 0))} );
        return list;
    }

    this.list = this.getList();

    /**
     * The skeleton of the list is made into HTML code. Applies to small
     * screens.
     *
     * @returns {string} The HTML code
     */
    this.frameworkToSmallDocument = () => {
                let toHTML = ``;
        for (let i=0; i<this.list.length; i++) {
            if (i%2 === 0){
                toHTML += `
                <div id="index${i}" class="bgr-blue border-blue rounded-corners
                 pt-2 mb-2">
                </div>`
            }
            else{
                toHTML += `<div id="index${i}" class="border-blue pt-2 mb-2">
                </div>`
            }
        }
        return toHTML;
    }
    /**
     * The skeleton of the list is made into HTML code. Applies to small
     * screens.
     *
     * @returns {string} The HTML code
     */
    this.frameworkToDocument = () => {
        let toHTML = `
            <table class = "table table-hover">
                <caption>Top-10 Ski Resorts</caption>
                <thead class="bgr-blue">
                    <tr>
                        <th>Nr</th>
                        <th>Resort</th>
                        <th>Rating average</th>
                        <th>Your rating</th>
                    </tr>
                    </thead>
                    <tbody>`;

        for (let i=0; i<this.list.length; i++){
            toHTML += `<tr id = "index${i}"></tr>`;
        }
        toHTML += `  </tbody>
                </table>`;
        return toHTML;
    }
    /**
     * Put the information in the RatedList into the document.
     */
    this.toDocument = (sizeViewport) => {
        let smallViewport = sizeViewport.matches;

        if (smallViewport) $("#top-ten").html(this.frameworkToSmallDocument());
        else $("#top-ten").html(this.frameworkToDocument());

        this.list.forEach( (ratedResort, index) => {
                ratedResort.toDocument(index, smallViewport);
            });
    }
    /**
     * Save information to localStorage.
     */
    this.toLocalStorage = () => {
        let table = this.list;
        localStorage.setItem("ratingTable", JSON.stringify(table));
    }
    /**
     * Updates RatingList when a new vote is entered
     */
    this.updateList = (event) => {
        this.list[event.data.index].calculateNewRating(
            parseInt(event.target.value));
        this.list.sort((resortA,resortB) => {
            return resortB.getRating()-resortA.getRating();});
        this.toDocument(sizeViewport);
        this.toLocalStorage();
        /*Thanks to https://stackoverflow.com/users/92315/fabien-m%c3%a9nager
         :*/
        location.href = "#recommend";
    }
}

let ratedList = new RatedList();
$(document).ready(ratedList.toDocument(sizeViewport));

sizeViewport.addListener(ratedList.toDocument);
/* End recommend-section --------------------------------------------------- */

/* Details-section --------------------------------------------------------- */
$(document).ready( () => {
    $("#responsive-slick").slick({
        infinite: true,
        dots: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        arrows: false,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
            },
            {
            breakpoint: 770,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
            },
            {
            breakpoint: 500,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    })
})
$(".left").click(function(){
  $("#responsive-slick").slick("slickPrev");
})

$(".right").click(function(){
  $("#responsive-slick").slick("slickNext");
})
/* End details-section ----------------------------------------------------- */

/* Mail-section ------------------------------------------------------------ */
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
                                    <p>Please try again!</p>`);
        $("#mail-sending").html(``);
        console.log(error);
    });
    return false;
});

emailjs.init("user_cnNZR4MUEsDbHZ4M6sFAo");
/* End mail-section -------------------------------------------------------- */