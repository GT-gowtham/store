import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Otppage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(240); // Set 4 minutes (300 seconds)
  const [otpExpired, setOtpExpired] = useState(false); // Track if OTP expired
  const navigate = useNavigate();
  const location = useLocation(); // Access user data passed from Signup page

  const user = location.state?.user;

  useEffect(() => {
    let countdown = null;

    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setOtpExpired(true); // Mark OTP as expired when timer reaches 0
    }

    return () => clearInterval(countdown); // Cleanup interval on component unmount or timer end
  }, [timer]);

  const handleOtpSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("User data not found.");
      return;
    }

    // Verify OTP with backend
    axios
      .post("http://localhost:8000/api/verify-otp/", { email: user.email, otp })
      .then((response) => {
        if (response.data.status === "success") {
          // If OTP is valid, save user data to database
          axios
            .post("http://localhost:8000/api/register/", user)
            .then(() => {
              // Redirect to login page
              navigate("/login");
            })
            .catch((err) => {
              setError("Error storing user data.");
              console.error("Error:", err);
            });
        } else {
          setError("Invalid OTP.");
        }
      })
      .catch((err) => {
        setError("Error verifying OTP.");
        console.error("Error:", err);
      });
  };

  const handleResendOtp = () => {
    // Resend OTP logic
    axios
      .post("http://localhost:8000/api/otp/", { email: user.email })
      .then((response) => {
        console.log("OTP resent:", response.data);
        setOtpExpired(false); // Reset OTP expired status
        setTimer(240); // Restart timer to 4 minutes
      })
      .catch((error) => {
        console.error("Error resending OTP:", error);
        setError("Failed to resend OTP.");
      });
  };

  return (
    <Box sx={{ height: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <Box sx={{ backgroundColor: "white", border: "2px solid rgb(0, 230, 122)", borderRadius: 2, padding: 4, maxWidth: 500, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">Enter your OTP</Typography>
        <Typography variant="body1" mt={"5vh"}>Enter the OTP sent to your email</Typography>

        <form onSubmit={handleOtpSubmit}>
          <Grid container spacing={3} justifyContent="center" mt={2}>
            <Grid item xs={12}>
              <TextField
                label="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
                disabled={otpExpired} // Disable input if OTP is expired
              />
              {error && <Typography color="error" mt={2}>{error}</Typography>}
            </Grid>

            {timer > 0 && (
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  OTP valid for {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes
                </Typography>
              </Grid>
            )}

            {otpExpired && (
              <Grid item xs={12} textAlign="center">
                <Button onClick={handleResendOtp} variant="outlined" color="secondary">
                  Resend OTP
                </Button>
              </Grid>
            )}

            <Grid item xs={12} textAlign="center" mt={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none", padding: "10px 50px" }}
                disabled={otpExpired} // Disable submit if OTP is expired
              >
                Verify OTP
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default Otppage;
