// import { Button, Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import SendIcon from "@mui/icons-material/Send";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";

// const PaymentPage = () => {
//   const [submittedAddresses, setSubmittedAddresses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUser();
//   }, []);

//   const handleEdit = (index) => {
//     const addressToEdit = submittedAddresses[index];
//     if (addressToEdit) {
//       navigate("/address", { state: { addressData: addressToEdit, index } });
//     }
//   };

//   const handleAdd = () => {
//     navigate("/address"); // Redirect to the form to add a new address
//   };

//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/User_details/"
//       );
//       if (response.data) {
//         setSubmittedAddresses(response.data);
//       } else {
//         setSubmittedAddresses([]); // Ensure empty state if no data
//       }
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     try {
//       await axios.delete(
//         `http://localhost:8000/api/User_details/${addressId}/`
//       );
//       setSubmittedAddresses((prevAddresses) =>
//         prevAddresses.filter((address) => address.id !== addressId)
//       );
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     }
//   };

//   return (
//     <div>
//       <Grid
//         item
//         lg={6}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         mt={7}
//       >
//         {submittedAddresses.length > 0 ? (
//           submittedAddresses.map((addressData, index) => (
//             <div key={index}>
//               <Typography
//                 style={{
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   color: "#550a35",
//                 }}
//                 variant="h4"
//               >
//                 Shipping Address Summary
//               </Typography>
//               <p>
//                 <strong>Address:</strong>
//                 <br />
//                 {/* Add conditional rendering for each field */}
//                 <Typography style={{ marginLeft: "70px",  }}>
//                   {addressData.user_name && `${addressData.user_name},`} <br />
//                   {addressData.user_address &&
//                     `${addressData.user_address},`}{" "}
//                   <br />
//                   {addressData.user_city && `${addressData.user_city},`}{" "}
//                   {addressData.user_state && `${addressData.user_state},`}{" "}
//                   {addressData.user_country && `${addressData.user_country},`}{" "}
//                   {addressData.user_pinCode && `${addressData.user_pinCode},`}
//                   {addressData.user_city && `${addressData.user_city},`}{" "}
//                   {/* ${addressData.user_state}, ${addressData.user_country} ${addressData.user_pinCode}} */}
//                   <br />
//                   {addressData.user_phone && `${addressData.user_phone},`}
//                 </Typography>
//               </p>
//               <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//                 <IconButton
//                   onClick={() => handleEdit(index)}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => handleDeleteAddress(addressData.id)} // Pass address id
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <DeleteForeverIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleAdd}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <AddIcon />
//                 </IconButton>
//                 <Button
//                   variant="contained"
//                   onClick={() => navigate("/payment")}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   Continue to Pay <SendIcon style={{ marginLeft: "5px" }} />
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <Typography
//             variant="h6"
//             color="textSecondary"
//             style={{ textAlign: "center" }}
//           >
//             No addresses submitted
//           </Typography>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default PaymentPage;

// import { Button, Grid, IconButton, Typography } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import SendIcon from "@mui/icons-material/Send";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";

// const PaymentPage = () => {
//   const location = useLocation();
//   const product = location.state?.product || {}; // Corrected naming for consistency
//   const quantity = location.state?.quantity || {};
//   const price = location.state?.price || {};
//   const [submittedAddresses, setSubmittedAddresses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUser();
//   }, []);

//   const handleEdit = (index) => {
//     const addressToEdit = submittedAddresses[index];
//     if (addressToEdit) {
//       navigate("/address", { state: { addressData: addressToEdit, index } });
//     }
//   };

//   const handleAdd = () => {
//     navigate("/address");
//   };

//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8000/api/User_details/"
//       );
//       setSubmittedAddresses(response.data || []);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   const handleDeleteAddress = async (addressId) => {
//     try {
//       await axios.delete(
//         `http://localhost:8000/api/User_details/${addressId}/`
//       );
//       setSubmittedAddresses((prevAddresses) =>
//         prevAddresses.filter((address) => address.id !== addressId)
//       );
//     } catch (error) {
//       console.error("Error deleting address:", error);
//     }
//   };

//   const handleContinueToPay = () => {
//     if (submittedAddresses.length > 0) {
//       const selectedAddress = submittedAddresses[0]; // Selecting the first address for this example
//       navigate("/payment", {
//         state: { selectedAddress, product, quantity, price },
//       });
//     } else {
//       alert("Please add an address before proceeding to payment.");
//     }
//   };

