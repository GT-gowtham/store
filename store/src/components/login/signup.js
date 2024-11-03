// import React, { useState } from "react";
// import {
//   Box, Container, Typography, TextField, Button, Grid,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import { styled } from "@mui/system";
// import axios from "axios";
// import img2 from "../../assets/loginimg/welcome1.png";

// const ResponsiveBox = styled(Box)(({ theme }) => ({
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//   },
// }));

// function Signup() {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

//   const navigate = useNavigate(); 

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const emailDomainValidation = (email) => {
//     const validDomains = ['gmail.com', 'yahoo.in'];
//     const emailParts = email.split('@');
//     if (emailParts.length === 2) {
//       const domain = emailParts[1];
//       if (validDomains.includes(domain)) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (formData.password !== formData.confirmPassword) {
//       newErrors.password = "Passwords do not match!";
//     }

//     if (!emailDomainValidation(formData.email)) {
//       newErrors.email = "Email must be from gmail.com or yahoo.in";
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       const newUser = {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         email: formData.email,
//         username: formData.email,
//         password: formData.password,
//       };

//       // Step 1: Send OTP to email and store the email and OTP in pendinguser table
//       axios
//         .post("http://localhost:8000/api/otp/", { email: formData.email })
//         .then((response) => {
//           console.log("OTP sent:", response.data);
//           // Navigate to OTP verification page, passing the user data to be stored later
//           navigate("/otpp", { state: { user: newUser } });
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <Box sx={{ minHeight: "96.4vh", display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
//       <Container maxWidth="md" sx={{ bgcolor: "#fff", boxShadow: 3, borderRadius: 2, overflow: "hidden", p: 2 }}>
//         <ResponsiveBox sx={{ display: "flex" }}>
//           <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2 }}>
//             <Typography variant="h4" align="center" gutterBottom fontWeight="bold">Welcome!</Typography>
//             <Typography variant="h6" align="center" gutterBottom fontWeight="bold" mb={1}>Welcome to Your Next Opportunity.</Typography>
//             <Typography variant="body1" align="center" gutterBottom>Sign up to connect with Hi-Fi IT PARK</Typography>
//             <Grid mt={7} textAlign="center">
//               <img src={img2} alt="Welcome" style={{ margin: "0 auto", width: "100%", maxWidth: 300, height: "auto" }} />
//             </Grid>
//             <Link to="/contact" align="center" sx={{ mt: 8, textDecoration: "none" }}>Contact Us?</Link>
//           </Grid>
//           <Grid item xs={12} md={3} sx={{ p: 2 }}>
//             <Typography variant="h4" align="center" gutterBottom fontWeight="bold">Sign Up</Typography>
//             <form onSubmit={handleSubmit}>
//               <Grid textAlign="center" mt={5}>
//                 <TextField name="firstName" placeholder="First Name" variant="standard" value={formData.firstName} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
//               </Grid>
//               <Grid textAlign="center">
//                 <TextField name="lastName" placeholder="Last Name" variant="standard" value={formData.lastName} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
//               </Grid>
//               <Grid textAlign="center">
//                 <TextField name="email" placeholder="E-mail" variant="standard" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email || ""} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
//               </Grid>
//               <Grid textAlign="center">
//                 <TextField name="password" placeholder="Password" type="password" variant="standard" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password || ""} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
//               </Grid>
//               <Grid textAlign="center">
//                 <TextField name="confirmPassword" placeholder="Confirm Password" type="password" variant="standard" value={formData.confirmPassword} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
//               </Grid>
//               <Grid textAlign="center" mt={4}>
//                 <Button type="submit" variant="contained" sx={{ mb: 5, backgroundColor: "#c5cae9", color: "black", textTransform: "capitalize", padding: "10px 50px" }}>Signup</Button>
//               </Grid>
//             </form>
//           </Grid>
//         </ResponsiveBox>
//       </Container>
//     </Box>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import {
  Box, Container, Typography, TextField, Button, Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { styled } from "@mui/system";
import axios from "axios";
import img2 from "../../assets/loginimg/welcome1.png";

const ResponsiveBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

function Signup() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false); // State to track OTP sent status

  const emailDomainValidation = (email) => {
    const validDomains = ['gmail.com', 'yahoo.in'];
    const emailParts = email.split('@');
    if (emailParts.length === 2) {
      const domain = emailParts[1];
      if (validDomains.includes(domain)) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match!";
    }

    if (!emailDomainValidation(formData.email)) {
      newErrors.email = "Email must be from gmail.com or yahoo.in";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
      .post("http://localhost:8000/api/check-email/", { email: formData.email })
      .then((response) => {
          console.log(response.data);
          if (response.data.message === "Email is available.") {
              // Proceed with OTP flow
              const newUser = {
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                  email: formData.email,
                  username: formData.email,
                  password: formData.password,
              };

              axios
                  .post("http://localhost:8000/api/otp/", { email: formData.email })
                  .then((response) => {
                      console.log("OTP sent:", response.data);
                      setOtpSent(true);
                      navigate("/otpp", { state: { user: newUser } });
                  })
                  .catch((error) => {
                      console.error("Error:", error);
                  });
          } else {
              // Handle case when email already exists
              setErrors({ email: "Email already exists. Please use a different one." });
          }
      })
      .catch((error) => {
          console.error("Error checking email:", error);
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ minHeight: "96.4vh", display: "flex", flexDirection: "column", alignItems: "center", padding: 2 }}>
      <Container maxWidth="md" sx={{ bgcolor: "#fff", boxShadow: 3, borderRadius: 2, overflow: "hidden", p: 2 }}>
        <ResponsiveBox sx={{ display: "flex" }}>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", p: 2 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">Welcome!</Typography>
            <Typography variant="h6" align="center" gutterBottom fontWeight="bold" mb={1}>Welcome to Your Next Opportunity.</Typography>
            <Typography variant="body1" align="center" gutterBottom>Sign up to connect with Hi-Fi IT PARK</Typography>
            <Grid mt={7} textAlign="center">
              <img src={img2} alt="Welcome" style={{ margin: "0 auto", width: "100%", maxWidth: 300, height: "auto" }} />
            </Grid>
            <Link to="/contact" align="center" sx={{ mt: 8, textDecoration: "none" }}>Contact Us?</Link>
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 2 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">Sign Up</Typography>
            <form onSubmit={handleSubmit}>
              <Grid textAlign="center" mt={5}>
                <TextField name="firstName" placeholder="First Name" variant="standard" value={formData.firstName} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
              </Grid>
              <Grid textAlign="center">
                <TextField name="lastName" placeholder="Last Name" variant="standard" value={formData.lastName} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
              </Grid>
              <Grid textAlign="center">
                <TextField name="email" placeholder="E-mail" variant="standard" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email || ""} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
              </Grid>
              <Grid textAlign="center">
                <TextField name="password" placeholder="Password" type="password" variant="standard" value={formData.password} onChange={handleChange} error={!!errors.password} helperText={errors.password || ""} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
              </Grid>
              <Grid textAlign="center">
                <TextField name="confirmPassword" placeholder="Confirm Password" type="password" variant="standard" value={formData.confirmPassword} onChange={handleChange} sx={{ mb: 2, width: isSmallScreen ? "30vh" : "45vh" }} />
              </Grid>
              <Grid textAlign="center" mt={4}>
                <Button type="submit" variant="contained" sx={{ mb: 5, backgroundColor: "#c5cae9", color: "black", textTransform: "capitalize", padding: "10px 50px" }}>Signup</Button>
              </Grid>
              {otpSent && (
                <Typography variant="body2" color="textSecondary" align="center">
                  OTP sent! Please check your email.
                </Typography>
              )}
            </form>
          </Grid>
        </ResponsiveBox>
      </Container>
    </Box>
  );
}

export default Signup;
