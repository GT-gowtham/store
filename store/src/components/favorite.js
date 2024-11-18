import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Container, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import Cookies from 'js-cookie';

function Favorite({onUpdateCartItemCount  }) {
  const [likedProducts, setLikedProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();


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
        .then(response => {
          if (response.data.username) {
            setUserId(response.data.user_id);
            getCart(response.data.user_id);
          }
        })
        .catch(error => {
          console.error("Session verification error:", error);
          setUserId(null);
        });
    }
  }, []);

  useEffect(() => {
    if (userId) { // Ensure userId is available before fetching
      axios.get(`http://localhost:8000/api/wishlist/Wishlist/`)
        .then(response => {
          // Filter wishlist items to include only those with wishlist_id equal to userId 
          const filteredWishlistItems = response.data.filter(item => item.wishlist_id == userId);
          const productRequests = filteredWishlistItems.map(item =>
            axios.get(`http://localhost:8000/api/product/products/${item.wishlist_product_id}/`)
          );
  console.log("user ID",userId)
          // Fetch product details only for the filtered wishlist items
          Promise.all(productRequests)
            .then(results => {
              const products = results.map((res, index) => ({
                ...res.data,
                wishlistId: filteredWishlistItems[index].id // Attach wishlist table ID
              }));
              setLikedProducts(products); // Set only filtered liked products
            })
            .catch(error => {
              console.error('Error fetching products:', error);
            });
        })
        .catch(error => {
          console.error('Error fetching wishlist:', error);
        });
    }
  }, [userId]);
  
  const getCart = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/cart/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("response.data",response.data)
      console.log("userId", userId)
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

  const handleBuyNow = (product) => {
    if (product.inStock) {
      // Handle buy now logic, e.g., navigate to checkout
    } else {
      alert(`${product.name} is out of stock!`);
    }
  };

  const handleAddToCart = (product) => {
    if (product.product_stock < 1) {
      setMessage(`${product.product_name} is out of stock!`);
      setTimeout(() => setMessage(""), 3000);
      return;
    }
  
    // Check if the product is already in the cart
    const isProductInCart = cartProducts.some((item) => item.cart_product_id == product.id);
  
    if (isProductInCart) {
      // If product is already in the cart, show a message
      setMessage(`${product.product_name} is already in your cart!`);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      return;
    }
  
    // If product is not in the cart, add it
    try {
      axios.post("http://localhost:8000/api/cart/", {
        cart_id: userId,
        cart_product_id: product.id,
        quantity: quantity, // Include quantity here
      }).then(() => {
        setMessage(`${product.product_name} added to the cart successfully!`);
        getCart(); // Refresh cart data to include the new product
        setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleFavoriteToggle = (product) => {
    // Directly remove the product from the wishlist by wishlist ID
    axios.delete(`http://localhost:8000/api/wishlist/Wishlist/${product.wishlistId}/`)
      .then(() => {
        // Update the liked products by removing the product from the list
        setLikedProducts((prevLikedProducts) => 
          prevLikedProducts.filter((p) => p.wishlistId !== product.wishlistId)
        );
      })
      .catch((error) => {
        console.error('Error removing from wishlist:', error);
      });
  };

  const handleProductClick = (product) => {
    navigate("/viewProduct", { state: { product } });
    console.log({ product });
  };

  return (
    <Container sx={{ p: 2, mt: 13 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Your Liked Products
      </Typography>
      {message && <div className="message" color="red">{message}</div>}
      {likedProducts.length > 0 ? (
        <Grid container spacing={2}>
          {likedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  border: "2px solid #e0e0e0",
                  padding: 2,
                  "&:hover": {
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
                  },
                  position: "relative",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: product.isLiked ? "red" : "red",
                  }}
                  onClick={() => handleFavoriteToggle(product)}
                >
                  {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <div onClick={() => handleProductClick(product)}>
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  style={{ maxWidth: "70%", height: "auto", marginBottom: "10px" }}
                />
                </div>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {product.product_name} <br /> {product.product_qty}<br />
                  <CurrencyRupeeIcon style={{ fontSize: "15px" }}/>
                  {product.product_price}/- 
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleBuyNow(product)}
                    component={Link}
                    to="/address"
                    sx={{ marginRight: 1 }}
                  >
                    Buy Now
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add Cart
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No liked products
        </Typography>
      )}
    </Container>
  );
}

export default Favorite;
