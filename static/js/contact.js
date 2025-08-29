document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitSpinner = document.getElementById('submitSpinner');
    
    // Form validation
    if (contactForm) {
        // Add form validation
        contactForm.addEventListener('submit', function(e) {
            // Prevent default form submission
            e.preventDefault();
            
            // Reset error messages
            clearErrorMessages();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                submitBtn.disabled = true;
                submitSpinner.style.display = 'block';
                
                // Submit form after a short delay to show loading state
                setTimeout(() => {
                    contactForm.submit();
                }, 800);
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            // Add focus and blur events for better UX
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                validateField(this);
            });
        });
    }
    
    // Validate individual field
    function validateField(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(`${fieldId}Error`);
        let isValid = true;
        
        // Clear previous error
        if (errorElement) {
            errorElement.textContent = '';
            field.classList.remove('error');
        }
        
        // Check if field is required and empty
        if (field.required && !field.value.trim()) {
            if (errorElement) {
                errorElement.textContent = 'Dieses Feld ist erforderlich';
                field.classList.add('error');
            }
            return false;
        }
        
        // Validate email format
        if (field.type === 'email' && field.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                if (errorElement) {
                    errorElement.textContent = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
                    field.classList.add('error');
                }
                return false;
            }
        }
        
        // Validate privacy checkbox
        if (field.type === 'checkbox' && field.required && !field.checked) {
            const privacyError = document.getElementById('privacyError');
            if (privacyError) {
                privacyError.textContent = 'Bitte akzeptieren Sie die Datenschutzerklärung';
            }
            return false;
        }
        
        return isValid;
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        const formInputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });
        
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    // Add animation to form elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-card, .section-title, .section-subtitle');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
