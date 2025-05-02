window.onload = function() {
    
    
    // Initialize EmailJS with your Public Key
    emailjs.init("dchXGt7KPIez-mO_Y");

    // Get the contact form
    const form = document.getElementById("contact-form");

    // Add an event listener to handle form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior


        // Send the form data to EmailJS
        emailjs.sendForm("service_hzxpt9e", "template_wd15ika", form)
            .then(function(response) {
                console.log("Success:", response);  // Log success response
                alert("Your message has been sent!");  // Alert the user of success
            }, function(error) {
                console.log("Error:", error);  // Log any errors
                alert("Sorry, there was an issue sending your message.");  // Alert the user of failure
            });
    });
};