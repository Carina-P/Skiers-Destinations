function calcNewRating(event) {
    console.log("test", event.data.index, this.value);
    let txtHTML = ``;
    for (let i=0; i<this.value; i++){
        txtHTML += `<span class="fas fa-star yellow"></span>`;
    }
    $("#row1").html(txtHTML + `  ${this.value}`);
}

$("#grades1").change({index : 1} , calcNewRating );