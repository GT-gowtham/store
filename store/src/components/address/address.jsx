import { Button, Grid, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShippingAddressForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  // const [userId, setUserId] = useState("1");
  const [errors, setErrors] = useState({});
  const [isDifferentBillingAddress, setIsDifferentBillingAddress] =
    useState(false);
  const [submittedAddresses, setSubmittedAddresses] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const { addressData, index } = location.state || {}
  const product = location.state?.product || {}; // Corrected naming for consistency
  const quantity = location.state?.quantity || {};
  const price = location.state?.price || {};
  const User = location.state?.user || {};

  useEffect(() => {
    const savedAddresses = localStorage.getItem("submittedAddresses");
    if (savedAddresses) {
      setSubmittedAddresses(JSON.parse(savedAddresses));
    }

    if (addressData) {
      setName(addressData.name);
      setAddress(addressData.address);
      setCity(addressData.city);
      setCountry(addressData.country);
      setState(addressData.state);
      setPinCode(addressData.pinCode);
      setPhone(addressData.phone);
    }
  }, [addressData]);

  const validate = () => {
    let newErrors = {};
    if (!User.trim()) newErrors.User = "User ID is required";
    if (!name.trim()) newErrors.name = "Name is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!state.trim()) newErrors.state = "State is required";
    if (!pinCode.trim()) {
      newErrors.pinCode = "Pin Code is required";
    } else if (!/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = "Invalid Pin Code";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Invalid Phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAddress = async () => {
    const datas = {
      user_ID: User.trim(),
      user_name: name.trim(),
      user_address: address.trim(),
      user_city: city.trim(),
      user_country: country,
      user_state: state.trim(),
      user_pincode: pinCode.trim(),
      user_phone: phone.trim(),
      user_checkboxes: isDifferentBillingAddress,
    };
console.log(datas);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/User_details/",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        return response;
      }
    } catch (error) {
      console.error(
        "Error submitting address:",
        error.response?.data || error.message
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await addAddress();
        if (response && response.status === 201) {
          const addressData = {
            name,
            address,
            city,
            country,
            state,
            pinCode,
            phone,
            isDifferentBillingAddress,
          };

          const updatedAddresses =
            index !== undefined
              ? submittedAddresses.map((addr, i) =>
                  i === index ? addressData : addr
                )
              : [...submittedAddresses, addressData];

          setSubmittedAddresses(updatedAddresses);
          localStorage.setItem(
            "submittedAddresses",
            JSON.stringify(updatedAddresses)
          );
          navigate("/addAddress", {
            state: {
              user: User,
              submittedAddresses: updatedAddresses,
              product : product.id,
              quantity,
              price,
            },
          });

          handleAdd();
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleAdd = () => {
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setPinCode("");
    setPhone("");
    setIsDifferentBillingAddress(false);
  };

  return (
    <Box sx={styles.container}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={3.5}>
          <Box sx={styles.formWrapper}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <Typography sx={styles.title} variant="h4">
                Shipping Address
              </Typography>

              {["name", "address", "city", "state", "pinCode", "phone"].map(
                (field) => (
                  <div style={styles.formGroup} key={field}>
                    <label style={styles.label}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                      type="text"
                      name={field}
                      value={eval(field)}
                      onChange={(e) =>
                        eval(
                          `set${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }(e.target.value)`
                        )
                      }
                      style={styles.input}
                    />
                    {errors[field] && (
                      <p style={styles.error}>{errors[field]}</p>
                    )}
                  </div>
                )
              )}

              <div style={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={isDifferentBillingAddress}
                  onChange={(e) =>
                    setIsDifferentBillingAddress(e.target.checked)
                  }
                />
                <label style={styles.checkboxLabel}>
                  Different Billing Address
                </label>
              </div>

              <Button
                variant="contained"
                type="submit"
                sx={styles.submitButton}
              >
                {index !== undefined ? "Update Address" : "submit"}
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "10px", // Reduced padding
    backgroundColor: "#f5f5f5",
  },
  formWrapper: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px", // Reduced padding
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#550a35",
    marginBottom: "20px",
  },
  label: {
    fontWeight: "500",
    fontSize: "16px",
    marginBottom: "8px",
    color: "#550a35",
  },
  formGroup: {
    marginBottom: "20px",
    width: "100%",
  },
  input: {
    width: "90%",
    padding: "10px",
    border: "1px solid #550a35",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
  checkboxGroup: {
    display: "flex",
    alignItems: "center",
    marginBottom: "16px",
    justifyContent: "flex-start", // Align checkbox and label to the left
  },
  checkboxLabel: {
    marginLeft: "8px",
    fontSize: "14px",
  },
  submitButton: {
    backgroundColor: "#550a35",
    color: "#fff",
    textTransform: "capitalize",
    padding: "12px 20px", // Reduced button size
    fontSize: "16px",
    fontWeight: "600",
    width: "80%", // Reduced width
    "&:hover": {
      backgroundColor: "#550a35",
    },
  },
  "@media (max-width: 600px)": {
    // Mobile view
    formWrapper: {
      padding: "15px", // Further reduced padding for mobile
    },
    input: {
      width: "100%", // Full width on mobile
    },
    submitButton: {
      width: "100%", // Full width on mobile
    },
  },
  "@media (min-width: 601px) and (max-width: 1024px)": {
    // Tablet view
    formWrapper: {
      padding: "20px",
    },
    input: {
      width: "95%",
    },
    submitButton: {
      width: "85%",
    },
  },
  "@media (min-width: 1025px)": {
    // Laptop and above
    formWrapper: {
      padding: "30px",
    },
    input: {
      width: "90%",
    },
    submitButton: {
      width: "80%",
    },
  },
};

export default ShippingAddressForm;