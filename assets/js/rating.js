function RatedResort( name, rating, nrOfVotes, lastVote){
    this.name = name;
    this.rating = rating;
    this.nrOfVotes = nrOfVotes;
    this.lastVote = lastVote;

    this.getRating = () => this.rating;
    this.setLastVote = (vote) => {this.lastVote = vote};
 
/** 
* Returns a string literal of HTML code that contains stars representing the
* value of the input parameter.
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
        let voteHTML = `<label for = ${id}>My grade:</label>
                    <select name = ${id} id=${id}>
                        <option value=0></option>`;
        for (let i=5; i>0; i--){
            voteHTML += `<option value=${i}>${i}</option>`;
        }    

        voteHTML += `</select>`;
    return  voteHTML;
    }
/**
* HTML code for a this resort with rating.
*
* @param {number} rowIndex Indicates were in a table this information belongs 
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
 */
    this.toDocument = (rowIndex) => {
        let id = "#index"+rowIndex;
        $(id).html(this.rowToHTML(rowIndex));
        
        if (this.lastVote == 0) {
            $(`#gradeIndex${rowIndex}`).change({index : rowIndex} , ratedList.updateList);
        }
    }
} 