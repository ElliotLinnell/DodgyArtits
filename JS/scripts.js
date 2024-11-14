let cart = [];
let slideIndex = 0;
let slides = document.getElementsByClassName("slides");
let slideTimeout;

document.addEventListener("DOMContentLoaded", function() {
    loadCart();
    showSlides();
    updateCartCount();
});

function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, event) {
    const button = event.target;
    const buttonRect = button.getBoundingClientRect();
    const product = document.querySelector(`.product[data-id="${productId}"]`);
    const productName = product.querySelector('h3').innerText;
    const productPrice = parseFloat(product.querySelector('p').innerText.replace('£', ''));

    if (productId === 1) {
        openModal('sizeModal', buttonRect);
    } else if (productId === 3) {
        openModal('posterModal', buttonRect);
    } else {
        addProductToCart(productId, productName, productPrice, null);
    }
}

function addProductToCart(productId, name, price, size = null) {
    const uniqueKey = `${productId}-${size || 'default'}`;
    const existingProduct = cart.find(item => item.uniqueKey === uniqueKey);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name, price, size, quantity: 1, uniqueKey });
    }

    saveCart();
    updateCart();
}

function selectSize(size) {
    const product = document.querySelector('.product[data-id="1"]');
    const productName = `${product.querySelector('h3').innerText} - Size: ${size}`;
    const productPrice = parseFloat(product.querySelector('p').innerText.replace('£', ''));
    addProductToCart(1, productName, productPrice, size);
    closeModal('sizeModal');
}

function selectPoster(posterId) {
    const product = document.querySelector('.product[data-id="3"]');
    const productName = `${product.querySelector('h3').innerText} - Poster ${posterId}`;
    const productPrice = parseFloat(product.querySelector('p').innerText.replace('£', ''));
    addProductToCart(3, productName, productPrice, posterId);
    closeModal('posterModal');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerText = `${item.name} - £${item.price.toFixed(2)} (x${item.quantity}) `;
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        cartItem.appendChild(removeButton);
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `Total: £${total.toFixed(2)}`;
    updateCartCount();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
}

function purchase() {
    window.location.href = 'payment_information.html';
}

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.classList.toggle('hidden');
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.reduce((count, item) => count + item.quantity, 0);
}

function showSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    if (slideIndex > slides.length) { 
        slideIndex = 1; 
    }
    
    slides[slideIndex - 1].style.display = "block";
    slideTimeout = setTimeout(showSlides, 2000);
}

function plusSlides(n) {
    slideIndex += n;
    if (slideIndex > slides.length) { 
        slideIndex = 1; 
    }
    if (slideIndex < 1) { 
        slideIndex = slides.length; 
    }

    clearTimeout(slideTimeout);
    showCurrentSlide();
    slideTimeout = setTimeout(showSlides, 2000);
}

function showCurrentSlide() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function openModal(modalId, buttonRect) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
    modal.style.position = "absolute";
    modal.style.left = `${buttonRect.left}px`;
    modal.style.top = `${buttonRect.bottom + window.scrollY}px`;
    modal.style.maxWidth = "300px";
    modal.style.maxHeight = "150px";

    const modalRect = modal.getBoundingClientRect();
    if (modalRect.bottom > window.innerHeight) {
        modal.style.top = `${buttonRect.top - modalRect.height}px`;
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

document.querySelectorAll('.modal .close').forEach(element => {
    element.onclick = function() {
        closeModal(this.closest('.modal').id);
    };
});

document.addEventListener('click', function(event) {
    if (!event.target.closest('.modal') && !event.target.closest('.product button')) {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
    }
});
