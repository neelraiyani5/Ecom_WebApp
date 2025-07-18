import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import globalState from "../../../context/globalState";
import "./DetailProduct.css"

const DetailProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const params = useParams();
  const state = useContext(globalState);
  const [products] = state.ProductAPI.products;
  const [product, setProduct] = useState([]);

  useEffect(() => {
    if (params) {
      products.forEach((product) => {
        if (product._id === params.id) setProduct(product);
      });
    }
  }, [params, products]);

    const productImages = product.images?.url ? [
    product.images.url,
    product.images.url,
    product.images.url,
    product.images.url
  ] : [
    "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  // Calculate rating based on sold items (sample logic)
  const rating = Math.min(5, Math.max(1, (product.sold / 10) + 3.5));
  const reviewCount = product.sold * 3 + 47; // Sample review count logic

  // Check if product is in stock
  const inStock = product.checked;
  const stockCount = inStock ? Math.max(1, 50 - product.sold) : 0;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stockCount) {
      setQuantity(newQuantity);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.productId,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.images?.url,
      category: product.category
    };
    
    console.log('Adding to cart:', cartItem);
    // Here you would typically dispatch to your cart state or API
  };


  if (product.length == 0) return <p>Loading...</p>;
  return (
     <div className="product-details">
      <div className="container">
        <div className="product-layout">
          {/* Image Gallery */}
          <div className="image-section">
            <div className="main-image">
              <img 
                src={productImages[selectedImage]} 
                alt={product.title}
                className="product-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`View ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="info-section">
            <div className="product-header">
              <div className="category">{product.category}</div>
              <h1 className="product-title">{product.title}</h1>
              
              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={i < Math.floor(rating) ? 'star filled' : 'star'}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">{rating.toFixed(1)}</span>
                <span className="review-count">({reviewCount} reviews)</span>
              </div>

              <div className="price-section">
                <span className="current-price">${product.price}</span>
              </div>

              <div className="sales-info">
                <span className="sold-count">{product.sold} sold</span>
              </div>
            </div>


            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="add-to-cart-btn primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Product ID:</span>
                <span className="meta-value">{product.productId}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Added:</span>
                <span className="meta-value">{formatDate(product.createdAt)}</span>
              </div>
              {product.updatedAt !== product.createdAt && (
                <div className="meta-item">
                  <span className="meta-label">Updated:</span>
                  <span className="meta-value">{formatDate(product.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="details-tabs">
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              Details
            </button>
            <button 
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({reviewCount})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                {product.description === 'desc' && (
                  <p>This is a high-quality product from the {product.category} category. Perfect for everyday use with excellent build quality and modern design.</p>
                )}
              </div>
            )}

            {activeTab === 'content' && (
              <div className="content-section">
                <h3>Product Details</h3>
                <p>{product.content}</p>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Product ID:</span>
                    <span className="spec-value">{product.productId}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Category:</span>
                    <span className="spec-value">{product.category}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Price:</span>
                    <span className="spec-value">${product.price}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Units Sold:</span>
                    <span className="spec-value">{product.sold}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Availability:</span>
                    <span className="spec-value">{inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-content">
                <div className="reviews-summary">
                  <div className="rating-breakdown">
                    <div className="overall-rating">
                      <span className="rating-number">{rating.toFixed(1)}</span>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={i < Math.floor(rating) ? 'star filled' : 'star'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="total-reviews">Based on {reviewCount} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="sample-reviews">
                  <div className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">Sarah M.</span>
                      <div className="review-stars">★★★★★</div>
                    </div>
                    <p className="review-text">Great product from the {product.category} category! Excellent quality and fast delivery.</p>
                  </div>
                  <div className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">Mike R.</span>
                      <div className="review-stars">★★★★☆</div>
                    </div>
                    <p className="review-text">Good value for ${product.price}. Would recommend to others looking for {product.category} products.</p>
                  </div>
                  {product.sold > 0 && (
                    <div className="review-item">
                      <div className="review-header">
                        <span className="reviewer-name">Alex K.</span>
                        <div className="review-stars">★★★★★</div>
                      </div>
                      <p className="review-text">Popular item with {product.sold} units already sold. Quality matches the description perfectly!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
