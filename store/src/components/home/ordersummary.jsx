import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import "./ordersummary.css";
import Cookies from "js-cookie";

function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const cancellationReasons = [
    "Your order has been canceled due to stock unavailability; we apologize for the inconvenience.",
    "Order cancellation successful as per your request; refund will be processed shortly.",
    "Your order was canceled due to a payment issue; please review and try again.",
    "Unfortunately, we had to cancel your order due to an address verification issue.",
    "Order canceled successfully; feel free to reach out if you need further assistance.",
  ];

  const getOrderList = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8000/api/order/Order/");
      const orderItems = response.data.filter((order) => order.user == userId);

      const productRequests = orderItems.map((order) =>
        axios.get(`http://localhost:8000/api/product/products/${order.product}/`)
      );
      const addressRequests = orderItems.map((order) =>
        axios.get(`http://localhost:8000/api/User_details/${order.user_address}/`)
      );

      const [productResults, addressResults] = await Promise.all([
        Promise.all(productRequests),
        Promise.all(addressRequests),
      ]);

      const detailedOrders = orderItems.map((order, index) => ({
        ...order,
        product: productResults[index].data,
        address: addressResults[index].data,
      }));

      setOrders(detailedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    const sessionId = Cookies.get("sessionid");
    const csrfToken = Cookies.get("csrftoken");

    if (sessionId) {
      axios
        .post(
          "http://localhost:8000/api/check-session/",
          { session_id: sessionId },
          {
            headers: {
              "X-CSRFToken": csrfToken,
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.user_id) {
            setUserId(response.data.user_id);
            getOrderList(response.data.user_id);
          } else {
            setError("Session expired. Please log in again.");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Session verification error:", error);
          setError("Failed to verify session.");
        });
    } else {
      setError("No active session found. Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  const handleCancelOrderPrompt = (orderId) => {
    setOrderToCancel(orderId);
    setSelectedReason("");
    setError(null);
    setIsEditing(true);
  };

  const handleConfirmCancelOrder = () => {
    if (!selectedReason) {
      setError("Please select a cancellation reason.");
      return;
    }
  
    axios
  .put(
    `http://localhost:8000/api/order/Order/${orderToCancel}/`,
    {
      delivery_status: "Canceled",
      status: selectedReason,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  .then((response) => {
    // Handle success
    console.log("Order updated:", response.data);
  })
  .catch((error) => {
    console.error("Error updating order:", error.response.data);
  });
  };
  
  const handleContinueShopping = () => {
    navigate("/");
  };
  // Filtering active, canceled, and previous orders based on delivery_status
  const activeOrders = orders.filter(
    (order) => order.delivery_status === "Processing" || order.delivery_status === "Shipped"
  );

  const canceledOrders = orders.filter(
    (order) => order.delivery_status === "Canceled"
  );

  const previousOrders = orders.filter(
    (order) => order.delivery_status === "Delivered"
  );

  return (
    <div className="order-summary-container">
      <h1 className="order-summary-title">Order Summary</h1>

      {error && <p className="order-summary-error">{error}</p>}

      {/* Continue Shopping Button */}
      <button
        className="continue-shopping-button common"
        onClick={handleContinueShopping}
      >
        <FaShoppingCart className="icon" /> Continue Shopping
      </button>

      {/* Active Orders Section */}
      {activeOrders.length > 0 && (
        <div>
          <h2>Active Orders</h2>
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${order.status === "Cancelled" ? "cancelled" : ""}`}
            >
              <div className={`order-content ${order.status === "Cancelled" ? "blurred" : ""}`}>
                {order.product.product_image && (
                  <img
                    src={order.product.product_image}
                    alt={order.product.product_name}
                    className="order-product-image"
                  />
                )}
                <div className="order-details">
                  <div className="order-detail">
                    <strong>{order.address.user_name || "N/A"}</strong>
                  </div>
                  <div className="order-detail">{order.address.user_address || "N/A"}</div>
                  <div className="order-detail">{order.product.product_name || "N/A"}</div>
                  <div className="order-detail">₹{order.total_price || "N/A"}</div>
                  <div className="order-detail">{order.payment_method || "N/A"}</div>
                  <div className="order-detail">{order.address.user_phone}</div>
                </div>
              </div>
              <div className="button-row">
                {order.status !== "Cancelled" && !order.canceled ? (
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelOrderPrompt(order.id)}
                  >
                    <FaTimes className="icon" /> Cancel Order
                  </button>
                ) : (
                  <button className="cancel-button disabled" disabled>
                    <FaTimes className="icon" /> Order Canceled
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previous Orders Section */}
      {previousOrders.length > 0 && (
        <div>
          <h2>Previous Orders</h2>
          {previousOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-content">
                {order.product.product_image && (
                  <img
                    src={order.product.product_image}
                    alt={order.product.product_name}
                    className="order-product-image"
                  />
                )}
                <div className="order-details">
                  <div className="order-detail">
                    <strong>{order.address.user_name || "N/A"}</strong>
                  </div>
                  <div className="order-detail">{order.address.user_address || "N/A"}</div>
                  <div className="order-detail">{order.product.product_name || "N/A"}</div>
                  <div className="order-detail">₹{order.total_price || "N/A"}</div>
                  <div className="order-detail">{order.payment_method || "N/A"}</div>
                  <div className="order-detail">{order.address.user_phone}</div>
                </div>
              </div>

              <div className="button-row">
                <button className="cancel-button disabled" disabled>
                  <FaTimes className="icon" /> Order Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Canceled Orders Section */}
      {canceledOrders.length > 0 && (
        <div>
          <h2>Canceled Orders</h2>
          {canceledOrders.map((order) => (
            <div key={order.id} className="order-card cancelled">
              <div className="order-content blurred">
                {order.product.product_image && (
                  <img
                    src={order.product.product_image}
                    alt={order.product.product_name}
                    className="order-product-image"
                  />
                )}
                <div className="order-details">
                  <div className="order-detail">
                    <strong>{order.address.user_name || "N/A"}</strong>
                  </div>
                  <div className="order-detail">{order.address.user_address || "N/A"}</div>
                  <div className="order-detail">{order.product.product_name || "N/A"}</div>
                  <div className="order-detail">₹{order.total_price || "N/A"}</div>
                  <div className="order-detail">{order.payment_method || "N/A"}</div>
                  <div className="order-detail">{order.address.user_phone}</div>
                </div>
              </div>

              <div className="button-row">
                <button className="cancel-button disabled" disabled>
                  <FaTimes className="icon" /> Order Canceled
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancellation Prompt Modal */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Cancel Order</h2>
            <p>Please select a reason for cancellation:</p>
            <select
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
            >
              <option value="">Select Reason</option>
              {cancellationReasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button onClick={handleConfirmCancelOrder}>Confirm Cancellation</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;