//   return (
//     <div>
//       <Grid
//         item
//         lg={6}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//         mt={7}
//       >
//         {submittedAddresses.length > 0 ? (
//           submittedAddresses.map((addressData, index) => (
//             <div key={index}>
//               <Typography
//                 style={{
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   color: "#550a35",
//                 }}
//                 variant="h4"
//               >
//                 Shipping Address Summary
//               </Typography>
//               <Typography style={{ marginLeft: "70px" }}>
//                 {addressData.user_name} <br />
//                 {addressData.user_address} <br />
//                 {addressData.user_city}, {addressData.user_state},{" "}
//                 {addressData.user_country} {addressData.user_pinCode} <br />
//                 {addressData.user_phone}
//               </Typography>
//               <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//                 <IconButton
//                   onClick={() => handleEdit(index)}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={() => handleDeleteAddress(addressData.id)}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <DeleteForeverIcon />
//                 </IconButton>
//                 <IconButton
//                   onClick={handleAdd}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   <AddIcon />
//                 </IconButton>
//                 <Button
//                   variant="contained"
//                   onClick={handleContinueToPay}
//                   style={{ backgroundColor: "#550a35", color: "white" }}
//                 >
//                   Continue to Pay <SendIcon style={{ marginLeft: "5px" }} />
//                 </Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <Typography
//             variant="h6"
//             color="textSecondary"
//             style={{ textAlign: "center" }}
//           >
//             No addresses submitted
//           </Typography>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default PaymentPage;

import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";

const PaymentPage = () => {
  const [submittedAddresses, setSubmittedAddresses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const User = location.state?.user ||{};
  const product = location.state?.product || {}; // Corrected naming for consistency
  const quantity = location.state?.quantity || {};
  const price = location.state?.price || {};


  useEffect(() => {
    getUser();
  }, []);

  const handleEdit = (index) => {
    const addressToEdit = submittedAddresses[index];
    if (addressToEdit) {
      navigate("/address", { state: { addressData: addressToEdit, index } });
    }
  };

  const handleAdd = () => {
    navigate("/address",
      {
        state: {
          user: User,
          product: product.id,
          quantity,
          price: product.product_price * quantity,
        },
      }
    ); // Redirect to the form to add a new address
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/User_details/"
      );
      if (response.data) {
        const filteredAddresses = response.data.filter(
          (address) => address.user_ID == User
        );
        setSubmittedAddresses(filteredAddresses);
      } else {
        setSubmittedAddresses([]); // Ensure empty state if no data
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/User_details/${addressId}/`
      );
      setSubmittedAddresses((prevAddresses) =>
        prevAddresses.filter((address) => address.id !== addressId)
      );
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleProceedToPayment = (selectedAddress) => {
    if (selectedAddress) {
      //const selectedAddress = submittedAddresses[index]; // Selecting the first address for this example
      navigate("/payment", {
        state: { selectedAddress, User, product, quantity, price },
      });
    } else {
      alert("Please add an address before proceeding to payment.");
    }

  };

  return (
    <div>
      <Grid
        item
        lg={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        mt={7}
      >
        {submittedAddresses.length > 0 ? (
          submittedAddresses.map((addressData, index) => (
            <div key={index}>
              <Typography
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#550a35",
                }}
                variant="h4"
              >
                Shipping Address 
              </Typography>
              <p>
                <strong>Address:</strong>
                <br />
                <Typography style={{ marginLeft: "70px" }}>
                  {addressData.user_name && `${addressData.user_name}`} <br />
                  {addressData.user_address && `${addressData.user_address}`} <br />
                  {addressData.user_city && `${addressData.user_city},`}{" "}
                  {addressData.user_state && `${addressData.user_state},`}{" "}
                  {/* {addressData.user_country && ${addressData.user_country},}{" "} */}
                  {addressData.user_pinCode && `${addressData.user_pinCode},`}
                  <br />
                  {addressData.user_phone && `${addressData.user_phone},`}
                </Typography>
              </p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <IconButton
                  onClick={() => handleEdit(index)}
                  style={{ backgroundColor: "#550a35", color: "white" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteAddress(addressData.id)}
                  style={{ backgroundColor: "#550a35", color: "white" }}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton
                  onClick={handleAdd}
                  style={{ backgroundColor: "#550a35", color: "white" }}
                >
                  <AddIcon />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={() => handleProceedToPayment(addressData)}
                  style={{ backgroundColor: "#550a35", color: "white" }}
                >
                  Continue to Pay <SendIcon style={{ marginLeft: "5px" }} />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <Typography
            variant="h6"
            color="textSecondary"
            style={{ textAlign: "center" }}
          >
            No addresses submitted
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default PaymentPage;