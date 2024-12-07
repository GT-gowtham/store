// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   InputAdornment,
//   TextField,
//   Typography,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   Badge,
// } from "@mui/material";
// import Logo from "../assets/hrmslogo.png";
// import Cookies from "js-cookie";
// import SearchIcon from "@mui/icons-material/Search";
// import PersonIcon from "@mui/icons-material/Person";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import MenuIcon from "@mui/icons-material/Menu";
// import { MainDiv, MainGrid } from "../styled/headerStyle";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Header = ({
//   cartItemCount,
//   likedProducts,
//   cartItems,

// }) => {
//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:960px)"); // Tablet view
//   const [username, setUsername] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [fmcg, setFmcg] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null); // For user dropdown

//   const navigate = useNavigate(); // Navigation for logout redirect

//   const handleFmcgOpen = (event) => setFmcg(event.currentTarget);
//   const handleFmcgClose = () => setFmcg(null);

//   const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const toggleDrawer = (open) => () => setDrawerOpen(open);

//   const isAnyProductLiked = likedProducts.length > 0;

//   const handleProfileMenuOpen = (event) => {
//     setProfileMenuAnchorEl(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setProfileMenuAnchorEl(null);
//   };

//   useEffect(() => {
//     const sessionId = Cookies.get('sessionid');
//     const csrfToken = Cookies.get("csrftoken");
  
//     if (sessionId) {
//       axios.post(
//         "http://localhost:8000/api/check-session/",
//         { session_id: sessionId },
//         {
//           headers: {
//             "X-CSRFToken": csrfToken,
//           },
//           withCredentials: true,
//         }
//       )
//         .then(response => {
//           if (response.data.username) {
//             setUsername(response.data.name + " " + response.data.name2);
//           }
//         })
//         .catch(error => {
//           console.error("Session verification error:", error);
//           setUsername(null);
//         });
//     }
//   }, []);

//   const handleLogout = () => {
//     axios
//       .post("http://localhost:8000/api/logout/", {}, { withCredentials: true })
//       .then(() => {
//         Cookies.remove("sessionKey"); // Clear session from cookies
//         localStorage.removeItem("sessionKey"); // Optional: Clear from localStorage if stored there
//         window.location.reload();  // Redirect to login page
//       })
//       .catch((error) => {
//         console.error("Error logging out:", error);
//       });
//   };

//   const handleSearchChange = async (event) => {
//     const query = event.target.value;
//     setSearchTerm(query);

//     if (query) {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/search/?query=${query}`);
//         setSearchResults(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleProductClick = (product) => {
//     navigate("/viewProduct", { state: { product } });
//     setSearchTerm("");  // Clear the search bar
//     setSearchResults([]);  // Clear the search results
//   };

//   const menuItems = [
//     <Link to="/" style={{ color: "black" }} key="home">
//       HOME
//     </Link>,
//     "IT PRODUCTS",
//     "AUTOMATION",
//     "HRMS",
//     "ACADEMY",
//     "FMCG",
//     <Link to="/about" style={{ color: "black" }} key="about">
//       ABOUT US
//     </Link>,
//     <Link to="/contact" style={{ color: "black" }} key="contact">
//       CONTACT US
//     </Link>,
//   ];

//   return (
//     <MainDiv>
//       <MainGrid />
//       <Grid container mt={2} alignItems="center">
//         <Grid
//           item
//           lg={3}
//           xs={7}
//           display="flex"
//           justifyContent={isTablet ? "" : "space-around"}
//         >
//           <img src={Logo} width={isTablet ? "150px" : "200px"} alt="Logo" />
//         </Grid>
//         {(isMobile || isTablet) && (
//           <Grid item xs={4} display="flex" justifyContent="end">
//             <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
//               <MenuIcon />
//             </IconButton>
//           </Grid>
//         )}
//         <Grid item lg={7} xs={8} display={isTablet ? "flex" : "block"}>
//           <TextField
//             value={searchTerm}
//             onChange={handleSearchChange}
//             hiddenLabel
//             placeholder="Search for products, brands and more"
//             variant="standard"
//             InputProps={{
//               style: {
//                 width: isMobile ? "25vh" : isTablet ? "40vh" : "100vh",
//                 border: "2px solid #e0e0e0",
//                 borderRadius: "50px",
//                 padding: "5px 20px",
//                 margin: isMobile ? "35px 20px 5px 20px" : "",
//                 marginTop: isTablet ? "30px" : "",
//               },
//               disableUnderline: true,
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//            {searchResults.length > 0 && (
//         <List>
//           {searchResults.map((product) => (
//             <ListItem
//               button
//               key={product.id}
//               onClick={() => handleProductClick(product)}
              
