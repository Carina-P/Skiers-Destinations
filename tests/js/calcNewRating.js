function calcNewRating(tableRow, grade) {
    tableRow.rating = (tableRow.rating*tableRow.nrOfVotes++ +grade)/(tableRow.nrOfVotes);
    tableRow.myVote = grade;
    return tableRow;
}

/* function calcNewRating(tableRow, grade) {
    
    tableRow.rating = (tableRow.rating*tableRow.nrOfVotes++ +grade)/(tableRow.nrOfVotes);
 
    tableRow.myVote = grade; 
 
    return tableRow;
}*/