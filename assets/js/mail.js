function sendMail(contactForm){
    $("#mail-sending").html(`<img src="assets/css/loader.gif" alt="loading..."/> 
                            <span>sending mail...</span>`);
    emailjs.send("gmail","skiers_destinations",{
        "resort": contactForm.resort.value,
        "reason": contactForm.reason.value,
        "name": contactForm.name.value,
        "email": contactForm.email.value
    })
    .then( () => {
            $("#mail-feedback").modal();
            $(".modal-title").html(`<strong>Your email is sent</strong>`);
            $(".modal-body").html(`<p>We will read it during the day.</p> 
                            <p>Thank you for contributing to this page!</p>`)
            $("#mailForm").trigger("reset");
            $("#mail-sending").html(``);
        },
        (error) => {
            $("#mail-feedback").modal();
            $(".modal-title").html(`<strong>Error</strong>`);
            $(".modal-body").html(`<p>Unfortunately we could not send the mail.</p> 
                                    <p>Please try again!</p>`)
            $("#mail-sending").html(``);
            console.log(error);
        }
    );
    return false;
}

$(function(){emailjs.init("user_cnNZR4MUEsDbHZ4M6sFAo");})