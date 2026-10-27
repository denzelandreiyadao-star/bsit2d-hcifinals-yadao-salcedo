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

function addNewProduct(event) {
    event.preventDefault();
    const name = document.getElementById("prod-name").value;
    const cat = document.getElementById("prod-cat").value;
    const price = parseFloat(document.getElementById("prod-price").value).toFixed(2);
    const stock = document.getElementById("prod-stock").value;

    const table = document.getElementById("seller-product-table");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${name}</td>
        <td>${cat}</td>
        <td>₱${price}</td>
        <td>${stock}</td>
        <td>
            <button class="action-btn" onclick="editProduct(this)">Edit</button>
            <button class="delete-btn" onclick="deleteProduct(this)">Delete</button>
        </td>
    `;

    table.appendChild(row);
    alert(`Product "${name}" added successfully!`);
    event.target.reset();
    showPage('manage-products');
}

function deleteProduct(button) {
    if (confirm("Are you sure you want to delete this product?")) {
        const row = button.closest("tr");
        row.remove();
    }
}

function editProduct(button) {
    const row = button.closest("tr");
    const cells = row.querySelectorAll("td");
    const currentName = cells[0].textContent;
    const newPrice = prompt(`Enter new price for ${currentName}:`, cells[2].textContent.replace("₱", ""));

    if (newPrice !== null && newPrice.trim() !== "") {
        cells[2].textContent = "₱" + parseFloat(newPrice).toFixed(2);
        alert("Product price updated!");
    }
}

function sellerLogout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    alert("Seller logged out successfully.");
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const role = localStorage.getItem("userRole");
    if (role === "customer") {
        window.location.href = "dashboard.html";
    } else if (!role) {
        window.location.href = "index.html";
    }
});