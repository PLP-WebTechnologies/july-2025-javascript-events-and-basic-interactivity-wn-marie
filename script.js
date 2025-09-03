// ===== PART 1: EVENT HANDLING =====

// Click event example
document.getElementById('click-btn').addEventListener('click', function() {
    const message = document.getElementById('click-message');
    message.style.display = 'block';
    
    // Hide the message after 2 seconds
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
});

// Mouse events example
const hoverBox = document.getElementById('hover-box');
hoverBox.addEventListener('mouseover', function() {
    this.style.backgroundColor = '#3498db';
    this.style.color = 'white';
    this.textContent = 'Mouse is over!';
});

hoverBox.addEventListener('mouseout', function() {
    this.style.backgroundColor = '';
    this.style.color = '';
    this.textContent = 'Hover over me!';
});

// Keyboard event example
document.getElementById('keyboard-input').addEventListener('input', function(e) {
    document.getElementById('mirror-text').textContent = e.target.value;
});


// ===== PART 2: INTERACTIVE ELEMENTS =====

// Dark/Light mode toggle
document.getElementById('mode-toggle-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') 
        ? 'Light Mode' 
        : 'Dark Mode';
});

// Counter game
let count = 0;
const counterElement = document.getElementById('counter-value');

document.getElementById('increment-btn').addEventListener('click', function() {
    count++;
    counterElement.textContent = count;
    
    // Change color based on count
    if (count > 10) {
        counterElement.style.color = '#e74c3c';
    } else if (count > 5) {
        counterElement.style.color = '#f39c12';
    } else {
        counterElement.style.color = '';
    }
});

document.getElementById('reset-counter').addEventListener('click', function() {
    count = 0;
    counterElement.textContent = count;
    counterElement.style.color = '';
});

// FAQ section
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isVisible = answer.classList.contains('show');
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('show');
        });
        
        // Update all icons
        document.querySelectorAll('.faq-question span:last-child').forEach(icon => {
            icon.textContent = '+';
        });
        
        // If answer wasn't visible, open it
        if (!isVisible) {
            answer.classList.add('show');
            this.querySelector('span:last-child').textContent = '-';
        }
    });
});

// Tabbed interface
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});


// ===== PART 3: FORM VALIDATION =====

const form = document.getElementById('user-form');

// Validate name field
function validateName() {
    const nameInput = document.getElementById('name');
    const errorElement = document.getElementById('name-error');
    const nameValue = nameInput.value.trim();
    
    if (nameValue.length < 2) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

// Validate email field
function validateEmail() {
    const emailInput = document.getElementById('email');
    const errorElement = document.getElementById('email-error');
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(emailValue)) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

// Validate password field
function validatePassword() {
    const passwordInput = document.getElementById('password');
    const errorElement = document.getElementById('password-error');
    const passwordValue = passwordInput.value;
    
    // Password must be at least 8 characters with uppercase, lowercase, and number
    const hasUpperCase = /[A-Z]/.test(passwordValue);
    const hasLowerCase = /[a-z]/.test(passwordValue);
    const hasNumber = /\d/.test(passwordValue);
    const isLongEnough = passwordValue.length >= 8;
    
    if (!(hasUpperCase && hasLowerCase && hasNumber && isLongEnough)) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

// Validate confirm password field
function validateConfirmPassword() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorElement = document.getElementById('confirm-password-error');
    
    if (passwordInput.value !== confirmPasswordInput.value) {
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

// Add event listeners for real-time validation
document.getElementById('name').addEventListener('input', validateName);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm-password').addEventListener('input', validateConfirmPassword);

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        document.getElementById('success-message').style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            form.reset();
            document.getElementById('success-message').style.display = 'none';
        }, 3000);
    }
});