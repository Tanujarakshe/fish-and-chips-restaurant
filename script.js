let cart = [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    displayCart();
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const pill = document.createElement('span');
        pill.classList.add('cart-pill');
        pill.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(pill);
    });
}

function closePopup() {
    document.querySelectorAll('.popup').forEach(popup => {
        popup.style.display = 'none';
    });
}

function checkout() {
    alert('Proceeding to checkout...');
    // Here you would handle the checkout process
}

function registerUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    // Simulate a successful registration
    alert('Registration successful!');
    document.getElementById('registerForm').reset();

    // Show popup
    document.getElementById('registration-popup').style.display = 'flex';

    // Send user data to backend (optional, can be handled in backend)
    fetch('/register', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ username, password, email }) 
    });
}

// Fetch product reviews from the backend
function loadReviews() {
    fetch('/reviews')
        .then(response => response.json())
        .then(data => {
            const reviewsList = document.getElementById('reviews-list');
            data.forEach(review => {
                const reviewDiv = document.createElement('div');
                reviewDiv.classList.add('review');
                reviewDiv.innerHTML = `
                    <p><strong>${review.name}</strong> (${review.rating}/5)</p>
                    <p>${review.comment}</p>
                `;
                reviewsList.appendChild(reviewDiv);
            });
        });
}

document.addEventListener('DOMContentLoaded', loadReviews);
