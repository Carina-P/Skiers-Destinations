function sendMail(contactForm){
    $("#mail-sending").html(`<img src="assets/css/loader.gif" alt="loading..." /> <span>sending mail...</span>`);
    emailjs.send("gmail","skiers_destinations",{
        "resort": contactForm.resort.value,
        "reason": contactForm.reason.value,
        "name": contactForm.name.value,
        "email": contactForm.email.value
    })
    .then( () => {
            $("#mailOK").modal();
            $("#mailForm").trigger("reset");
            $("#mail-sending").html(``);
        },
        (error) => {
            $("#mailFail").modal();
            console.log(error);
        }
    );
    return false;
}

$(function(){emailjs.init("user_cnNZR4MUEsDbHZ4M6sFAo");})