//             >
//               {product.product_name} 
//             </ListItem>
//           ))}
//         </List>
//       )}
//         </Grid>

//         {/* Profile Icon and Dropdown */}
//         <Grid item lg={0.5} xs={1.3} marginTop={isMobile || isTablet ? "3vh" : ""}>
//           <IconButton onClick={handleProfileMenuOpen}>
//             <PersonIcon />
//           </IconButton>
//           <Menu
//             anchorEl={profileMenuAnchorEl}
//             open={Boolean(profileMenuAnchorEl)}
//             onClose={handleProfileMenuClose}
//             PaperProps={{
//               elevation: 4,
//               style: { width: "20ch" },
//             }}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             {username ? (
//               <>
//                 <MenuItem 
//                   onClick={handleProfileMenuClose}
//                   style={{
//                     marginBottom: '10px',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Hey, 
//                   <span
//                     style={{
//                       color: 'red',
//                       fontWeight: 'bold',
//                       textShadow: '0 0 8px rgba(255, 0, 0, 0.8)',
//                       marginLeft: '5px',
//                     }}
//                   >
//                     {username}
//                   </span>
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => navigate("/ordersummary")}
//                   style={{
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Orders
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={handleLogout}
//                   style={{
//                     fontWeight: 'bold',
//                     color: '#ff5722',
//                     transition: 'transform 0.3s ease, color 0.3s ease',
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.color = '#d32f2f';
//                     e.target.style.transform = 'scale(1.1)';
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.color = '#ff5722';
//                     e.target.style.transform = 'scale(1)';
//                   }}
//                 >
//                   Logout
//                 </MenuItem>
//               </>
//             ) : (
//               <>
//                 <MenuItem onClick={handleProfileMenuClose}>Hello There</MenuItem>
//                 <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
//               </>
//             )}
//           </Menu>
//         </Grid>

//         <Grid item lg={0.5} xs={1.3} marginTop={isMobile || isTablet ? "3vh" : ""}>
//           <IconButton>
//             <Link to="/favorite" state={{ likedProducts: likedProducts }}>
//               <FavoriteIcon sx={{ cursor: "pointer", color: "red" }} />
//             </Link>
//           </IconButton>
//         </Grid>
//         <Grid item lg={0.5} xs={1} marginTop={isMobile || isTablet ? "3vh" : ""}>
//           <IconButton>
//             <Badge
//               badgeContent={cartItemCount}
//               sx={{
//                 "& .MuiBadge-badge": {
//                   color: "#fff",
//                   backgroundColor: "#550A35",
//                 },
//               }}
//             >
//               <Link
//                 to="/product"
//                 state={{
//                   cartItems: cartItems,
//                 }}
//               >
//                 <ShoppingCartOutlinedIcon />
//               </Link>
//             </Badge>
//           </IconButton>
//         </Grid>

