function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("main-content");
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("collapsed");
}

function showPage(pageId) {
    const pages = document.querySelectorAll(".page");
    pages.forEach((page) => {
        page.classList.remove("active");
    });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add("active");
    }
}

function setActive(clickedButton) {
    const buttons = document.querySelectorAll(".sidebar .menu-btn");
    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });
    clickedButton.classList.add("active");
}

let cartTotal = 1299.00;

function addToCart(name, price) {
    const cartList = document.getElementById("cart-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${name}</td>
        <td>1</td>
        <td>₱${price.toFixed(2)}</td>
        <td><button class="delete-btn" onclick="removeFromCart(this, ${price})">Remove</button></td>
    `;
    cartList.appendChild(row);

    cartTotal += price;
    updateCartCount();
    updateCartTotal();
    alert(name + " was added to your cart.");
}

function removeFromCart(button, price) {
    const row = button.closest("tr");
    row.remove();
    cartTotal -= price;
    updateCartCount();
    updateCartTotal();
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    const rows = document.querySelectorAll("#cart-list tr");
    cartCount.textContent = rows.length;
}

function updateCartTotal() {
    const cartTotalEl = document.getElementById("cart-total");
    if (cartTotal < 0) {
        cartTotal = 0;
    }
    cartTotalEl.textContent = "₱" + cartTotal.toFixed(2);
}

function checkout() {
    const rows = document.querySelectorAll("#cart-list tr");
    if (rows.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! Your checkout was successful.");
    document.getElementById("cart-list").innerHTML = "";
    cartTotal = 0;
    updateCartCount();
    updateCartTotal();
}

let wishlistCount = 3;

function addToWishlist(name, price) {
    wishlistCount++;
    document.getElementById("wishlist-count").textContent = wishlistCount;
    alert(name + " was added to your wishlist.");
}

function moveToCart(name, price, buttonElement) {
    addToCart(name, price);
    if (buttonElement) {
        const card = buttonElement.closest(".product-card");
        if (card) {
            card.remove();
        }
    }
    if (wishlistCount > 0) {
        wishlistCount--;
        document.getElementById("wishlist-count").textContent = wishlistCount;
    }
}

function saveSettings() {
    alert("Your settings have been saved.");
}

function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    alert("You have been logged out successfully.");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("userRole");
    if (role === "seller") {
        window.location.href = "seller.html";
    } else if (!role) {
        window.location.href = "index.html";
    }

    updateCartCount();
    updateCartTotal();
});