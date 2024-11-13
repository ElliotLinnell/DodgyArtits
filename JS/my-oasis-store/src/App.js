import React, { useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h1>Welcome to Oasis Store</h1>
      <div>
        <h2>Products</h2>
        <div>
          <h3>Product 1: T-Shirt</h3>
          <button onClick={() => addToCart({ name: 'T-Shirt', price: 20.00 })}>Add to Cart</button>
        </div>
        <div>
          <h3>Product 2: Mug</h3>
          <button onClick={() => addToCart({ name: 'Mug', price: 15.00 })}>Add to Cart</button>
        </div>
      </div>

      <div>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty</p> : null}
        {cart.map((item, index) => (
          <div key={index}>
            <p>{item.name} - £{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
