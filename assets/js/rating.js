
/** 
* Use if no rating information is available in local storage. Initial 
* information consists of Ski resorts but no rating information.
*/
function initTable(){ 

    ratingTable = [
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
 
/* 
* Update/fill document with rating information.
*/
function fillDocuTable(){
    console.log("fillDocuTable");
}
/** 
* Fetch information about rating and then fill document with the information.
* User can cast new votes every session, thus myVote is initiated to 0.
*/
function fetchTableData(){
    let ratingTable = localStorage.getItem("ratingTable") || initTable(); 
    ratingTable.forEach( row => {row.myVote = 0;});
    console.log(ratingTable); 
    fillDocuTable();
} 

/** 
* Put current table with current rating in local storage. Then if user ends session 
* the rating is saved to next session.
*/
function ratingToLocalStorage(ratingTable){
    console.log("ratingToLocalStorage");
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
* When a resort is graded the information for that resort needs to be updated.
* The new grading may affect order of Ski resort. Table is sorted and the updated
* information is stored in local storage and rating table in document is updated.
*
* @param {Object} event Contains data with the index of the row that was 
*                       updated by user.
*/
function updateTable(event) { 
    
    ratingTable[event.data.index]= calcNewRating( ratingTable[event.data.index], parseInt(this.value));
    
    ratingTable.sort( (a,b) => {return b.rating-a.rating;})
    console.log (ratingTable);
    ratingToLocalStorage();
    fillDocuTable();
}

$(document).ready(fetchTableData); 

$("#gradesRow1").change({index : 0} , updateTable ); 
$("#gradesRow3").change({index : 2} , updateTable ); 
$("#gradesRow4").change({index : 3} , updateTable ); 