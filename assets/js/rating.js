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
     * @param {number} grade Value to be represented by stars in HTML code.
     *
     * @returns {literal} HTML code
     */
    this.starsToHTML = (grade) => {
        let starsHTML =``;
        let fullStars = 0;
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
        let voteHTML = `<label for = ${id}>Select grade!:</label>
                    <select name = ${id} id=${id}>
                        <option value=0></option>`;
        for (let i=5; i>0; i--){
            voteHTML += `<option value=${i}>${i}</option>`;
        }    

        voteHTML += `</select>`;
    return  voteHTML;
    }
    /**
    * HTML code for resort with rating, used when viewport is small or less.
    *
    * @param {number} rowIndex Indicates were in a table this information 
    *                          belongs 
    *
    * @returns {string} HTLM code
    */ 
    this.rowToSmallHTML = (rowIndex) => {
        let rowHTML = `
            <div class="row">
                <div class ="col-12">
                    <h4>Nr ${rowIndex+1}: ${this.name}</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <h5>Rating average:</h5>`
        rowHTML += this.starsToHTML(this.rating);
        rowHTML += `<p> ${this.rating.toFixed(2)}</p>`;
        rowHTML += `</div>
                    <div id = class="col-6">
                        <h5>Your rating:</h5>`;
        if (this.lastVote == 0) {
            let id = "gradeIndex" + rowIndex;
            rowHTML += this.noVoteHTML(id);  
        }
        else {
            rowHTML += this.starsToHTML(this.lastVote);
            rowHTML += `<p> ${this.lastVote}</p>`;
        }

        rowHTML +=  `</div>
                    </div>`;

        return rowHTML;
    }

    /**
    * HTML code for resort with rating, used when viewport is medium or larger.
    *
    * @param {number} rowIndex Indicates were in a table this information 
    *                          belongs 
    *
    * @returns {string} HTLM code
    */ 
     this.rowToHTML = (rowIndex) => {
        let rowHTML = `<td>${rowIndex+1}</td>
                        <td>${this.name}</td>
                        <td>`;

        rowHTML += this.starsToHTML(this.rating);
        rowHTML += `<span> ${this.rating.toFixed(2)}</span>`;

        rowHTML += `</td> 
                     <td> 
                        <div>`;

        if (this.lastVote == 0) {
            let id = "gradeIndex" + rowIndex;
            rowHTML += this.noVoteHTML(id);  
        }
        else {
            rowHTML += this.starsToHTML(this.lastVote);
            rowHTML += `<span> ${this.lastVote}</span>`;
        }

        rowHTML += `   </div>
                        </td>`;
    
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
        if(smallViewport)
            $(id).html(this.rowToSmallHTML(rowIndex));
        else
            $(id).html(this.rowToHTML(rowIndex));
        
        if (this.lastVote == 0) {
            $(`#gradeIndex${rowIndex}`).change({index : rowIndex} , 
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
    
    this.frameworkToSmallDocument = () => {
        let toHTML = ``;
        for (let i=0; i<this.list.length; i++) {
            if (i%2===0){
                toHTML += `
                <div id="index${i}" class="bgr-blue rounded-corners pt-2 mb-2">
                </div>`
            }
            else{
                toHTML += `<div id="index${i}" class="border-blue pt-2 mb-2">
                </div>`
            }    
        }
        return toHTML;
    }

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
    }
}

let ratedList = new RatedList(); 
$(document).ready(ratedList.toDocument(sizeViewport));

sizeViewport.addListener(ratedList.toDocument);