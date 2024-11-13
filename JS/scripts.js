import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// Slideshow Component
const Slideshow = () => {
    const slides = [
        { src: '../images/shirt.jpg', alt: 'Oasis promotional t-shirt' },
        { src: '../images/poster1.jpg', alt: 'Oasis 2025 tour poster' },
        { src: '../images/mug.jpg', alt: 'Oasis promotional mug' },
        { src: '../images/poster2.jpg', alt: 'Oasis promotional poster' },
        { src: '../images/poster3.jpg', alt: 'Oasis album poster' }
    ];
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 2000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div key={index} className="slides fade" style={{ display: index === slideIndex ? 'block' : 'none' }}>
                    <img src={slide.src} alt={slide.alt} />
                </div>
            ))}
        </div>
    );
};

// Product Component
const Product = ({ product, addToCart }) => (
    <div className="product">
        <h3>{product.name}</h3>
        <p>£{product.price.toFixed(2)}</p>
        <button onClick={() => addToCart(product.id)}>Add to Cart</button>
    </div>
);

// Cart Component
const Cart = ({ cartItems, removeFromCart, clearCart }) => (
    <section className="cart">
        <h2>Shopping Cart</h2>
        <div id="cart-items">
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <p>{item.name} - £{item.price.toFixed(2)} (x{item.quantity})</p>
                    <button onClick={() => removeFromCart(index)}>Remove</button>
                </div>
            ))}
        </div>
        <div id="cart-total">Total: £{cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</div>
        <button onClick={clearCart}>Clear Cart</button>
    </section>
);

// Main App Component
const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (productId) => {
        const newCart = [...cart];
        const existingProduct = newCart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            newCart.push({ id: productId, name: `Product ${productId}`, price: 20, quantity: 1 });
        }
        setCart(newCart);
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const clearCart = () => setCart([]);

    const products = [
        { id: 1, name: 'T-Shirt', price: 20.0 },
        { id: 2, name: 'Mug', price: 15.0 },
        { id: 3, name: 'Poster', price: 10.0 }
    ];

    return (
        <div>
            <Slideshow />
            <section className="products">
                <h2>Merchandise</h2>
                {products.map((product) => (
                    <Product key={product.id} product={product} addToCart={addToCart} />
                ))}
            </section>
            <Cart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
        </div>
    );
};

// Render the React App to the #root element in shop.html
ReactDOM.render(<App />, document.getElementById('root'));
