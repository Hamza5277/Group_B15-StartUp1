// Get form elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Get error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    
    if (name === '') {
        nameError.textContent = 'Name is required';
        nameInput.classList.add('error');
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.classList.add('error');
        return false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('error');
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
    }
}

function validatePassword() {
    const password = passwordInput.value;
    
    if (password === '') {
        passwordError.textContent = 'Password is required';
        passwordInput.classList.add('error');
        return false;
    } else if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        passwordInput.classList.add('error');
        return false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === '') {
        confirmPasswordError.textContent = 'Please confirm your password';
        confirmPasswordInput.classList.add('error');
        return false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match';
        confirmPasswordInput.classList.add('error');
        return false;
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('error');
        return true;
    }
}


nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);


passwordInput.addEventListener('input', function() {
    if (confirmPasswordInput.value !== '') {
        validateConfirmPassword();
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // If all validations pass
if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
    };

    // Send registration data to backend
    fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Email already registered") {
            alert("This email is already registered.");
            return;
        }

        alert("Registration successful!");
        window.location.href = "./login.html";
        form.reset();
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was a problem connecting to the server.");
    });
}

});


const loginLink = document.getElementById('loginLink');
loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = './login.html';
});
