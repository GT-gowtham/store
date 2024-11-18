import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CodIcon from "../assets/cod.png";
import GpayIcon from "../assets/gpay.webp";
import PhonePayIcon from "../assets/phonepay.png";
import Online from "../assets/online.jpg";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const selectedAddress = location.state?.selectedAddress || {};
  const quantity = location.state?.quantity || {};
  const product = location.state?.product || {};
  const price = location.state?.price || {};
  const User = location.state?.User || {};
  const isMobile = useMediaQuery("(max-width:600px)");
  const [deliveryType, setDeliveryType] = useState("Cash on Delivery");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [expanded, setExpanded] = useState(false);
  const [orderMessage, setOrderMessage] = useState("");
  const [userId, setUserId] = useState(1);
  const [addressId, setAddressId] = useState(selectedAddress.id || "");
  const [orderPlaced, setOrderPlaced] = useState("");

  useEffect(() => {
    if (selectedAddress && selectedAddress.id) {
      setAddressId(selectedAddress.id);
    }
    setOrderPlaced(product.payment_status);
  }, [selectedAddress]);

  const handlePayment = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleDeliveryChange = (event) => {
    setDeliveryType(event.target.value);
    setPaymentMethod("");
  };

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const getButtonText = () => {
    if (
      deliveryType === "Online Delivery" &&
      (paymentMethod === "Gpay" || paymentMethod === "Phone pay")
    ) {
      return "Pay Now";
    }
    return "Place Order";
  };

  const placeOrder = async () => {
    const datas = {
      id: userId,
      user: User,
      product: product,
      quantity: parseInt(quantity),
      total_price: parseInt(price),
      payment_method: paymentMethod,
      user_address: addressId,
      status: orderPlaced,
      payment_status:
        deliveryType === "Cash on Delivery" ? "Pending" : "Completed",
      delivery_status: "Processing",
    };

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
        setOrderMessage("Your order has been placed successfully!");
        setTimeout(() => {
          setOrderMessage("");
        }, 3000);
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
                aria-labelledby="demo-radio-buttons-group-label"
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
                      value="Online Delivery"
                      control={<Radio />}
                      label={
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <span>Online Delivery</span>
                          <img
                            src={Online}
                            alt="Online Delivery"
                            style={{
                              width: "24px",
                              paddingLeft: "15px",
                            }}
                          />
                        </Box>
                      }
                    />
                    {deliveryType === "Online Delivery" && (
                      <>
                        <Accordion
                          expanded={expanded}
                          onChange={handleExpansion}
                          TransitionProps={{ timeout: 400 }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                          >
                            <Typography>UPI</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid>
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  onChange={handlePayment}
                                  name="radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="Phone pay"
                                    control={<Radio />}
                                    label={
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        width="100%"
                                      >
                                        <span>Phone pay</span>
                                        <img
                                          src={PhonePayIcon}
                                          alt="Phone pay"
                                          style={{
                                            width: "34px",
                                            paddingLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                    }
                                  />
                                  <FormControlLabel
                                    value="Gpay"
                                    control={<Radio />}
                                    label={
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        width="100%"
                                      >
                                        <span>Gpay</span>
                                        <img
                                          src={GpayIcon}
                                          alt="Gpay"
                                          style={{
                                            width: "34px",
                                            paddingLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                    }
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            <Typography>Wallet</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid>
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  onChange={handlePayment}
                                  name="radio-buttons-group"
                                >
                                  <FormControlLabel
                                    value="Phone pay"
                                    control={<Radio />}
                                    label={
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        width="100%"
                                      >
                                        <span>Phone pay</span>
                                        <img
                                          src={PhonePayIcon}
                                          alt="Phone pay"
                                          style={{
                                            width: "34px",
                                            paddingLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                    }
                                  />
                                  <FormControlLabel
                                    value="Gpay"
                                    control={<Radio />}
                                    label={
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        width="100%"
                                      >
                                        <span>Gpay</span>
                                        <img
                                          src={GpayIcon}
                                          alt="Gpay"
                                          style={{
                                            width: "34px",
                                            paddingLeft: "10px",
                                          }}
                                        />
                                      </Box>
                                    }
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    )}
                  </Card>
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item container justifyContent={"center"}>
          <Button
            style={{ textTransform: "capitalize", marginTop: "5vh" }}
            variant="contained"
            onClick={placeOrder}
          >
            <Link to="/orderConfirm">{getButtonText()}</Link>
          </Button>
        </Grid>
      </Container>
    </div>
  );
};

export default Payment;