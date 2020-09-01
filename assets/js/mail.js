function sendMail(contactForm){
    emailjs.send("gmail","skiers_destinations",{
        "resort": contactForm.resort.value,
        "reason": contactForm.reason.value,
        "name": contactForm.name.value,
        "email": contactForm.email.value
    })
    .then( (response) => {
            $("#mailOK").modal();
        },
        (error) => {
            $("mailFail").modal();
            console.log(error);
        }
    );
    return false;
}