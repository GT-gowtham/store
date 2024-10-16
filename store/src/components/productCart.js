import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Container,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";

function Cart({ user_id, onCartCountChange }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/cart/?cart_id=${user_id}`)
      .then((response) => {
        const cartItems = response.data.map((item) => ({
          id: item.id,
          product: item.cart_product_id,
          quantity: item.quantity || 1,
        }));

        const productRequests = cartItems.map((item) =>
          axios.get(`http://localhost:8000/api/product/products/${item.product}/`)
        );

        Promise.all(productRequests)
          .then((results) => {
            const products = results.map((res, index) => ({
              ...res.data,
              cartId: cartItems[index].id,
              quantity: cartItems[index].quantity,
            }));
            setCartProducts(products);
            onCartCountChange(products.length); // Update cart count on page load
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching cart:", error);
      });
  }, [user_id, onCartCountChange]);

  const updateQuantity = (product, increment) => {
    const newQuantity = increment ? product.quantity + 1 : product.quantity - 1;

    if (newQuantity > 0) {
      axios
        .patch(`http://localhost:8000/api/cart/${product.cartId}/`, {
          quantity: newQuantity,
        })
        .then(() => {
          setCartProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.cartId === product.cartId ? { ...p, quantity: newQuantity } : p
            )
          );
        })
        .catch((error) => {
          console.error("Error updating quantity:", error);
        });
    }
  };

  const handleRemoveFromCart = (product) => {
    axios
      .delete(`http://localhost:8000/api/cart/${product.cartId}/`)
      .then(() => {
        setCartProducts((prevProducts) => {
          const updatedProducts = prevProducts.filter(
            (p) => p.cartId !== product.cartId
          );
          onCartCountChange(updatedProducts.length); // Update cart count after removing product
          return updatedProducts;
        });
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  const calculateTotalPrice = () => {
    return cartProducts.reduce(
      (total, product) => total + product.product_price * product.quantity,
      0
    );
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
        Your Shopping Cart
      </Typography>
      {cartProducts.length > 0 ? (
        <Grid container spacing={4}>
          {/* Left Side - Cart Items */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              {cartProducts.map((product) => (
                <Box
                  key={product.cartId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid #e0e0e0",
                    padding: "16px 0",
                  }}
                >
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    style={{
                      width: "120px",
                      height: "120px",
                      marginRight: "16px",
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{product.product_name}</Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#777", marginBottom: 2 }}
                    >
                      Price: <CurrencyRupeeIcon style={{ fontSize: "15px" }} />
                      {product.product_price}/-
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => updateQuantity(product, false)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography sx={{ mx: 2 }}>{product.quantity}</Typography>
                      <IconButton onClick={() => updateQuantity(product, true)}>
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#550a35",
                        textTransform: "capitalize",
                      }}
                      onClick={() => handleRemoveFromCart(product)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Right Side - Order Summary */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, position: "sticky", top: "90px" }}>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Order Summary
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <Typography variant="body1">Items Total</Typography>
                <Typography variant="body1">
                  <CurrencyRupeeIcon style={{ fontSize: "18px" }} />
                  {calculateTotalPrice()}/-
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <Typography variant="body1">Delivery Charges</Typography>
                <Typography variant="body1">Free</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 2,
                }}
              >
                <Typography variant="h6">Total Amount</Typography>
                <Typography variant="h6">
                  <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
                  {calculateTotalPrice()}/-
                </Typography>
              </Box>
              <Button
                variant="contained"
                // color="primary"
                component={Link}
                to="/checkout"
                fullWidth
                sx={{ marginTop: 2 }}
                style={{
                  backgroundColor: "#550a35",
                  textTransform: "capitalize",
                }}
              >
                Proceed to Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          No products in your cart
        </Typography>
      )}
    </Container>
  );
}

export default Cart;
