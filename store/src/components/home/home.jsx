import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, useMediaQuery } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import OfferZoneBanner from "../../components/OfferZoneBanner/offerZoneBanner";
import Cookies from "js-cookie";





function Home({ onUpdateCartItemCount }) {
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green"); // Default color
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const quotes = [
    "The Earth is what we all have in common. - Wendell Berry",
    "Take care of the Earth, and she will take care of you.",
    "Sustainability is not a trend; it’s the way forward.",
    "Every small step towards eco-friendliness counts.",
    "Reduce, Reuse, Recycle – the three R’s for a better future."
  ];

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/products/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filteredProducts = response.data.filter(
        (product) => product.product_category === "product"
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
            // console.log("response.data.user_id",response.data.user_id)
            // console.log("2")
            getProducts();
            getWishlist(response.data.user_id);
            getCart(response.data.user_id); // Fetch both products and wishlist when the component mounts
        
            // Get the cart count from localStorage and update the state
            cartnumber();
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

  const cartnumber = () => {
  const savedCartCount = localStorage.getItem("cartCount");
  if (savedCartCount) {
    onUpdateCartItemCount(parseInt(savedCartCount, 10));
  }
  }
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
          "http://localhost:8000/api/wishlist/Wishlist/${wishlistItem.id}/",
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
      setSnackbarColor("red");
      setOpenSnackbar(true);
      cartnumber();
      return;
    }

    if (isProductInCart(product.id)) {
      setMessage(`${product.product_name} is already in your cart.`);
      setSnackbarColor("red");
      setOpenSnackbar(true);
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
      setSnackbarColor("green");
      setOpenSnackbar(true);
      getCart(); // Refresh the cart list
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };


  const handleProductClick = (product) => {
    navigate("/viewProduct", { state: { productid: product.id } });
  };

  return (
    <div
      style={{
        marginLeft: isMobile ? "" : "10vh",
        marginRight: isMobile ? "" : "10vh",
        marginTop: "5vh",
      }}
    >


         {/* Slider Section */}
         <section className="fmcg-top-section">
            <h1 className="fmcg-heading">HomeCare Products !</h1>
            <div className="fmcg-wave fmcg-wave2"></div>
            {/* <div className="fmcg-wave fmcg-wave2"></div> */}
            {/* <div className="fmcg-wave fmcg-wave2"></div> */}
          </section>


      <OfferZoneBanner />




      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div
              className="favorite-button"
              onClick={() => handleLikeClick(product)}
              style={{
                color: isProductInWishlist(product.id) ? "red" : "black",
                border: "none",
                background: "none",
              }}
            >
              {isProductInWishlist(product.id) ? "❤" : "♡"}
            </div>
            <div onClick={() => handleProductClick(product)}>
              <img
                src={product.product_image}
                alt={product.product_name}
                className="products-image"
              />
            </div>
            <p className="product-name">
              <span style={{ fontWeight: "bold" }}>{product.product_name}</span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "10px",
                  marginLeft: "10px",
                }}
              >
                {" "}
                {product.product_qty}
              </span>
            </p>
            <p className="product-price">
              <CurrencyRupeeIcon
                style={{ paddingTop: "-10px", fontSize: "15px" }}
              />
              {product.product_price}
              <span
                style={{ marginLeft: "10px", textDecoration: "line-through" }}
              >
                {product.docorprice}
              </span>
            </p>
            <div className="buttons">
              <button
                className="buy-now"
                onClick={() => handleProductClick(product)}
              >
                View Product
              </button>

              <button
                className="cart"
                onClick={() => handleAddToCartClick(product)}
              >
                Add Cart
              </button>
            </div>
          </div>
        ))}
             <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={message}
        autoHideDuration={3000}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarColor,
          },
        }}
      />
      </div>

      <section className="eco-grid1">
      {/* Left Large Box */}
      <div className="eco-grid-item1 large">
        {/* <h2>The 5 Best Reusable Paper Towel Alternatives</h2>
        <p>To Save the Planet, One Swipe at a Time</p>
        <a href="#">Read the Blog</a> */}
      </div>

      <div className="eco-grid-item2 large">
        {/* <h2>The 5 Best Reusable Paper Towel Alternatives</h2>
        <p>To Save the Planet, One Swipe at a Time</p>
        <a href="#">Read the Blog</a> */}
      </div>
    </section>

      <section className="eco-quotes-section">
      <h2 className="section-title">Eco-Friendly </h2>
      <div className="quotes-grid">
        {quotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <p className="quote-text">"{quote}"</p>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}

export default Home;