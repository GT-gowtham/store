// import React, { useState, useEffect } from 'react';
// import './home.css';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { useMediaQuery } from '@mui/material';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import ImageSlider from '../imageSlider';
// import OfferZoneBanner from "../../components/OfferZoneBanner/offerZoneBanner";
// import Cookies from "js-cookie";


// function Home({ onUpdateCartItemCount }) {
//   const [products, setProducts] = useState([]);
//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [cartProducts, setCartProducts] = useState([]); // Added cart products state
//   const [message, setMessage] = useState('');
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const navigate = useNavigate();  // Initialize useNavigate for page navigation
//   const [userId, setUserId] = useState("");


//   //const userId = 1; // Static user ID, change to dynamic if needed

//   useEffect(() => {
//     const sessionId = Cookies.get('sessionid');
//     const csrfToken = Cookies.get("csrftoken");
  
//     if (sessionId) {
//       axios.post(
//         "http://localhost:8000/api/check-session/",
//         { session_id: sessionId },
//         {
//           headers: {
//             "X-CSRFToken": csrfToken,
//           },
//           withCredentials: true,
//         }
//       )
//         .then(response => {
//           if (response.data.username) {
//             setUserId(response.data.user_id);
//           }
//         })
//         .catch(error => {
//           console.error("Session verification error:", error);
//           setUserId(null);
//         });
//     }
//   }, []);

//   // Fetch products from the backend
//   const getProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/product/products/', {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       const filteredProducts = response.data.filter(product => product.product_category === 'product');
//       setProducts(filteredProducts);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   // Fetch wishlist products
//   const getWishlist = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/wishlist/Wishlist/', {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       setWishlistProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching wishlist:', error);
//     }
//   };

//   // Fetch cart products
//   const getCart = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/api/cart/', {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
//       setCartProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   };

//   useEffect(() => {
//     getProducts();
//     getWishlist();
//     getCart(); // Fetch both products and wishlist when the component mounts
//   }, []);

//   // Check if a product is in the wishlist
//   const isProductInWishlist = (productId) => {
//     return wishlistProducts.some(wishlistItem => wishlistItem.wishlist_product_id === productId);
//   };

//   // Check if a product is in the cart
//   const isProductInCart = (productId) => {
//     return cartProducts.some(cartItem => cartItem.cart_product_id === productId);
//   };

//   // Handle like button (add/remove from wishlist)
//   const handleLikeClick = async (product) => {
//     if (isProductInWishlist(product.id)) {
//       const wishlistItem = wishlistProducts.find(item => item.wishlist_product_id === product.id);
//       try {
//         await axios.delete(`http://localhost:8000/api/wishlist/Wishlist/${wishlistItem.id}/`, {
//           headers: { 'Content-Type': 'application/json' }
//         });
//         setWishlistProducts(wishlistProducts.filter(item => item.id !== wishlistItem.id));
//       } catch (error) {
//         console.error('Error removing from wishlist:', error);
//       }
//     } else {
//       try {
//         const response = await axios.post('http://localhost:8000/api/wishlist/Wishlist/', {
//           wishlist_id: userId,
//           wishlist_product_id: product.id,
//         }, {
//           headers: { 'Content-Type': 'application/json' }
//         });
//         setWishlistProducts([...wishlistProducts, response.data]);
//       } catch (error) {
//         console.error('Error adding to wishlist:', error);
//       }
//     }
//   };

//   // Handle Add to Cart click
//   const handleAddToCartClick = async (product) => {
//     if (product.product_qty < 1) {
//       setMessage(`${product.product_name} is out of stock!`);
//       return;
//     }

//     if (isProductInCart(product.id)) {
//       setMessage(`${product.product_name} is already in your cart.`);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/cart/', {
//         cart_id: userId,
//         cart_product_id: product.id,
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       setMessage(`${product.product_name} added to the cart successfully!`);
//       getCart(); // Refresh the cart list
//       onUpdateCartItemCount(cartProducts.length + 1); // Update cart item count
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     }
//   };

//   const handleBuyNow = (product) => {
//     if (product.product_qty > 0) {
//       setMessage(`You have successfully bought ${product.product_name}`);
//     } else {
//       setMessage(`${product.product_name} is out of stock!`);
//     }
//   };

//     const handleProductClick = (product) => {
//     navigate("/viewProduct", { state: { product } });
//     console.log( { product });
//   };

//   return (
//     <div style={{ marginLeft: isMobile ? "" : "10vh", marginRight: isMobile ? "" : "10vh", marginTop: "5vh" }}>
//       {!isMobile && <ImageSlider />}
//       <OfferZoneBanner />

//       <div className="product-list">
//         {products.map(product => (
//           <div key={product.id} className="product-item">
//             <div
//               className="favorite-button"
//               onClick={() => handleLikeClick(product)}
//               style={{ color: isProductInWishlist(product.id) ? 'red' : 'black', border: 'none', background: 'none' }}
//             >
//               {isProductInWishlist(product.id) ? '❤️' : '♡'}
//             </div>
//             <div onClick={() => handleProductClick(product)}>
//                 <img src={product.product_image} alt={product.product_name} className="product-image" />
//             </div>
//             {/* <img src={product.product_image} alt={product.product_name} className="product-image" /> */}
//             <p className="product-name">
//               <span style={{ fontWeight: "bold" }}>{product.product_name}</span>
//               <span style={{ fontSize: "13px", fontWeight: "10px", marginLeft: "10px" }}> {product.product_qty}</span>
//             </p>
//             <p className="product-price">
//               <CurrencyRupeeIcon style={{ paddingTop: "-10px", fontSize: "15px" }} />
//               {product.product_price}
//               <span style={{ marginLeft: "10px", textDecoration: "line-through" }}>{product.docorprice}</span>
//             </p>
//             <div className="buttons">
//               <button className="buy-now" onClick={() => handleBuyNow(product)}>
//                 <Link to={userId.length === 0 ? "/address" : "/addAddress"} style={{ color: "white" }}>
//                   Buy Now
//                 </Link>
//               </button>

//               <button className="cart" onClick={() => handleAddToCartClick(product)}>
//                 Add Cart
//               </button>
//             </div>
//           </div>
//         ))}
//         {message && <div className="message">{message}</div>}
//       </div>

//       <section className="section contact">
//         <div className="row">
//           <div className="col">
//             <h2>EXCELLENT SUPPORT!</h2>
//             <p><strong>We Love Our Customers And They Can Reach Us Anytime Of Day We Will Be At Your Service 24/7</strong></p>
//             <a href="mailto:itsupport@primedigit.com" className="btn btn-primary">Contact us</a>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;


import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, useMediaQuery } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ImageSlider from "../imageSlider";
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
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
    console.log( "productid is", product.id );
  };

  return (
    <div
      style={{
        marginLeft: isMobile ? "" : "10vh",
        marginRight: isMobile ? "" : "10vh",
        marginTop: "5vh",
      }}
    >
      {!isMobile && <ImageSlider />}
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
                className="product-image"
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
    </div>
  );
}

export default Home;