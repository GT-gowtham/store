// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Grid, Typography, Box, Button, useMediaQuery } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ViewProduct = ({ onAddToCart, likedProducts, onLikeToggle }) => {
//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const location = useLocation();
//   const [userId, setUserId] = useState("");
  
//   const { product } = location.state || {};  // Retrieve the product from location.state

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

//   const getWishlist = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/");
//       setWishlistProducts(response.data);  // Save the wishlist data
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   };

//   useEffect(() => {
//     // getProducts();
//     getWishlist();
//   }, []);

//   const isProductInWishlist = (productId) => {
//     return wishlistProducts.some(
//       (wishlistItem) => wishlistItem.wishlist_product_id === productId
//     );
//   };

//   const getWishlistId = (productId) => {
//     const wishlistItem = wishlistProducts.find(
//       (wishlistItem) => wishlistItem.wishlist_product_id === productId
//     );
//     return wishlistItem ? wishlistItem.id : null;
//   };

//   const handleLikeClick = async (product) => {
//     if (isProductInWishlist(product.id)) {
//       const wishlistId = getWishlistId(product.id);
//       if (wishlistId) {
//         try {
//           await axios.delete(
//             `http://localhost:8000/api/wishlist/Wishlist/${wishlistId}/`
//           );
//           setWishlistProducts(
//             wishlistProducts.filter((item) => item.id !== wishlistId)
//           );
//         } catch (error) {
//           console.error("Error removing from wishlist:", error);
//         }
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/wishlist/Wishlist/",
//           {
//             wishlist_id: userId,  // User ID
//             wishlist_product_id: product.id  // Product ID
//           }
//         );
//         setWishlistProducts([...wishlistProducts, response.data]);
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//       }
//     }
//   };

//   const handleAddToCart = () => {
//     if (onAddToCart) {
//       onAddToCart(product);
//     }
//   };

//   if (!product) return <Typography variant="h6">Product not found.</Typography>;

//   return (
//     <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 4 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
//           <div style={{ border: "2px solid #550a35", borderRadius: "8px" }}>
//             <div
//               className="favorite-button"
//               onClick={() => handleLikeClick(product)}
//               style={{
//                 color: isProductInWishlist(product.id) ? "red" : "black",
//                 padding: "10px"
//               }}
//             >
//               {isProductInWishlist(product.id) ? "❤️" : "♡"}
//             </div>
//             <img
//               src={product.product_image}
//               alt={product.product_name}
//               style={{ width: "100%", maxWidth: "500px", objectFit: "cover" }}
//             />
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6} display="flex" flexDirection="column">
//           <Typography variant="h4" gutterBottom style={{ color: "#550a35" }}>
//             {product.product_name}
//           </Typography>
//           <Typography variant="h6" style={{ color: "#550a35" }} gutterBottom>
//             Price: ₹{product.product_price}
//           </Typography>
//           <Typography variant="body1" paragraph style={{ color: "#550a35" }}>
//             {product.product_description}
//           </Typography>
//           <Grid container alignItems={"flex-end"} height={"300px"}>
//             <Grid item lg={6}>
//               <button className="buy-now" style={{ width: "30vh" }}>
//                 <Link to="/address" style={{ color: "white" }}>Buy Now</Link>
//               </button>
//             </Grid>
//             <Grid>
//               <button className="cart" style={{ width: "30vh" }} onClick={handleAddToCart}>
//                 Add Cart
//               </button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ViewProduct;







