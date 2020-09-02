function calcNewRating(tableRow, grade) {
    if (tableRow.rating==undefined || tableRow.nrOfVotes==undefined || grade==undefined){
        console.log("Error in function calcNewRating, a parameter is undefined");
        return("Error");
    }
    if (typeof(tableRow.rating)!="number" || typeof(tableRow.nrOfVotes)!="number" || typeof(grade)!="number"){
        console.log("Error in function calcNewRating, parameter/s of wrong type");
        return("Error");
    }

    tableRow.rating = (tableRow.rating*tableRow.nrOfVotes++ +grade)/(tableRow.nrOfVotes);
    tableRow.myVote = grade;
     
    return tableRow;
} 