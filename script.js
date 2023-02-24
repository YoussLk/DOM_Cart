const cartContainer = document.getElementById('cart-container');
const items = [{
    id: 1,
    price: 10
}, {
    id: 2,
    price: 20
}, {
    id: 3,
    price: 30
}];

// Create a function to handle changing the quantity of an item in the cart
function handleQuantity(event) {
    const target = event.target;
    const card = target.closest('.card');
    const quantityDisplay = card.querySelector('.quantity span');
    let quantity = parseInt(quantityDisplay.innerText);

    if (target.classList.contains('plus')) {
        quantity++;
    } else if (target.classList.contains('minus') && quantity > 1) {
        quantity--;
    }

    quantityDisplay.innerText = quantity;
    updateTotalPrice();
}

// Create a function to handle deleting an item from the cart
function handleDelete(event) {
    const target = event.target;
    const card = target.closest('.card');
    card.remove();
    updateTotalPrice();
}

// Create a function to handle liking an item in the cart
function handleLike(event) {
    const target = event.target;
    const card = target.closest('.card');
    const isLiked = target.classList.toggle('like');

    if (isLiked) {
        card.classList.add('liked');
    } else {
        card.classList.remove('liked');
    }
}

// Create a function to update the total price of the cart
function updateTotalPrice() {
    const cards = cartContainer.querySelectorAll('.card');
    let totalPrice = 0;

    cards.forEach(card => {
        const quantity = parseInt(card.querySelector('.quantity span').innerText);
        const price = items.find(item => item.id === parseInt(card.dataset.id)).price;
        totalPrice += quantity * price;
    });

    const totalPriceDisplay = cartContainer.querySelector('.total-price');
    totalPriceDisplay.innerText = `Total Price: $${totalPrice}`;
}

// Add event listeners to the buttons in each card
const buttons = cartContainer.querySelectorAll('.card button');
buttons.forEach(button => {
    if (button.classList.contains('plus') || button.classList.contains('minus')) {
        button.addEventListener('click', handleQuantity);
    } else if (button.classList.contains('delete')) {
        button.addEventListener('click', handleDelete);
    } else if (button.classList.contains('like')) {
        button.addEventListener('click', handleLike);
    }
});

// Update the total price initially
updateTotalPrice();