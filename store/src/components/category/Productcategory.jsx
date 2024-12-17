import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Snackbar, useMediaQuery } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from "axios";
import Cookies from "js-cookie";
import './ProductCategory.css';

function Productcategory () {
  const { category } = useParams(); 
  const isMobile = useMediaQuery("(max-width:600px)");
  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [snackbarColor, setSnackbarColor] = useState("green"); // Default color
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = () => setOpenSnackbar(false);
  const [message, setMessage] = useState("");
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts(category);
    fetchProductsByCategory();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const sessionId = Cookies.get('sessionid');
    const csrfToken = Cookies.get("csrftoken");
    if (sessionId) {
      axios.post(
        "http://localhost:8000/api/check-session/",
        { session_id: sessionId },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      )
        .then(async response => {
          if (response.data.username) {
            setUserId(response.data.user_id);
            getWishlist(response.data.user_id);
            getCart(response.data.user_id); // Fetch both products and wishlist when the component mounts
        
            // Get the cart count from localStorage and update the state
            const savedCartCount = localStorage.getItem("cartCount");
            // if (savedCartCount) {
            //   onUpdateCartItemCount(parseInt(savedCartCount, 10));
            // }
          }
        })
        .catch(error => {
          console.error("Session verification error:", error);
          setUserId(null);
        });
    }
    axios
    .get("http://localhost:8000/api/product/products/") // Replace with your API endpoint
    .then((response) => {
      setItems(response.data); // Set items in state
    })
    .catch((error) => {
      console.error('Error fetching items:', error); // Handle errors
    });
  }, [category]);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product/products/");
      const productsData = response.data;

      // Group products by category
      const grouped = productsData.reduce((acc, product) => {
        const category = product.product_category || "Uncategorized";
        if (!acc[category]) acc[category] = [];
        acc[category].push(product);
        return acc;
      }, {});

      setGroupedProducts(grouped);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

    const getProducts = async (category) => {
      const response = await fetch(`http://localhost:8000/api/search_category/?category=${category}`);
      const data = await response.json();
      setProducts(data);
    };

    const getWishlist = async (userId) => {
      try {
        const response = await axios.get("http://localhost:8000/api/wishlist/Wishlist/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const filteredwishlist = response.data.filter(
          (wishlist) => wishlist.wishlist_id == userId
        );
        setWishlistProducts(filteredwishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    // Fetch cart products
    const getCart = async (userId) => {
      try {
        const response = await axios.get("http://localhost:8000/api/cart/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const cartData = response.data.filter(
          
          (cart) => cart.cart_id == userId
        );
        
        setCartProducts(cartData);
        console.log(cartData)
        if (cartData.length > 0) {
          localStorage.setItem("cartCount", cartData.length);
        } else {
          localStorage.removeItem("cartCount");
        }
  
        // onUpdateCartItemCount(cartData.length); // Update cart count
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    // Check if a product is in the wishlist
    const isProductInWishlist = (productId) => {
      return wishlistProducts.some(
        (wishlistItem) => wishlistItem.wishlist_product_id === productId
      );
    };
  
    // Check if a product is in the cart
    const isProductInCart = (productId) => {
      return cartProducts.some(
        (cartItem) => cartItem.cart_product_id === productId
      );
    };
  
    // Handle like button (add/remove from wishlist)
    const handleLikeClick = async (product) => {
      if (isProductInWishlist(product.id)) {
        const wishlistItem = wishlistProducts.find(
          (item) => item.wishlist_product_id === product.id
        );
        try {
          await axios.delete(
            `http://localhost:8000/api/wishlist/Wishlist/${wishlistItem.id}/`,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setWishlistProducts(
            wishlistProducts.filter((item) => item.id !== wishlistItem.id)
          );
        } catch (error) {
          console.error("Error removing from wishlist:", error);
        }
      } else {
        try {
          const response = await axios.post(
            "http://localhost:8000/api/wishlist/Wishlist/",
            {
              wishlist_id: userId,
              wishlist_product_id: product.id,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          setWishlistProducts([...wishlistProducts, response.data]);
        } catch (error) {
          console.error("Error adding to wishlist:", error);
        }
      }
    };
  
    // Handle Add to Cart click
    const handleAddToCartClick = async (product) => {
      if (product.product_stock < 1) {
        setMessage(`${product.product_name} is out of stock!`);
        setSnackbarColor("red");
        setOpenSnackbar(true);
        return;
      }
  
      if (isProductInCart(product.id)) {
        setMessage(`${product.product_name} is already in your cart.`);
        setSnackbarColor("red");
        setOpenSnackbar(true);
        return;
      }
  
      try {
        const response = await axios.post(
          "http://localhost:8000/api/cart/",
          {
            cart_id: userId,
            cart_product_id: product.id,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
  
        setMessage(`${product.product_name} added to the cart successfully!`);
        setSnackbarColor("green");
        setOpenSnackbar(true);
        getCart(); // Refresh the cart list
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };
    const handleProductClick = (product) => {
      navigate("/viewProduct", { state: { productid: product.id } });
      console.log( "productid is", product.id );
    };

    const filterbycategory = async (category) => {
      try {
        navigate(`/category/${category}`);
        const response = await axios.get("http://localhost:8000/api/product/products/", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const filteredProducts = response.data.filter(
          (product) => product.product_category === category
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    const filterByCategory = (category) => {
      navigate(`/category/${category}`);
  };

  return (
    <div><h1>Search Results for "{category}"</h1>
    <div className="product-gridd1"
    style={{
      marginLeft: isMobile ? "" : "10vh",
      marginRight: isMobile ? "" : "10vh",
      marginTop: "5vh",
    }}
  >
 <div className="category-links1">
 <h1>Explore Categories</h1>
 {Object.keys(groupedProducts).map((categoryName) => (
   <a    
     href={`#${categoryName}`}
     key={categoryName} 
     className="category-link-button1"
     onClick={() => filterbycategory(categoryName)}
   >
     {categoryName}<br></br>
   </a>
 ))}
</div>
    <div className="product-list1">
      {products.map((product) => (
        <div key={product.id} className="product-item1">
          
          <div
            className="favorite-button1"
            onClick={() => handleLikeClick(product)}
            style={{
              color: isProductInWishlist(product.id) ? "red" : "black",
              border: "none",
              background: "none",
            }}
          >
            {isProductInWishlist(product.id) ? "❤" : "♡"}
          </div>
          <div onClick={() => handleProductClick(product)}>
            <img
              src={product.product_image}
              alt={product.product_name}
              className="product-image1"
            />
          </div>
          <p className="product-name1">
            <span style={{ fontWeight: "bold" }}>{product.product_name}</span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "10px",
                marginLeft: "10px",
              }}
            >
              {" "}
              {product.product_qty}
            </span>
          </p>
          <a 
            href="#" 
            className="product-category-link1" 
            onClick={(e) => {
              e.preventDefault(); // Prevent default link behavior
              filterByCategory(product.product_category);
            }}
          >
            {product.product_category} Category
          </a>
          <p className="product-price1">
            <CurrencyRupeeIcon
              style={{ paddingTop: "-10px", fontSize: "15px" }}
            />
            {product.product_price}
            <span
              style={{ marginLeft: "10px", textDecoration: "line-through" }}
            >
              {product.docorprice}
            </span>
          </p>
          <div className="buttons1">
            <button
              className="buy-now1"
              onClick={() => handleProductClick(product)}
            >
              View Product
            </button>

            <button
              className="cart1"
              onClick={() => handleAddToCartClick(product)}
            >
              Add Cart
            </button>
          </div>
        </div>
      ))}
           <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={openSnackbar}
      onClose={handleCloseSnackbar}
      message={message}
      autoHideDuration={3000}
      sx={{
        "& .MuiSnackbarContent-root": {
          backgroundColor: snackbarColor,
        },
      }}
      />
    </div>
  </div>
</div>
);
}

export default Productcategory;