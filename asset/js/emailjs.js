// Function to reset form fields
function resetForm() {
  ['name', 'subject', 'email', 'message'].forEach(id => {
    document.getElementById(id).value = '';
  });
};

//Email Js code
emailjs.init('FjMleEN7Kptej6Rej');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form values
    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Use EmailJS to send email
    emailjs.send('service_k84oe4w', 'template_zgokmbr', {
      name,
      subject,
      email,
      message,
    }).then(
      function () {
        //Debugging purpose
        //console.log('Email sent successfully:', response);
        // Clear the input fields
        resetForm();
        // Trigger Sweet Alert Success
        Swal.fire({
          title: "Confirmation",
          text: "Message sent successfully",
          icon: "success"
        });
      },
      function (error) {
        //Debugging purpose
        //console.log('Failed to send email:', error);
        // Trigger Sweet Alert Error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send message",
          footer: 'Error: '+ error
        });
      }
    );
  });
});