// // viewProduct

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import {
//   Grid,
//   Typography,
//   Box,
//   useMediaQuery,
//   IconButton,
// } from "@mui/material";
// import axios from "axios";
// import Cookies from "js-cookie";

// const ViewProduct = ({ onUpdateCartItemCount }) => {
//   const [message, setMessage] = useState("");
//   const [wishlistProducts, setWishlistProducts] = useState([]);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState("");
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { product } = location.state;
//   const [cartProducts, setCartProducts] = useState([]);
//   const [userDetails, setUserDetails] = useState([]);
//   const [userId, setUserId] = useState("");// You might want to replace this with the actual user ID

//   useEffect(() => {
//     getWishlist();
//     getCart();
//     getUser(); // Fetch user details
//     const savedCartCount = localStorage.getItem("cartCount");
//     if (savedCartCount) {
//       onUpdateCartItemCount(parseInt(savedCartCount, 10));
//     }
//     const sessionId = Cookies.get('sessionid');
//         const csrfToken = Cookies.get("csrftoken");
      
//         if (sessionId) {
//           axios.post(
//             "http://localhost:8000/api/check-session/",
//             { session_id: sessionId },
//             {
//               headers: {
//                 "X-CSRFToken": csrfToken,
//               },
//               withCredentials: true,
//             }
//           )
//             .then(response => {
//               if (response.data.username) {
//                 setUserId(response.data.user_id);
//               }
//             })
//             .catch(error => {
//               console.error("Session verification error:", error);
//               setUserId(null);
//             });
//         }
//   }, []);

//   const getWishlist = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const filteredwishlist = response.data.filter(
//         (wishlist) => wishlist.wishlist_id == userId
//       );
//       setWishlistProducts(filteredwishlist);
//     } catch (error) {
//       console.error("Error fetching wishlist:", error);
//     }
//   };

//   const handleIncrement = () => {
//     if (quantity < product.product_qty) {
//       setQuantity(quantity + 1);
//       setError("");
//     } else {
//       setError("Quantity cannot exceed available stock.");
//     }
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//       setError("");
//     }
//   };

//   const getCart = async () => {
//     try {
//       const response = await axios.get("http://localhost:8000/api/cart/", {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const cartData = response.data.filter(
//         (cart) => cart.cart_id == userId
//       );
//       setCartProducts(cartData);
//       console.log(cartData)
//       if (cartData.length > 0) {
//         localStorage.setItem("cartCount", cartData.length);
//       } else {
//         localStorage.removeItem("cartCount");
//       }

//       onUpdateCartItemCount(cartData.length); // Update cart count
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   const handleAddToCartClick = async () => {
//     if (product.product_stock < 1) {
//       setMessage(`${product.product_name} is out of stock!`);
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8000/api/cart/", {
//         cart_id: userId,
//         cart_product_id: product.id,
//         quantity: quantity, // Include quantity here
//       });
//       setMessage(`${product.product_name} added to the cart successfully!`);
//       getCart();
//       setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/User_details/"
//       );
//       setUserDetails(response.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleBuyNowClick = () => {
//     if (product.product_stock < 1) {
//       setMessage(`${product.product_name} is out of stock!`);
//     }
//     else{
//        if (userDetails.length > 0) {
//       // User details exist, navigate to addAddress page
//         navigate("/addaddress");
//         console.log("User details exist, navigating to addAddress page");
//       } else {
//         // User details do not exist, navigate to address page
//         navigate("/address");
//         console.log("User details do not exist, navigating to address page");
//       }
//     };
//   }
//   const isProductInWishlist = (productId) => {
//     return wishlistProducts.some(
//       (wishlistItem) => wishlistItem.wishlist_product_id === productId
//     );
//   };

//   const handleLikeClick = async (product) => {
//     if (isProductInWishlist(product.id)) {
//       const wishlistItem = wishlistProducts.find(
//         (item) => item.wishlist_product_id === product.id
//       );
//       try {
//         await axios.delete(
//           `http://localhost:8000/api/wishlist/Wishlist/${wishlistItem.id}/`,
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         setWishlistProducts(
//           wishlistProducts.filter((item) => item.id !== wishlistItem.id)
//         );
//       } catch (error) {
//         console.error("Error removing from wishlist:", error);
//       }
//     } else {
//       try {
//         const response = await axios.post(
//           "http://localhost:8000/api/wishlist/Wishlist/",
//           {
//             wishlist_id: userId,
//             wishlist_product_id: product.id,
//           },
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );
//         setWishlistProducts([...wishlistProducts, response.data]);
//       } catch (error) {
//         console.error("Error adding to wishlist:", error);
//       }
//     }
//   };

//   return (
//     <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 4 }}>
//       <Grid container spacing={4}>
//         <Grid
//           item
//           xs={12}
//           md={6}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >

//           <div style={{ border: "2px solid #550a35", borderRadius: "8px" }}>
//           <div
//               className="favorite-button"
//               onClick={() => handleLikeClick(product)}
//               style={{
//                 color: isProductInWishlist(product.id) ? "red" : "black",
//                 border: "none",
//                 background: "none",
//               }}
//             >
//               {isProductInWishlist(product.id) ? "❤" : "♡"}
//             </div>
//             <img
//               src={product.product_image}
//               alt={product.product_name}
//               style={{ width: "100%", maxWidth: "500px", objectFit: "cover" }}
//             />
//           </div>
//         </Grid>
//         <Grid item xs={12} md={6} display="flex" flexDirection="column">
//           <Typography variant="h4" gutterBottom style={{ color: "#550a35" }}>
//             {product.product_name}
//           </Typography>
//           <Typography variant="h6" style={{ color: "#550a35" }} gutterBottom>
//             Price: ₹{product.product_price}
//           </Typography>
//           <Typography variant="body1" paragraph style={{ color: "#550a35" }}>
//             {product.product_description}
//           </Typography>
//           <Grid container alignItems="center">
//             <Grid item lg={1}>
//               <IconButton
//                 onClick={handleDecrement}
//                 style={{ backgroundColor: "#550a35", color: "white" }}
//               >
//                 <RemoveIcon />
//               </IconButton>
//             </Grid>
//             <Grid item lg={0.5}>
//               <Typography variant="h6">{quantity}</Typography>
//             </Grid>
//             <Grid item lg={1}>
//               <IconButton
//                 onClick={handleIncrement}
//                 style={{ backgroundColor: "#550a35", color: "white" }}
//               >
//                 <AddIcon />
//               </IconButton>
//             </Grid>
//             <Grid item lg={12} mt={2}>
//               {error && (
//                 <Typography variant="body2" color="error">
//                   {error}
//                 </Typography>
//               )}
//             </Grid>
//           </Grid>
//           <Grid container alignItems={"flex-end"}>
//             <Grid item lg={6} mt={30}>
//               <button
//                 className="buy-now"
//                 style={{ width: "30vh" }}
//                 onClick={handleBuyNowClick}
//               >
//                 Buy Now
//               </button>
//             </Grid>
//             <Grid item lg={6}>
//               <button
//                 className="cart"
//                 style={{
//                   width: "30vh",
//                   padding: "10px",
//                   boxSizing: "border-box",
//                   backgroundColor: "#550a35",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//                 onClick={handleAddToCartClick}
//               >
//                 Add to Cart
//               </button>
//             </Grid>
//             <Grid>{message && <div className="message">{message}</div>}</Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ViewProduct;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Grid,
  Typography,
  Box,
  useMediaQuery,
  IconButton,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Similar from "./similar";

const ViewProduct = ({ onUpdateCartItemCount }) => {
  const [message, setMessage] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const productid = location.state?.productid;
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [userId, setUserId] = useState("");
  const [snackbarColor, setSnackbarColor] = useState("green"); // Default color
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const savedCartCount = localStorage.getItem("cartCount");
    if (savedCartCount) {
      onUpdateCartItemCount(parseInt(savedCartCount, 10));
    }
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
            .then(response => {
              if (response.data.username) {
                setUserId(response.data.user_id);
                getWishlist(response.data.user_id);
                getCart(response.data.user_id);
                getUser(response.data.user_id); 
                getProducts(productid);
              }
            })
            .catch(error => {
              console.error("Session verification error:", error);
              setUserId(null);
            });
        }
        else{
          getProducts(productid);
        }
  }, [productid, onUpdateCartItemCount]);

  const getProducts = async (productid) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/products/${productid}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getWishlist = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filteredwishlist = response.data.filter(
       (wishlist) => wishlist.wishlist_id == userId);
        setWishlistProducts(filteredwishlist);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const isProductInWishlist = (productId) => {
    return wishlistProducts.some(
      (wishlistItem) => wishlistItem.wishlist_product_id === productId
    );
  };

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

  const handleIncrement = () => {
    if (quantity < products.product_stock) {
      setQuantity(quantity + 1);
      setError("");
    } else {
      setError("Quantity cannot exceed available stock.");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setError("");
    }
  };

  const getCart = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/cart/");
      const filteredCart = response.data.filter(
        (cart) => cart.cart_id == userId
      );
      setCartProducts(filteredCart);
      const cartCount = filteredCart.length;
      localStorage.setItem("cartCount", cartCount);
      onUpdateCartItemCount(cartCount);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const isProductInCart = (productId) => {
    return cartProducts.some(
      (cartItem) => cartItem.cart_product_id === productId
    );
  };

  const handleAddToCartClick = async () => {
    if (products.product_stock < 1) {
      setMessage(`${products.product_name} is out of stock!`);
      setSnackbarColor("red");
      setOpenSnackbar(true);
      return;
    }

    if (isProductInCart(products.id)) {
      setMessage(`${products.product_name} is already in your cart.`);
      setSnackbarColor("red");
      setOpenSnackbar(true);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/cart/", {
        cart_id: userId,
        cart_product_id: products.id,
        quantity: quantity,
        product: products.product_name,
        price: products.product_price,
      });

      setMessage(`${products.product_name} added to the cart successfully!`);
      setSnackbarColor("green");
      setOpenSnackbar(true);
      getCart();
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/User_details/"
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const handleBuyNowClick = (product) => {
    console.log(product.product_stock);
    if(product.product_stock >= quantity){ 
      console.log(userDetails.length)
    if (userDetails.length > 0) {
      navigate("/addAddress", {
        state: {
          user: userId,
          product: product.id,
          quantity,
          price: product.product_price * quantity,
        },
      });
    } else {
      navigate("/address", {
        state: {
          user: userId,
          product: product.id,
          quantity,
          price: product.product_price * quantity,
        },
      });
    }
  }else{
    setMessage(`${product.product_name} is out of stock!`);
  }
  };


  return (
    <div>
    <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 4 }}>
      <Grid container spacing={4}>
      <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
  {products && (
    <div style={{ border: "2px solid #550a35", borderRadius: "8px" }}>
      <div
        className="favorite-button"
        onClick={() => handleLikeClick(products)}
        style={{
          color: isProductInWishlist(products.id) ? "red" : "black",
          border: "none",
          background: "none",
        }}
      >
        {isProductInWishlist(products.id) ? "❤" : "♡"}
      </div>
      <img
        src={products.product_image}
        alt={products.product_name}
        style={{ width: "100%", maxWidth: "500px", objectFit: "cover" }}
      />
    </div>
  )}
