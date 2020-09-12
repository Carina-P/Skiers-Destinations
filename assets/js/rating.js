let ratedList = new RatedList(getRatingList());

let sizeViewport = window.matchMedia("(max-width: 767px)"); 
sizeViewport.addListener(ratedList.toDocument);

/** 
 * Constructor function for RatedResort
 */
function RatedResort( name, rating, nrOfVotes, lastVote){
    this.name = name;
    this.rating = rating;
    this.nrOfVotes = nrOfVotes;
    this.lastVote = lastVote;

    this.getRating = () => this.rating;
    this.setLastVote = (vote) => {this.lastVote = vote;};

    /**
     * Returns a string literal of HTML code that contains stars representing
     * the value of the input parameter.
     *
     * @param {number} grade Value to be represented with stars in HTML code.
     *
     * @returns {string} HTML code
     */
    this.starsToHTML = (grade) => { 
        let starsHTML = ``;
        let fullStars = 0;
        
        if (grade === null || grade === undefined) {
            console.log(
                "Error in function starsToHTML, grade undefined");
                return "Error";
        }
        if (typeof(grade) !== "number") {
            console.log(
                "Error in function starsToHTML, grade is not a number");
                return "Error";
        }
        if (grade < 0 || grade > 5) {
            console.log(
                "Error in function starsToHTML, grade is not in right range");
                return "Error";
        }

        let remainder = grade%1;

        if (remainder >= 0.75){
            fullStars = Math.ceil(grade);
        }
        else {
            fullStars = Math.floor(grade);
        }

        for (let i = 0; i < fullStars; i++){
            starsHTML += `<span class="fas fa-star yellow"></span>`;
        }

        if ((remainder > 0.25) && (remainder < 0.75)){
            starsHTML +=`<span class="fas fa-star-half-alt yellow"></span>`;
            fullStars++;
        }

        for (let i = fullStars; i < 5; i++){
            starsHTML += `<span class="far fa-star yellow"></span>`;
        }

        return starsHTML;
    };
    /**
     * Returns HTML code with scrolldown of numbers 1 to 5.
     *
     * @param {String} id Place in DOM to insert the HTML code. 
     * @returns {string} HTML code
     */
    this.noVoteHTML = (id) => {
        if (!id) {
            console.log(
                "Error in function noVoteHTML, id undefined");
                return "Error";
        }
        if (typeof(id) !== "string") {
            console.log(
                "Error in function noVoteHTML, id of wrong type");
                return "Error";
        }

        let voteHTML = `<label for = ${id}>Pick grade!:</label>
                    <select name = ${id} id=${id}>
                        <option value=0></option>`;
        for (let i = 5; i > 0; i--){
            voteHTML += `<option value=${i}>${i}</option>`;
        }

        voteHTML += `</select>`;
        return  voteHTML;
    };

    /**
    * HTML code for resort and its rating.
    *
    * @param {number} rowIndex Indicates were in a table this information
    *                          belongs
    * @param {boolean} smallViewport Indicates if it is a viewport with small
    *                                 width 
    * @returns {string} HTLM code
    */
     this.rowToHTML = (rowIndex, smallViewport) => {
        if (rowIndex === null || rowIndex === undefined) {
            console.log(
                "Error in function rowToHTML, rowIndex undefined");
                return "Error";
        }
        if (smallViewport === null || smallViewport === undefined){ 
            console.log(
                "Error in function rowToHTML, smallViewport undefined");
                return "Error";
        }
        if (typeof(rowIndex) !== "number" || 
            typeof(smallViewport) !== "boolean") {
            console.log(
                "Error in function rowToHTML, parameter of wrong type");
            return "Error";
        }
        
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
                        <h5>Rating average:</h5>`;
        }
        else{
            rowHTML += `<td>${rowIndex+1}</td>
                        <td>${this.name}</td>
                        <td>`;
        }
        rowHTML += this.starsToHTML(this.rating);

        if (smallViewport) {rowHTML += `<p>`;}
        else {rowHTML += `<span>`;}

        rowHTML += `${this.rating.toFixed(2)}`;

        if (smallViewport){ rowHTML += `
                    </p>
                </div>
                <div id = class="col-6">
                    <h5>Your rating:</h5>`;
        }
        else {rowHTML += `</span>
                </td>
                     <td>
                        <div>`;}

        if (this.lastVote === 0) {
            let id = "gradeIndex" + rowIndex;
            rowHTML += this.noVoteHTML(id);
        }
        else {
            rowHTML += this.starsToHTML(this.lastVote);
            if (smallViewport){rowHTML += `<p>`;}
            else {rowHTML += `<span> `;}
            rowHTML += `${this.lastVote}`;
            if (smallViewport){rowHTML += `</p>`;}
            else {rowHTML += `</span> `;}
        }

        if(smallViewport){rowHTML +=
                        `</div>
                    </div>`;}
        else{
            rowHTML += `   </div>
                        </td>`;}

        return rowHTML;
    };
    /**
     * Put information about this resorts rating in the document and adds
     * handlers to react when user casts a vote.
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
    };
    /**
    * Update rating of resort with the last vote
    *
    * @param {number} vote The value of a new vote to be added to the rating.
    */
    this.calculateNewRating = (vote) => {
        if (vote === undefined || vote === null){
            console.log(
                "Error in function calcNewRating, vote is undefined");
            return "Error";
        }
        if (typeof(vote)!=="number"){
            console.log(
                "Error in function calcNewRating, vote of wrong type");
            return "Error";
        }
        if(vote < 1 || vote > 5){
            console.log(
                "Error in function calculateNewRating, vote is out of range");
            return "Error";
        }

        this.rating = (this.rating*this.nrOfVotes++ +vote)/(this.nrOfVotes);
        this.lastVote = vote;
    };
}

/**
 * Constructor function for RatedList
 */
function RatedList(list){
    this.list = list;
 
    /** 
     * The skeleton of the list is made into HTML code. Applies to screens
     * with small width.
     *
     * @returns {string} The HTML code
     */
    this.frameworkToSmallDocument = () => {
        let toHTML = ``;

        for (let i = 0; i < this.list.length; i++) {
            if (i%2 === 0){
                toHTML += `
                <div id="index${i}" class="bgr-blue border-blue rounded-corners
                 pt-2 mb-2">
                </div>`;
            }
            else{
                toHTML += `<div id="index${i}" class="border-blue pt-2 mb-2">
                </div>`;
            }
        }

        return toHTML;
    };
    /**
     * The skeleton of the list is made into HTML code. Applies screens with
     * larger width.
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
    };
    /**
     * Put RatedLists information into the document.
     */
    this.toDocument = (sizeViewport) => {
        if (sizeViewport === undefined || sizeViewport === null){
            $("#top-ten").html("Something is wrong!");
            console.log("Error in function toDocument");
            return;
        }
        let smallViewport = sizeViewport.matches;
        if (smallViewport === undefined || smallViewport === null){
            $("#top-ten").html("Something is wrong!");
            console.log("Error in function toDocument");
            return;
        }

        if (smallViewport) $("#top-ten").html(this.frameworkToSmallDocument());
        else $("#top-ten").html(this.frameworkToDocument());

        this.list.forEach( (ratedResort, index) => {
                ratedResort.toDocument(index, smallViewport);
        });
    };
    /**
     * Save information to localStorage.
     */
    this.toLocalStorage = () => {
        let table = this.list;
        localStorage.setItem("ratingTable", JSON.stringify(table));
    };
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
        location.href = "#recommend";
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

/**
 *  An initial list of resorts
 * 
 *  @returns {Object} An array of rated resorts
 */
function fetchInitRatingList(){
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
 * Get lists values form localStorage or if not in localStorage initializes
 * a new list.
 *
 * @returns {Object} An array of RatedResort
 */
function getRatingList(){
    let list = [];
    let table = JSON.parse(localStorage.getItem("ratingTable"));
    if (table === null) {
        return fetchInitRatingList();
    }

    table.forEach(item => {list.push(new RatedResort(item.name,
        item.rating, item.nrOfVotes, 0));} );

    return list;
}

$(document).ready(ratedList.toDocument(sizeViewport));