import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Button, useMediaQuery } from "@mui/material";
import axios from "axios";

const ViewProduct = ({ onAddToCart, likedProducts, onLikeToggle }) => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate(); // Use navigate instead of passing state in Link
  const location = useLocation();
  const { product } = location.state; // Retrieve the product from location.state
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/products/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("API response:", response.data);
      const filteredProducts = response.data.filter(
        (product) => product.product_category === "product"
      );
      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlistProducts.some(
      (wishlistItem) => wishlistItem.wishlist_product_id === productId
    );
  };
  const getWishlistId = (productId) => {
    const wishlistItem = wishlistProducts.find(
      (wishlistItem) => wishlistItem.wishlist_product_id === productId
    );
    return wishlistItem ? wishlistItem.id : null;
  };

  const getWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setWishlistProducts(response.data); // Save the wishlist data
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const handleLikeClick = async (product) => {
    if (isProductInWishlist(product.id)) {
      // If the product is already in the wishlist, remove it
      const wishlistId = getWishlistId(product.id);
      if (wishlistId) {
        try {
          await axios.delete(
            `http://localhost:8000/api/wishlist/Wishlist/${wishlistId}/`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(`${product.product_name} removed from wishlist.`);
          setWishlistProducts(
            wishlistProducts.filter((item) => item.id !== wishlistId)
          ); // Remove from state
        } catch (error) {
          console.error("Error removing from wishlist:", error);
        }
      }
    } else {
      // If the product is not in the wishlist, add it
      try {
        const response = await axios.post(
          "http://localhost:8000/api/wishlist/Wishlist/",
          {
            wishlist_id: 2, // User ID
            wishlist_product_id: product.id, // Product ID
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(`${product.product_name} added to the wishlist.`);
        setWishlistProducts([...wishlistProducts, response.data]); // Add the new wishlist item to the state
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <div style={{ border: "2px solid #550a35", borderRadius: "8px" }}>
            <div
              className="favorite-button"
              onClick={() => handleLikeClick(product)}
              style={{
                color: isProductInWishlist(product.id) ? "red" : "black",
                border: "none",
                background: "none",
                padding: "10px",
              }}
            >
              {isProductInWishlist(product.id) ? "❤️" : "♡"}
            </div>
            <img
              src={product.product_image}
              alt={product.product_name}
              style={{
                width: "100%",
                maxWidth: "500px",
                objectFit: "cover",
              }}
            />
          </div>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6} display="flex" flexDirection="column">
          <Typography variant="h4" gutterBottom style={{ color: "#550a35" }}>
            {product.product_name}
          </Typography>
          <Typography variant="h6" style={{ color: "#550a35" }} gutterBottom>
            Price: ₹{product.product_price}
          </Typography>
          <Typography variant="body1" paragraph style={{ color: "#550a35" }}>
            {product.product_description}
          </Typography>
          <Grid container alignItems={"flex-end"} height={"300px"}>
            <Grid item lg={6}>
              <button className="buy-now" style={{ width: "30vh" }}>
                <Link to="/address" style={{ color: "white" }}>
                  Buy Now
                </Link>
              </button>
            </Grid>
            <Grid>
              <button className="cart" style={{ width: "30vh" }}>
                Add Cart
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewProduct;