</Grid>
        <Grid item xs={12} md={6} display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom style={{ color: "#550a35" }}>
            {products.product_name}
          </Typography>
          <Typography variant="h6" style={{ color: "#550a35" }} gutterBottom>
            Price: ₹{products.product_price * quantity}
          </Typography>
          <Typography variant="body1" paragraph style={{ color: "#550a35" }}>
            {products.product_description}
          </Typography>
          <Grid container alignItems="center">
            <Grid item lg={1}>
              <IconButton
                onClick={handleDecrement}
                style={{ backgroundColor: "#550a35", color: "white" }}
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
            <Grid item lg={0.5}>
              <Typography variant="h6">{quantity}</Typography>
            </Grid>
            <Grid item lg={1}>
              <IconButton
                onClick={handleIncrement}
                style={{ backgroundColor: "#550a35", color: "white" }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item lg={12} mt={2}>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container alignItems={"flex-end"}>
            <Grid item lg={6} mt={30}>
              <button
                className="buy-now"
                style={{ width: "30vh" }}
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>
            </Grid>
            <Grid item lg={6}>
              <button
                className="cart"
                style={{
                  width: "30vh",
                  padding: "10px",
                  boxSizing: "border-box",
                  backgroundColor: "#550a35",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={handleAddToCartClick}
              >
                Add to Cart
              </button>
            </Grid>
            <Grid>{message && <div className="message">{message}</div>}</Grid>
          </Grid>
        </Grid>
      </Grid>
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
    </Box>
    <Similar
    currentProductId={products.id}
    currentProductCategory={products.product_category}
    />
    </div>
  );
};

export default ViewProduct;
