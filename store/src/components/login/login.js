import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import img2 from "../../assets/loginimg/welcome1.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Login() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in (Session persistence)
  
  useEffect(() => {
    const sessionId = Cookies.get("sessionid"); // Use exact cookie name here
    console.log("Session ID from cookie:", sessionId);
    const csrfToken = Cookies.get("csrftoken");
    if (sessionId) {
      axios
      .post(
        "http://localhost:8000/api/check-session/",
        { session_id: sessionId },
        {
          headers: {
            "X-CSRFToken": csrfToken,  // Add the CSRF token to headers
          },
          withCredentials: true,
        }
      )
        .then((response) => {
          if (response.data.status === "active") {
            navigate("/"); // Redirect if session is valid
            
          }
        })
        .catch((error) => {
          //Cookies.remove("sessionid"); // Clear any cookie session data if error
        });
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { username, password },
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        const sessionKey = response.data.session_key;
        localStorage.setItem("sessionKey", sessionKey);
        navigate("/");
        window.location.reload(); 
      }
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };
 

  return (
    <Box sx={{ py: 4, minHeight: "92.8vh" }}>
      <Box sx={{ textAlign: "center", mb: 12, mt: 5 }}></Box>

      <Grid container justifyContent="center">
        <Grid
          item
          xs={11}
          sm={11}
          md={6}
          lg={5}
          border={"3px solid gray"}
          borderRadius={"10px"}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmallScreen ? "column" : "row",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                flex: 1,
                borderRight: isSmallScreen ? "none" : "1px solid #000",
                borderBottom: isSmallScreen ? "1px solid #000" : "none",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h4" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Welcome to your next opportunity.
              </Typography>
              <Typography variant="body1">
                Log in to connect with Username & Password
              </Typography>
              <Box mt={4}>
                <img
                  src={img2}
                  alt="Welcome"
                  style={{ width: "80%", height: "auto" }}
                />
              </Box>
            </Box>

            <Box sx={{ flex: 1, p: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Login Form
              </Typography>
              <TextField
                fullWidth
                label="Email ID"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
              />

              {errorMessage && (
                <Typography color="error" align="center" sx={{ mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Link to="/forgot">Forgot Password?</Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2, bgcolor: "#b8a5fe" }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="body2">
                  Don't have an account? <Link to="/signup">Signup</Link>
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<FaGoogle />}
                sx={{ mt: 2 }}
              >
                Continue with Google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
