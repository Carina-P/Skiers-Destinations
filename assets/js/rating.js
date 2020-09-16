let ratedList = new RatedList(CurrentRatingList());

let sizeViewport = window.matchMedia("(max-width: 767px)");
sizeViewport.addListener(ratedList.toDocument);
let ratingSubmitted = false;

/** 
 * Constructor function for RatedResort
 */
function RatedResort( name, rating, nrOfVotes, lastVote){
    this.name = name;
    this.rating = rating;
    this.nrOfVotes = nrOfVotes;
    this.lastVote = lastVote;

    this.getName = () => this.name;
    this.getLastVote = () => this.lastVote;
    this.getRating = () => this.rating;
    this.setLastVote = (vote) => {this.lastVote = vote;};
    
    /**
     * Controls if user has casted av vote.
     * 
     * @returns {boolean} True if user has casted a vote
     */
    this.hasVoted = () => {return (this.lastVote > 0 && this.lastVote <= 5)};

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
            starsHTML += `<span class="fas fa-star yellow" aria-hidden="true">
            </span>`;
        } 
        if ((remainder > 0.25) && (remainder < 0.75)){
            starsHTML +=`<span class="fas fa-star-half-alt yellow" 
            aria-hidden="true"></span>`;
            fullStars++;
        } 
        for (let i = fullStars; i < 5; i++){
            starsHTML += `<span class="far fa-star yellow" aria-hidden="true">
            </span>`;
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

        let voteHTML = `<label for = ${id}>Pick grade:</label>
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

        rowHTML += ` ${this.rating.toFixed(2)}`;

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
            if (ratingSubmitted){
                rowHTML += `No vote casted`;
            }
            else {
                let id = "gradeIndex" + rowIndex;
                rowHTML += this.noVoteHTML(id);
            }
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
        if (this.lastVote === 0 && !ratingSubmitted) {
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

    this.getList = () => {return this.list;};
 
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
                toHTML += `<div id="index${i}" 
                class="border-blue rounded-corners pt-2 mb-2"> </div>`;
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
     * Put RatedLists information into the document. The list is sorted
     * before written in document.
     */ 
    this.toDocument = () => {
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

        this.list.sort((resortA,resortB) => {
            return resortB.getRating()-resortA.getRating();});

        if (smallViewport) $("#top-ten").html(this.frameworkToSmallDocument());
        else $("#top-ten").html(this.frameworkToDocument());

        this.list.forEach( (ratedResort, index) => {
                ratedResort.toDocument(index, smallViewport);
        });
    };
    
    /** 
     * Updates RatingList when a new vote is entered
     */
    this.updateList = (event) => {
        this.list[event.data.index].calculateNewRating(
            parseInt(event.target.value)); 
        this.toDocument();
    }; 
    /**
     * Returns true if user has not casted new vote for any resort in the list
     * 
     * @returns {boolean} Indicates if votes are not casted
     */
    this.noVotesCasted = () => {
        let notVoted = true;
        this.list.forEach((resort) => {
            if (resort.hasVoted()){
                notVoted = false;
            }
        })

        return notVoted;
    };
} 

/**
 *  Current list of rated resorts
 *  
 *  @returns {Object} An array of rated resorts
 */
function CurrentRatingList(){
    let list =[];
    list.push(new RatedResort("Bad Gastein", 3.0, 2, 0));
    list.push(new RatedResort("Charmonix", 4.0, 3, 0));
    list.push(new RatedResort("Cortina d'Ampesso", 2.75, 4, 0));
    list.push(new RatedResort("Trysil", 3.0, 1, 0));
    list.push(new RatedResort("Val d'Isere", 4.8, 7, 0));
    list.push(new RatedResort("Val Thorens", 4.9, 10, 0));
    list.push(new RatedResort("Verbier", 4.5, 4, 0));
    list.push(new RatedResort("Zermatt", 4.2, 5, 0));
    list.push(new RatedResort("Zugspitze", 2.0, 1, 0));
    list.push(new RatedResort("Åre", 2.6, 5, 0));

    return list;
}

 
$(document).ready(ratedList.toDocument());
$("#submit-rating-btn").click( () => { 
    if (ratedList.noVotesCasted()){
        $("#mail-feedback").modal();
        $(".modal-title").html(`<strong>No votes</strong>`);
        $(".modal-body").html(`<p>You have not rated any resorts</p>`);
    }
    else {
        $("#submit-rating").html(`<img src="assets/css/loader.gif" 
            alt="loading..."/><span>sending mail...</span>`);

        let list = ratedList.getList();
        let parameters = {
            name0: list[0].getName(), vote0: list[0].getLastVote(),
            name1: list[1].getName(), vote1: list[1].getLastVote(),
            name2: list[2].getName(), vote2: list[2].getLastVote(),
            name3: list[3].getName(), vote3: list[3].getLastVote(),
            name4: list[4].getName(), vote4: list[4].getLastVote(),
            name5: list[5].getName(), vote5: list[5].getLastVote(),
            name6: list[6].getName(), vote6: list[6].getLastVote(),
            name7: list[7].getName(), vote7: list[7].getLastVote(),
            name8: list[8].getName(), vote8: list[8].getLastVote(),
            name9: list[9].getName(), vote9: list[9].getLastVote()
        };
        emailjs.send("gmail","template_hc0lfh3", parameters)
        .then(() => {
            $("#mail-feedback").modal();
            $(".modal-title").html(`<strong>Your email is sent</strong>`);
            $(".modal-body").html(`<p>Thank you very much!</p>
                <p>We will add your rating to the average as soon as possible.
                </p>`);
            $("#submit-rating").html(`Thank you for the votes! We will add them as 
            soon as possible.`);
        }, (error) => {
            $("#mail-feedback").modal();
            $(".modal-title").html(`<strong>Something is wrong</strong>`);
            $(".modal-body").html(`<p>Unfortunately we could not send the mail.
                </p>`);
            $("#submit-rating").html(``);
            console.log("Error:", error)}
        );
        ratingSubmitted = true;
        ratedList.toDocument();
    }
})