//         <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
//           <List sx={{ width: 250 }}>
//             {menuItems.map((item, index) => (
//               <ListItem button key={index}>
//                 <Grid item lg={1}>
//                   <Typography
//                     fontWeight="bold"
//                     onMouseEnter={
//                       item === "IT PRODUCTS"
//                         ? handleMenuOpen
//                         : item === "FMCG"
//                         ? handleFmcgOpen
//                         : undefined
//                     }
//                     onClick={
//                       item === "IT PRODUCTS"
//                         ? handleMenuOpen
//                         : item === "FMCG"
//                         ? handleFmcgOpen
//                         : undefined
//                     }
//                     sx={{ cursor: "pointer" }}
//                   >
//                     {item}
//                   </Typography>
//                   {item === "IT PRODUCTS" && (
//                     <Menu
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl)}
//                       onClose={handleMenuClose}
//                       MenuListProps={{ onMouseLeave: handleMenuClose }}
//                     >
//                       <MenuItem onClick={handleMenuClose}>IT Service</MenuItem>
//                       <MenuItem onClick={handleMenuClose}>Automation</MenuItem>
//                       <MenuItem onClick={handleMenuClose}>FMCG</MenuItem>
//                       <MenuItem onClick={handleMenuClose}>HRMS Service</MenuItem>
//                       <MenuItem onClick={handleMenuClose}>Academy Courses</MenuItem>
//                     </Menu>
//                   )}
//                   {item === "FMCG" && (
//                     <Menu
//                       anchorEl={fmcg}
//                       open={Boolean(fmcg)}
//                       onClose={handleFmcgClose}
//                       MenuListProps={{ onMouseLeave: handleFmcgClose }}
//                     >
//                       <MenuItem onClick={handleFmcgClose}>
//                         <Link to="/" style={{ color: "black" }}>HomeCare</Link>
//                       </MenuItem>
//                       <MenuItem onClick={handleFmcgClose}>
//                         <Link to="/underconstruction" style={{ color: "black" }}>Personal Care</Link>
//                       </MenuItem>
//                       <MenuItem onClick={handleFmcgClose}>
//                         <Link to="/underconstruction" style={{ color: "black" }}>Automobile Care</Link>
//                       </MenuItem>
//                     </Menu>
//                   )}
//                 </Grid>
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>
//       </Grid>

