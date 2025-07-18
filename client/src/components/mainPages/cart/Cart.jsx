import React from 'react'

const Cart = ({cartCount, handleAddToCart}) => {
  return (
    <div className="cart-dropdown">
                <div className="cart-header">
                  <h3>Shopping Cart</h3>
                  <span className="cart-total">{cartCount} items</span>
                </div>
                <div className="cart-items">
                  <div className="cart-item">
                    <div className="item-info">
                      <h4>Sample Product</h4>
                      <p>$29.99</p>
                    </div>
                  </div>
                  <div className="cart-item">
                    <div className="item-info">
                      <h4>Another Product</h4>
                      <p>$39.99</p>
                    </div>
                  </div>
                </div>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add Sample Item
                </button>
                <button className="view-cart-btn">View Cart</button>
              </div>
  )
}

export default Cart