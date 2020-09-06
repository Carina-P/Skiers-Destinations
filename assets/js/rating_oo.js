function RatedResort( name, rating, nrOfVotes, lastVote){
    this.name = name;
    this.rating = rating;
    this.nrOfVotes = nrOfVotes;
    this.lastVote = lastVote;

    this.getRating = () => this.rating;
    this.setLastVote = (vote) => {this.lastVote = vote};

    this.starsToHTML = (rating) => {
        let starsHTML =``;
        let fullStars = 0;
        let rest = rating%1;
 
        if (rest >= 0.75){
            fullStars = Math.ceil(rating);
        }
        else {
            fullStars = Math.floor(rating);
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

    this.toDocument = (rowIndex) => {
        let id = "#index"+rowIndex;
        $(id).html(this.rowToHTML(rowIndex));
        
        if (this.lastVote == 0) {
            $(`#gradeIndex${rowIndex}`).change({index : rowIndex} , ratedList.updateList);
        }
    }

    this.calulateNewRating = (vote) => {
    
        if (typeof(this.rating)!="number" || typeof(this.nrOfVotes)!="number" || typeof(vote)!="number"){
            console.log("Error in function calcNewRating, variables of wrong type");
        return("Error");
        }
 
        this.rating = (this.rating*this.nrOfVotes++ +vote)/(this.nrOfVotes);
        this.lastVote = vote; 
    }
}


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

    this.getList =  () => {
        let list = [];
        let table = JSON.parse(localStorage.getItem("ratingTable"));
        if (table === null) {return this.fetchInitList();}
        
        table.forEach(item => {list.push(new RatedResort(item.name, item.rating, item.nrOfVotes, 0))} );
        return list;
    }
    
    this.list = this.getList();
    
    
    this.toDocument = () => {
        this.list.forEach( (ratedResort, index) => { ratedResort.toDocument(index);});
    }

    this.toLocalStorage = () => {
        let table = this.list; 
        localStorage.setItem("ratingTable", JSON.stringify(table)); 
    }

    this.updateList = (event) => {
        this.list[event.data.index].calulateNewRating( parseInt(event.target.value));
        this.list.sort((resortA,resortB) => {return resortB.getRating()-resortA.getRating();}); 
        ratedList.toDocument();
        ratedList.toLocalStorage();
    }
    
}

let ratedList = new RatedList();

$(document).ready(ratedList.toDocument());