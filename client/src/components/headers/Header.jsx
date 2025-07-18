import { useContext, useState } from "react";
import "./Header.css";
import Cart from "../mainPages/cart/Cart";
import { Link, useNavigate } from "react-router-dom";
import globalState from "../../context/globalState";
import axios from "axios";

const Header = () => {
  const state = useContext(globalState);
  const [cartCount, setCartCount] = useState(3);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [loggedIn, setLoggedIn] = state.UserAPI.loggedIn;
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;
  const navigate = useNavigate();

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  const logoutUser = async() => {
    await axios.get("/user/logout")
    localStorage.clear()
    setIsAdmin(false)
    setLoggedIn(false)
  }

  const adminRouter = () => {
    return (
      <>
        <li className="list-items">
          <Link to="/create_product" className="nav-link">Create Product</Link>
        </li>
        <li className="list-items">
          <Link to="/category" className="nav-link">Categories</Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li className="list-items">
          <Link to="/history" className="nav-link">History</Link>
        </li>
        <li className="list-items">
          <Link to="/" className="nav-link" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          {isAdmin ? <h1>Shophub - Admin</h1> : <h1>Shophub</h1>}
        </div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {isAdmin ? "Products" : "Shop"}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="user-actions">
          {/* Account */}

          {isAdmin && adminRouter()}
          {loggedIn ? (
            loggedRouter()
          ) : (
            <>
        <li className="list-items">
          <Link to="/register" className="nav-link">Register</Link>
        </li>
        <li className="list-items">
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        
      </>
          )}

          {/* Cart */}
          {(isAdmin) || (!loggedIn) ? "" : (
            <div
            className="cart-container"
            onClick={() => setIsCartHovered(!isCartHovered)}
          >
            <button className="cart-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 22c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                <path d="M20 22c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            {/* Cart Dropdown */}
            {isCartHovered && (
              <Cart handleAddToCart={handleAddToCart} cartCount={cartCount} />
            )}
          </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