//       {!isMobile && !isTablet && (
//         <Grid container justifyContent="center" alignItems="center" mt={6}>
//           {menuItems.map((item, index) => (
//             <Grid item lg={1} key={index}>
//               <Typography
//                 fontWeight="bold"
//                 textAlign="center"
//                 onMouseEnter={
//                   item === "IT PRODUCTS"
//                     ? handleMenuOpen
//                     : item === "FMCG"
//                     ? handleFmcgOpen
//                     : undefined
//                 }
//                 onClick={
//                   item === "IT PRODUCTS"
//                     ? handleMenuOpen
//                     : item === "FMCG"
//                     ? handleFmcgOpen
//                     : undefined
//                 }
//                 sx={{ cursor: "pointer" }}
//               >
//                 {item}
//               </Typography>
//               {item === "IT PRODUCTS" && (
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   MenuListProps={{ onMouseLeave: handleMenuClose }}
//                 >
//                   <MenuItem onClick={handleMenuClose}>IT Service</MenuItem>
//                   <MenuItem onClick={handleMenuClose}>Automation</MenuItem>
//                   <MenuItem onClick={handleMenuClose}>FMCG</MenuItem>
//                   <MenuItem onClick={handleMenuClose}>HRMS Service</MenuItem>
//                   <MenuItem onClick={handleMenuClose}>Academy Courses</MenuItem>
//                 </Menu>
//               )}
//               {item === "FMCG" && (
//                 <Menu
//                   anchorEl={fmcg}
//                   open={Boolean(fmcg)}
//                   onClose={handleFmcgClose}
//                   MenuListProps={{ onMouseLeave: handleFmcgClose }}
//                 >
//                   <MenuItem onClick={handleFmcgClose}>HomeCare</MenuItem>
//                   <MenuItem onClick={handleFmcgClose}>Personal Care</MenuItem>
//                   <MenuItem onClick={handleFmcgClose}>Automobile Care</MenuItem>
//                 </Menu>
//               )}
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </MainDiv>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import "./header.css";
import Logo from "../../assets/hrmslogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faHeart,
  faShoppingCart,
  faBars,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ cartItemCount, likedProducts }) => {
  const [showFMCGDropdown, setShowFMCGDropdown] = useState(false);
  const [showITProductsDropdown, setShowITProductsDropdown] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [username, setUsername] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = Cookies.get("sessionid");
    const csrfToken = Cookies.get("csrftoken");

    if (sessionId) {
      axios
        .post(
          "http://localhost:8000/api/check-session/",
          { session_id: sessionId },
          {
            headers: { "X-CSRFToken": csrfToken },
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.username) {
            setUsername(response.data.name + " " + response.data.name2);
          }
        })
        .catch(() => {
          setUsername(null);
        });
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);

  const handleLogout = () => {
    axios
      .post("http://localhost:8000/api/logout/", {}, { withCredentials: true })
      .then(() => {
        Cookies.remove("sessionKey");
        localStorage.removeItem("sessionKey");
        localStorage.removeItem("cartItems"); 
        window.location.reload();
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/search/?query=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleProductClick = (product) => {
    navigate("/viewProduct", { state: { productid: product.id } });
    setSearchTerm(""); // Clear the search bar
    setSearchResults([]); // Clear the search results
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search-results?query=${searchTerm}`); // Navigate to search results page
      setSearchResults([]);
      window.location.reload();
    }
  };
  return (
    <header>
      <div className="header-top">
        <div className="header-logo">
          <img src={Logo} alt="Logo" />
        </div>

        {!isMobile && (
        <div className="search-container" style={{ position: "relative", width: "100%" }}>
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      
        {/* Results Dropdown */}
        {searchResults.length > 0 && (
          <div
            className="search-results"
            style={{
              position: "absolute",
              top: "100%", // Position right below the input
              left: 0,
              right: 0,
              backgroundColor: "white",
              border: "1px solid #ccc",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              maxHeight: "300px", // Optional: Add scrolling for longer lists
              overflowY: "auto",
            }}
          >
            {searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  cursor: "pointer",
                  fontSize: "14px",
                  maxHeight: "300px", 
                  overflowy: "auto",
                }}
              >
                {product.product_name}
              </div>
            ))}
          </div>
        )}
      </div>
       
        )}

        <div className="header-icons">
          <IconButton onClick={handleProfileMenuOpen}>
            <FontAwesomeIcon icon={faUserCircle} />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            {username ? (
              <>
                <MenuItem onClick={handleProfileMenuClose}>
                  Hey, {username}
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleProfileMenuClose}>
                  Hello There
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
              </>
            )}
          </Menu>
          <a href="/favorite">
            <FontAwesomeIcon icon={faHeart} />
          </a>
          <Badge badgeContent={cartItemCount} color="secondary">
            <a href="/product">
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
          </Badge>
          {isMobile && (
            <IconButton onClick={toggleDrawer(true)}>
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          )}
        </div>
      </div>

      {!isMobile && (
        <div className="header-navbar">
          <Link to="/">HOME</Link>
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setShowITProductsDropdown(true)}
            onMouseLeave={() => setShowITProductsDropdown(false)}
          >
            <Link to="/">
              PRODUCTS
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            {showITProductsDropdown && (
              <div className="dropdown-menu">
                <Link to="/itProduct">ITPRODUCT</Link>
                <Link to="/">AUTOMATION</Link>
                <Link to="/">FMCG</Link>
                <Link to="/hrms ">HRMS</Link>
                <Link to="/">ACADEMYCOURSES</Link>
              </div>
            )}
          </div>
          <Link to="/underconstruction">AUTOMATION</Link>
          <Link to="/underconstruction">HRMS</Link>
          <Link to="/underconstruction">ACADEMY</Link>
          <div
            className="navbar-dropdown"
            onMouseEnter={() => setShowFMCGDropdown(true)}
            onMouseLeave={() => setShowFMCGDropdown(false)}
          >
            <Link to="/">
              FMCG
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
            {showFMCGDropdown && (
              <div className="dropdown-menu">
                <Link to="/underconstruction">HOMECARE</Link>
                <Link to="/underconstruction">PERSONALCARE</Link>
                <Link to="/underconstruction">AUTOMOBILECARE</Link>
              </div>
            )}
          </div>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT US</Link>
        </div>
      )}

      {/* Drawer for Mobile View */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="HOME" onClick={() => navigate("/")} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="IT PRODUCTS" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="AUTOMATION" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="HRMS" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="ACADEMY" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="FMCG" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="ABOUT" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="CONTACT US" />
          </ListItem>
        </List>
      </Drawer>
    </header>
  );
};

export default Header;
