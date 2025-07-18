import "./ProductList.css";
import { Link, useNavigate } from "react-router-dom";

function ProductList({ product }) {
  const navigate = useNavigate();
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.images.url}
          alt={product.name}
          className="product-image"
        />
        {product.isOnSale && <div className="sale-badge">Sale</div>}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < product.rating ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
          </div>
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>

        <div className="product-price">
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
          <span className="current-price">${product.price}</span>
        </div>
        <div className="btn">
          <button onClick={() => navigate("#!")} className="add-to-cart-btn">
            Add to Cart
          </button>
          <button
            onClick={() => navigate(`details/${product._id}`)}
            className="add-to-cart-btn"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
