/** 
* Use if no rating information is available in local storage. Initial 
* information consists of Ski resorts but no rating information.
*/
function initTable(){ 
    console.log("initTable");
    ratingTable = [
        {
            name: "Val Thorens",
            rating: 0.0,
            nrOfVotes: 0 
        }
    ];

    console.log(ratingTable);
    return ratingTable;
} 
 
/**
* Users can cast a vote for each resort every session. This value is not saved in local storage.
* Thus the vote is set to 0 every time a new browser session starts. 
*/
function initMyVote(row){
    console.log("initMyVote"); 
} 
/*
* Update/fill document with rating information.
*/
function fillDocuTable(){
    console.log("fillDocuTable");
}
/** 
* Fetch information about rating and then fill document with the information.
* User can cast new votes every session.
*/
function fetchTableData(){
    let ratingTable = localStorage.getItem("ratingTable") || initTable();
    ratingTable.forEach(initMyVote);
    fillDocuTable();
} 

$(document).ready(fetchTableData); 