function login(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let message = document.getElementById("message");

    if (username === "" && password === "") {
        message.style.color = "red";
        message.textContent = "Please enter your username or email and password.";
    } else if (username === "") {
        message.style.color = "red";
        message.textContent = "Please enter your username or email.";
    } else if (password === "") {
        message.style.color = "red";
        message.textContent = "Please enter your password.";
    } else if (password.length < 6) {
        message.style.color = "red";
        message.textContent = "Password must be at least 6 characters.";
    } else {
        // Role-Based Redirection Logic
        if (username === "user@example.com" && password === "user123") {
            message.style.color = "green";
            message.textContent = "Login successful! Redirecting to Customer Dashboard...";
            localStorage.setItem("userRole", "customer");
            localStorage.setItem("userEmail", username);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else if (username === "seller@example.com" && password === "seller123") {
            message.style.color = "green";
            message.textContent = "Login successful! Redirecting to Seller Dashboard...";
            localStorage.setItem("userRole", "seller");
            localStorage.setItem("userEmail", username);
            setTimeout(() => {
                window.location.href = "seller.html";
            }, 1000);
        } else {
            message.style.color = "red";
            message.textContent = "Invalid credentials. Use user@example.com / user123 or seller@example.com / seller123";
        }
    }
}

function showPassword() {
    let password = document.getElementById("password");
    let checkbox = document.getElementById("showPass");

    if (checkbox.checked) {
        password.type = "text";
    } else {
        password.type = "password";
    }
}