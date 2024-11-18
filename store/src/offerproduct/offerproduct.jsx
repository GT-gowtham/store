import React, { useState, useEffect } from 'react';
import './offerproduct.css';
import { Link , useNavigate} from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import Cookies from "js-cookie";

function OfferProduct({ onUpdateCartItemCount }) {
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  //const userId = 1; // Static user ID, change to dynamic if needed
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/products/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filteredProducts = response.data.filter(
        (product) => product.product_category === "combo"
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch wishlist products
  const getWishlist = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filteredwishlist = response.data.filter(
        (wishlist) => wishlist.wishlist_id == userId
      );
      setWishlistProducts(filteredwishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Fetch cart products
  const getCart = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/cart/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const cartData = response.data.filter(
        
        (cart) => cart.cart_id == userId
      );
      
      setCartProducts(cartData);
      console.log(cartData)
      if (cartData.length > 0) {
        localStorage.setItem("cartCount", cartData.length);
      } else {
        localStorage.removeItem("cartCount");
      }

      onUpdateCartItemCount(cartData.length); // Update cart count
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const sessionId = Cookies.get('sessionid');
    const csrfToken = Cookies.get("csrftoken");
  
    if (sessionId) {
      axios.post(
        "http://localhost:8000/api/check-session/",
        { session_id: sessionId },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      )
        .then(async response => {
          if (response.data.username) {
           await setUserId(response.data.user_id);
            console.log("response.data.user_id",response.data.user_id)
            console.log("2")
            getProducts();
            getWishlist(response.data.user_id);
            getCart(response.data.user_id); // Fetch both products and wishlist when the component mounts
        
            // Get the cart count from localStorage and update the state
            const savedCartCount = localStorage.getItem("cartCount");
            if (savedCartCount) {
              onUpdateCartItemCount(parseInt(savedCartCount, 10));
            }
          }
        })
        .catch(error => {
          console.error("Session verification error:", error);
          setUserId(null);
        });
    }
    else {
      getProducts();
    }
  }, []);

  // Check if a product is in the wishlist
  const isProductInWishlist = (productId) => {
    return wishlistProducts.some(
      (wishlistItem) => wishlistItem.wishlist_product_id === productId
    );
  };

  // Check if a product is in the cart
  const isProductInCart = (productId) => {
    return cartProducts.some(
      (cartItem) => cartItem.cart_product_id === productId
    );
  };

  // Handle like button (add/remove from wishlist)
  const handleLikeClick = async (product) => {
    if (isProductInWishlist(product.id)) {
      const wishlistItem = wishlistProducts.find(
        (item) => item.wishlist_product_id === product.id
      );
      try {
        await axios.delete(
          `http://localhost:8000/api/wishlist/Wishlist/${wishlistItem.id}/`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setWishlistProducts(
          wishlistProducts.filter((item) => item.id !== wishlistItem.id)
        );
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/wishlist/Wishlist/",
          {
            wishlist_id: userId,
            wishlist_product_id: product.id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setWishlistProducts([...wishlistProducts, response.data]);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  // Handle Add to Cart click
  const handleAddToCartClick = async (product) => {
    if (product.product_stock < 1) {
      setMessage(`${product.product_name} is out of stock!`);
      return;
    }

    if (isProductInCart(product.id)) {
      setMessage(`${product.product_name} is already in your cart.`);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart/",
        {
          cart_id: userId,
          cart_product_id: product.id,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(`${product.product_name} added to the cart successfully!`);
      getCart(); // Refresh the cart list
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  const handleProductClick = (product) => {
    navigate("/viewProduct", { state: { product } });
    console.log({ product });
  };

  return (
    <div style={{ marginLeft: isMobile ? "" : "10vh", marginRight: isMobile ? "" : "10vh", marginTop: "5vh" }}>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <div 
              className={`favorite-button ${isProductInWishlist(product.id) ? 'favorite' : ''}`} 
              onClick={() => handleLikeClick(product)}
            >
              {isProductInWishlist(product.id) ? '❤️' : '♡'}
            </div>
            <div onClick={() => handleProductClick(product)}>
            <img src={product.product_image} alt={product.product_name} className="product-image" /> </div>
            <p className="product-name">
              <span style={{ fontWeight: "bold" }}>{product.product_name}</span>
            </p>
            <p className="product-price">
              <CurrencyRupeeIcon style={{ paddingTop: "-10px", fontSize: "15px" }} />
              {product.product_price}
              <span style={{ marginLeft: "10px", textDecoration: "line-through" }}>{product.docorprice}</span>
            </p>
            <div className="buttons">
              <button
                className="buy-now"
                onClick={() => handleProductClick(product)}
              >
                View Product
              </button>
              <button className="cart" onClick={() => handleAddToCartClick(product)}>Add Cart</button>
            </div>
          </div>
        ))}
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default OfferProduct;
