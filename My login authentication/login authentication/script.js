// script.js
const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const signUp = document.querySelector(".signup-link");
const login = document.querySelector(".login-link");

// Array to store user information
let users = [];

// Function to display notification
function displayNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to validate name input
function validateName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

// Function to validate email input
function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

// Function to validate password input
function validatePassword(password) {
    return password.length >= 6;
}

// Function to handle form submission
function handleSignup() {
    const nameInput = document.querySelector(".signup .input-field:nth-child(1) input");
    const emailInput = document.querySelector(".signup .input-field:nth-child(2) input");
    const passwordInput = document.querySelector(".signup .input-field:nth-child(3) input");
    const confirmPasswordInput = document.querySelector(".signup .input-field:nth-child(4) input");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Validate name
    if (!validateName(name)) {
        displayNotification("Please enter a valid name.");
        return;
    }

    // Validate email
    if (!validateEmail(email)) {
        displayNotification("Please enter a valid email address.");
        return;
    }

    // Validate password
    if (!validatePassword(password)) {
        displayNotification("Password must be at least 6 characters long.");
        return;
    }

    // Confirm password
    if (password !== confirmPassword) {
        displayNotification("Passwords do not match.");
        return;
    }

    // If all validations pass, store user information and redirect to login page
    const newUser = { name, email, password };
    users.push(newUser);
    displayNotification("Signup successful. Redirecting to login page...");

    // Redirect to login page after 3 seconds
    setTimeout(() => {
        container.classList.remove("active");
    }, 3000);
}

// Function to handle login
function handleLogin() {
    const emailInput = document.querySelector(".login .input-field:nth-child(1) input");
    const passwordInput = document.querySelector(".login .input-field:nth-child(2) input");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if email and password match any user in the array
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        // Display popup message for successful login
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.textContent = "You have logged in";
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.remove();
        }, 3000);
    } else {
        // Display notification for unsuccessful login
        displayNotification("Invalid email or password.");
    }
}

// Event listeners
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach(pwField => {
            if (pwField.type === "password") {
                pwField.type = "text";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            } else {
                pwField.type = "password";
                pwShowHide.forEach(icon => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

signUp.addEventListener("click", () => {
    container.classList.add("active");
});

login.addEventListener("click", () => {
    container.classList.remove("active");
});

// Event listener for form submission
document.querySelector(".signup .input-field.button input").addEventListener("click", handleSignup);
document.querySelector(".login .input-field.button input").addEventListener("click", handleLogin);
