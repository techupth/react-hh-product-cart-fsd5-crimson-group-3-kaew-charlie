import "./App.css";
import products from "./data/products.js";
import { useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);

  const createOrder = (product) => {
    const newOrders = [...orders];
    newOrders.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantities: 1,
    });
    setOrders(newOrders);
  };

  const deleteOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const addOrder = (index) => {
    const newOrders = [...orders];
    newOrders[index].quantities += 1;
    setOrders(newOrders);
  };

  const reduceOrder = (index) => {
    const newOrders = [...orders];
    newOrders[index].quantities > 1
      ? (newOrders[index].quantities -= 1)
      : newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const isInOrders = (target) => {
    let createNew = true;
    for (let index in orders) {
      if (orders[index].id === target.id) {
        addOrder(index);
        createNew = false;
      }
    }
    if (createNew) {
      createOrder(target);
    }
  };

  return (
    <div className="App">
      <section className="product-container">
        <h1 className="product-heading">Products</h1>
        <div className="product-list">
          {products.map((product) => {
            return (
              <div className="product">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <button
                  onClick={() => {
                    isInOrders(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <hr />

      <section className="cart">
        <h1 className="cart-heading">
          Cart (Total Price is{" "}
          {orders.reduce((accumulater, order) => {
            return accumulater + order.quantities * order.price;
          }, 0)}{" "}
          Baht)
        </h1>
        <div className="cart-item-list">
          {orders.map((order, index) => {
            return (
              <div className="cart-item">
                <h1>Item name: {order.name}</h1>
                <h2>Price: {order.price} Baht</h2>
                <h2>Quantity: {order.quantities}</h2>
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteOrder(index);
                  }}
                >
                  x
                </button>
                <div className="quantity-actions">
                  <button
                    className="add-quantity"
                    onClick={() => {
                      addOrder(index);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="subtract-quantity"
                    onClick={() => {
                      reduceOrder(index);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
