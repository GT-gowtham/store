import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./orderconfirm.css";
// import audio from "../assets/HomeAssets/storemusic.wav";

const OrderSuccess = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [play] = useSound(process.env.PUBLIC_URL + "../assets/HomeAssets/storemusic.wav"); // Path to the local MP3 file
  const navigate = useNavigate();  // Initialize navigate function

  useEffect(() => {
    // Play sound and show success message when component mounts
    play();
    setShowSuccess(true);

    // Hide success message after 10 seconds and navigate to Order Summary page
    const timer = setTimeout(() => {
      setShowSuccess(false);
      navigate("/orderSummary");  // Navigate to the Order Summary page after 10 seconds
    }, 5000);  // 10 seconds delay

    // Cleanup timer when component unmounts
    return () => clearTimeout(timer);
  }, [play, navigate]);

  return (
    <div className="order-container">
      {showSuccess && (
        <div className="success-animation">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p className="checkmark-p">Your order will be processed shortly.</p>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;