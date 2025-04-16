function toggleForm() {
    document.getElementById("transactionForm").classList.toggle("visible");
}

function toggleProductForm() {
    const form = document.getElementById("productForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    const quantity = document.querySelector('input[name="quantity"]').value;
    if (quantity < 1) {
        alert('Quantity must be above 0');
        e.preventDefault();
    }
});