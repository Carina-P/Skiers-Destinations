/**  
* Use if no rating information is available in local storage. Initial 
* information consists of Ski resorts but no rating information.
*/
function initTable(){  
    let ratingTable = [
        {name: "Bad Gastein"},
        {name: "Chamonix"},
        {name: "Cortina d'Apesso"},
        {name: "Trysil"},
        {name: "Val d'Isere"},
        {name: "Val Thorens"},
        {name: "Verbier"},
        {name: "Zermatt"},
        {name: "Zugspitze"},
        {name: "Åre"}
    ]

    ratingTable.forEach( resort => {
        resort.rating = 0.0;
        resort.nrOfVotes = 0; 
    })

    return ratingTable;
}  

/** 
* Returns a rating as number of stars in HTML.
*
* @param {number} rating A grade from 1 to 5. 
*/
function ratingStarsHTML(rating) { 
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

/**
 * Returns scrolldown with numbers 1 to 5 in HTML. 
 * 
 * @param {string} id Place in DOM to insert the HTML code.
 * 
 * @returns {literal} HTML code
 */
function noVoteHTML(id){
   let txtHTML = `<label for = ${id}>My grade:</label>
                    <select name = ${id} id=${id}>
                        <option value=0></option>`;
        for (let i=5; i>0; i--){
            txtHTML += `<option value=${i}>${i}</option>`;
        }    

        txtHTML += `</select>`;
    return  txtHTML;
}

/**
* Makes rating information to HTML.
*
* @param {Object} ratingRow with information about resort and its rating
* @param {number} i The index of current row in table
*/
function rowInfoHTML(row, i){
    let rowDataHTML = `<td>${i+1}</td>
                        <td>${row.name}</td>
                        <td>`;

    rowDataHTML += ratingStarsHTML(row.rating);
    rowDataHTML += `<span> ${row.rating.toFixed(2)}</span>`;

 
    rowDataHTML += `</td> 
                     <td> 
                        <div>`;

    if (row.myVote == 0) {
        let id = "gradeIndex" + i;
        rowDataHTML += noVoteHTML(id);  
    }
    else {
        rowDataHTML += ratingStarsHTML(row.myVote);
        rowDataHTML += `<span> ${row.myVote}</span>`;
    }

    rowDataHTML += `   </div>
                    </td>`;
    
    return rowDataHTML;
}

/**
 * Add handler to id, which should act on users change of vote. 
 *
 * @param {string} id Id that handler is connected to.
 * @param {number} i Index of the row in table.  
 */
function addHandler(id, i){
    $(id).change({index : i} , updateTable ); 
}
/* 
* Update/fill the table in document with resorts and rating information.
*/
function fillDocuTable(ratingTable){
    ratingTable.forEach((ratingRow, i) => {
        let id = "#index"+i;
        $(id).html(rowInfoHTML(ratingRow, i));
        
        if (ratingRow.myVote == 0) {
            addHandler(`#gradeIndex${i}`, i);
        }
    }); 
}
 
/**
* Update rating of a row with the new grade and return row with new values.
*
* @param {Object} tableRow Contains information of Ski Resort and its rating.
* @param {number} grade The value of a new vote to be added to the rating.
*
* @returns {Object} The updated row with new rating information.
*/
function calcNewRating(tableRow, grade) {
    
    tableRow.rating = (tableRow.rating*tableRow.nrOfVotes+grade)/(tableRow.nrOfVotes+1);
    tableRow.nrOfVotes++;
 
    tableRow.myVote = grade; 
 
    return tableRow;
}

/** 
* Put current table with current rating in local storage. Then if user ends session 
* the rating is saved to next session.
*/
function ratingToLocalStorage(ratingTable){
    let table = [];
    ratingTable.forEach( (row) => {
        table.push({ name: row.name, rating: row.rating, nrOfVotes: row.nrOfVotes});
    })
    localStorage.setItem("ratingTable", JSON.stringify(table));
}

/**
* When a resort is graded the information for that resort needs to be updated.
* The new grading may affect order of Ski resort. Table is sorted and the updated
* information is stored in local storage and rating table in document is updated.
*
* @param {Object} event Contains data with the index of the row that was 
*                       updated by user.
*/
function updateTable(event) { 
    
    let ratingTable = JSON.parse(sessionStorage.getItem("ratingTable"));

    ratingTable[event.data.index]= calcNewRating( ratingTable[event.data.index], parseInt(this.value));
    
    ratingTable.sort( (a,b) => {return b.rating-a.rating;})

    sessionStorage.setItem("ratingTable", JSON.stringify(ratingTable));
    ratingToLocalStorage(ratingTable); 
    fillDocuTable(ratingTable);
}

/** 
* Fetch information about rating and then fill document with the information.
* User can cast new votes every session, thus myVote is initiated to 0.
*/
function fetchTableData(){
    ratingTable = JSON.parse(localStorage.getItem("ratingTable")) || initTable(); 
    ratingTable.forEach( row => {row.myVote = 0;}); 
    fillDocuTable(ratingTable); 
    sessionStorage.setItem("ratingTable", JSON.stringify(ratingTable));
}

$(document).ready(fetchTableData);  
 