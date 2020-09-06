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
} 