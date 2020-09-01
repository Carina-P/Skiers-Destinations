function sendMail(contactForm){
    emailjs.send("gmail","skiers_destinations",{
        "resort": contactForm.resort.value,
        "reason": contactForm.reason.value,
        "name": contactForm.name.value,
        "email": contactForm.email.value
    })
    .then( (response) => {
            console.log("OK", response);
        },
        (error) => {
            console.log("Failed", error);
        }
    );
    return false;
}