import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import CodIcon from "../assets/cod.png";
import Online from "../assets/online.jpg";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Used for navigation
  const selectedAddress = location.state?.selectedAddress || {};
  const quantity = location.state?.quantity || 1;
  const product = location.state?.product ;
  const price = location.state?.price || 0;
  const User = location.state?.User || {};
  const isMobile = useMediaQuery("(max-width:600px)");
  const [deliveryType, setDeliveryType] = useState("Cash on Delivery");
  const [paymentInput, setPaymentInput] = useState(price);
  const [userId, setUserId] = useState(1);
  const [addressId, setAddressId] = useState(selectedAddress.id || "");
  const [orderPlaced, setOrderPlaced] = useState("");

  useEffect(() => {
    if (selectedAddress && selectedAddress.id) {
      setAddressId(selectedAddress.id);
    }
    setOrderPlaced(product.payment_status || "Pending");
  }, [selectedAddress, product]);

  const handleDeliveryChange = (event) => {
    setDeliveryType(event.target.value);
    if (event.target.value === "Online Payment") {
      setPaymentInput(price); // Default amount for online payment
    }
  };

  const handleInputChange = (event) => {
    setPaymentInput(event.target.value);
    console.log("Payment Input:", event.target.value);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentInput) {
      alert("Please enter a payment amount");
      return;
    }

    var options = {
      key: "rzp_test_Zy8N3XBUFsyrib", // Replace with your Razorpay test key
      key_secret: "TTSMYDCU7bl0E7sl60BG5fvV", // Replace with your Razorpay test secret
      amount: paymentInput * 100, // Convert to smallest currency unit (paise for INR)
      currency: "INR",
      name: "STORE PROJECT",
      description: "For testing purpose",
      handler: async function (response) {
        alert(Payment `Successful! ID: ${response.razorpay_payment_id}`);
        await placeOrder("Completed"); // Placing the order after successful payment
        navigate("/orderConfirm"); // Redirecting to order confirmation page
      },
      prefill: {
        name: "murugavalli",
        email: "valli1211254@gmail.com",
        contact: "6369254022",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#550a35", // Your custom theme color
      },
      payment_capture: 1, // Ensures automatic capture of payments
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.on("payment.failed", function (response) {
      alert(Payment `Failed! Reason: ${response.error.description}`);
    });
    razorpayInstance.open();
  };

  const placeOrder = async (paymentStatus = "Pending") => {
    const datas = {
      id: userId,
      user: User,
      product: product,
      quantity: parseInt(quantity),
      total_price: parseInt(price),
      payment_method: deliveryType === "Cash on Delivery" ? "Cash" : "Online Payment",
      payment_amount: deliveryType === "Online Payment" ? paymentInput : null,
      user_address: addressId,
      status: orderPlaced,
      payment_status: paymentStatus,
      delivery_status: "Processing",
    };
    console.log("product", product)

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/order/Order/",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Order placed successfully");
        navigate("/orderConfirm");
      }
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Container>
        <Grid container spacing={6} justifyContent="center" alignItems="center">
          <Grid item xs={12} display="flex" justifyContent="center" mt={10}>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              Select Payment Method
            </Typography>
          </Grid>

          <Grid item style={{ paddingLeft: isMobile ? "30px" : "" }}>
            <FormControl>
              <RadioGroup
                defaultValue="Cash on Delivery"
                name="radio-buttons-group"
                onChange={handleDeliveryChange}
              >
                <Grid m={2} mt={7}>
                  <Card
                    elevation={3}
                    sx={{
                      width: isMobile ? "350px" : "500px",
                      padding: 2,
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <FormControlLabel
                      value="Cash on Delivery"
                      control={<Radio />}
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <span>Cash on Delivery</span>
                          <img
                            src={CodIcon}
                            alt="Cash on Delivery"
                            style={{
                              width: "24px",
                              paddingLeft: "15px",
                            }}
                          />
                        </Box>
                      }
                    />
                  </Card>
                </Grid>
                <Grid m={2}>
                  <Card
                    elevation={3}
                    sx={{
                      width: isMobile ? "350px" : "500px",
                      padding: 2,
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <FormControlLabel
                      value="Online Payment"
                      control={<Radio />}
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <span>Online Payment</span>
                          <img
                            src={Online}
                            alt="Online Payment"
                            style={{
                              width: "24px",
                              paddingLeft: "15px",
                            }}
                          />
                        </Box>
                      }
                    />
                    {deliveryType === "Online Payment" && (
                      <Box mt={2}>
                        <Typography variant="body1">Enter Payment Details:</Typography>
                        <input
                          type="text"
                          value={paymentInput}
                          onChange={handleInputChange}
                          placeholder="Enter Payment Info"
                          style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                          }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlePayment}
                          style={{ marginTop: "10px" }}
                        >
                          Pay with Razorpay
                        </Button>
                      </Box>
                    )}
                  </Card>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        {deliveryType === "Cash on Delivery" && (
          <Grid item container justifyContent={"center"}>
            <Button
              style={{ textTransform: "capitalize", marginTop: "5vh" }}
              variant="contained"
              onClick={() => placeOrder()}
            >
            </Button>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Payment;