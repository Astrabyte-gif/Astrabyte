document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    // Set the form action to FormSubmit.co
    contactForm.action = 'https://formsubmit.co/rjeanhan@gmail.com';

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Submit the form directly
        contactForm.submit();

        // Reset form and show success message
        contactForm.reset();
        successMessage.classList.add('show');
        
        // Reset button state
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    });
}); 