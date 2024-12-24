import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import "./orderconfirm.css";

const OrderSuccess = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowSuccess(true);
    setShowConfetti(true);

    const timer = setTimeout(() => {
      setShowConfetti(false);
      navigate("/orderSummary"); // Redirect to the order summary after 5 seconds
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-container">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      {showSuccess && (
        <div className="success-container">
          <div className="checkmark-container">
            <div className="checkmark"></div>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order will be processed shortly.</p>
        </div>
      )}
    </div>
  );
};

export default OrderSuccess;