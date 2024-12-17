import React, { useState, useEffect } from 'react';
import './overhomepage.css';
import laptop from "../assets/itproducts/laptop.png";
import printer from "../assets/itproducts/printer.jpg";
import camera from "../assets/itproducts/camera.jpg";
import monitorslide from "../assets/itproducts/monitorslide.png";
import projector from "../assets/itproducts/projector.jpg";
import wifirooter from "../assets/itproducts/wifirooter.jpg";
import liquiddetergentsingle from "../assets/fmcg/liquiddetergentsingle.jpeg";
import floorcleaner from "../assets/fmcg/floorcleaner.png";
import glasscleaner from "../assets/fmcg/glasscleaner.png";
import dishwashgel from "../assets/fmcg/dishwashgel.png";
import ToiletCleaner from "../assets/fmcg/ToiletCleaner.png";
import fabricconditioner from "../assets/fmcg/fabricconditioner.png";
import Handwash from "../assets/fmcg/Handwash.jpg";
import liquiddetergent from "../assets/fmcg/liquiddetergent.jpeg";
import keyboardwired from "../assets/itproducts/keyboardwired.jpeg";
import earbuds from "../assets/itproducts/earbuds.jpeg";
import mousewireless from "../assets/itproducts/mousewireless.jpeg";
import mousewired from "../assets/itproducts/mousewired.jpeg";
import temperglass from "../assets/itproducts/temperglass.jpeg";
import buletoothheadset from "../assets/itproducts/buletoothheadset.jpg";
import headset from "../assets/itproducts/headset.jpeg";
import inkbottles from "../assets/itproducts/inkbottles.png";
import motherboard from "../assets/itproducts/motherboard.jpeg";
import chargingadopter from "../assets/itproducts/chargingadopter.jpeg";
import chargingcaple from "../assets/itproducts/chargingcaple.jpeg";
import extensionbox from "../assets/itproducts/extensionbox.jpeg";
import lanextension from "../assets/itproducts/lanextension.png";
import laptopadopter from "../assets/itproducts/laptopadopter.jpeg";
import capleaudioadapter from "../assets/itproducts/capleaudioadapter.jpg";
import scannerhead from "../assets/itproducts/scannerhead.jpeg";
import cctvsalesandservices from "../assets/itproducts/cctvsalesandservices.png";
import teachingslideimage from "../assets/academy/teachingslideimage.png";
import networkslideimage from "../assets/itproducts/networkslideimage.jpg";
import lapwithmonitorslideimage from "../assets/itproducts/lapwithmonitorslideimage.jpg";
import fmcgslideimage from "../assets/fmcg/fmcgslideimage.png";
import homeautomationslideimage from "../assets/automation/homeautomationslideimage.jpg";
import cctvslideimage from "../assets/itproducts/cctvslideimage.jpg";
import hrmsslideimage from "../assets/itproducts/hrmsslideimage.png";
import automationtouchpanel from "../assets/automation/automationtouchpanel.jpg";
import automationvoicecontroller from "../assets/automation/automationvoicecontroller.jpeg";
import automationswitch from "../assets/automation/automationswitch.jpeg";
import automationsonafaswitch from "../assets/automation/automationsonafaswitch.jpg";


const HomePage = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      bgColor: "#003366",
      title: "Laptop.Monitor Sales & Services!",
      image: lapwithmonitorslideimage,
    },
    {
      id: 2,
      bgColor: "#512E5F",
      title: "Nerwork Services",
      image: networkslideimage,
    },
    {
      id: 3,
      bgColor: "#B8860B",
      title: "Academy Courses",
      image: teachingslideimage,
    },
    {
      id: 4,
      bgColor: "#006400",
      title: "HomecareProducts  Sales!",
      image: fmcgslideimage,
    },
    {
      id: 5,
      bgColor: "#4B0082",
      title: "HomeAutomatios Services & Products Sales !",
      image: homeautomationslideimage,
    },
    {
      id: 6,
      bgColor: "#800000",
      title: "CCTV Sales & Services !",
      image: cctvslideimage,
    },
    {
      id: 7,
      bgColor: "#343434",
      title: "HRMS Services !",
      image: hrmsslideimage,
    },

  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };
  const cards = [
    { title: "LiquidDetergent", image: liquiddetergentsingle },
    { title: "GlassCleaner", image: glasscleaner },
    { title: "FloorCleaner", image: floorcleaner },
    { title: "DidhwashGel", image: dishwashgel },
    { title: "ToiletCleaner", image: ToiletCleaner },
    { title: "FabricConditioner", image: fabricconditioner },
    { title: "HandWash", image: Handwash},
    { title: "LiquidDetergent", image: liquiddetergent },

  ];

  const categories = [
    {
      title: "Automation Products",
      items: [
        { name: "TouchPanel", image: automationtouchpanel, offer: "New Collection" },
        { name: "VoiceController", image: automationvoicecontroller, offer: "Min. 50% Off" },
        { name: "Switches", image:automationswitch, offer: "Min. 50% Off" },
        { name: "AutomationSwitch", image:automationsonafaswitch, offer: "Special offer" },
      ],
    },
  ];

  const productss = [
    { title: "WiredKeyboard", discount: "50-70% OFF", imgSrc: keyboardwired },
    { title: "Earbuds", discount: "50-70% OFF", imgSrc: earbuds },
    { title: "WirelessMouse", discount: "40-80% OFF", imgSrc: mousewireless },
    { title: "WiredMouse", discount: "40-70% OFF", imgSrc: mousewired },
    { title: "TemperGlass", discount: "40-70% OFF", imgSrc:temperglass },
    { title: "BluethoothHeadset", discount: "UP TO 60% OFF", imgSrc: buletoothheadset },
    { title: "WiredHeadSet", discount: "40-70% OFF", imgSrc: headset },
    { title: "Inkbottles", discount: "40-80% OFF", imgSrc: inkbottles },
    { title: "Motherboard", discount: "UP TO 70% OFF", imgSrc:motherboard },
    { title: "ChargingAdopter", discount: "UP TO 80% OFF", imgSrc:chargingadopter },
    { title: "ChargingCaple", discount: "UP TO 60% OFF", imgSrc:chargingcaple },
    { title: "Extensionbox", discount: "UP TO 60% OFF", imgSrc: extensionbox },
    { title: "LanExtension", discount: "UP TO 60% OFF", imgSrc: lanextension },
    { title: "LanAdopter", discount: "UP TO 60% OFF", imgSrc: laptopadopter },
    { title: "CaapleAudioAdopter", discount: "UP TO 60% OFF", imgSrc: capleaudioadapter },
    { title: "ScannerHead", discount: "UP TO 60% OFF", imgSrc: scannerhead },
  ];
  const offers = [
    { id: 1, image: laptop, text: 'LAPTOP' },
    { id: 2, image: printer, text: 'PRINTER' },
    { id: 3, image: camera, text: 'CCTV' },
    { id: 4, image: monitorslide, text: 'MONITOR' },
    { id: 5, image: projector, text: 'PROJECTOR' },
    { id: 6, image: wifirooter, text: 'WIFIROOTER' },
    { id: 7, image: liquiddetergentsingle, text: 'WIFIROOTER' },
    { id: 8, image: glasscleaner, text: 'WIFIROOTER' },
    { id: 9, image: dishwashgel, text: 'WIFIROOTER' },
    { id: 10, image: floorcleaner, text: 'WIFIROOTER' },
  ];

  // Auto-slide effect
  useEffect(() => {
      const timer = setInterval(() => {
          nextSlide();
      }, 5000); 
      return () => clearInterval(timer);
  }, []);

  const handleCall = () => {
   
    window.location.href = "tel:+04612331483"; 
  };

  return (

    <div className="homepage">

<div
  className="call-button"
  onClick={handleCall}
  style={{ fontSize: '32px' }} 
>
  📞
</div>

 
 {/* Navigation Section */}
<section className="navbar">

  <div className="nav-item">

     Mobiles
    <span className="arrow1">▼</span>
    <div className="dropdown">
      <div className="dropdown-item">Headphone</div>
      <div className="dropdown-item">Temper</div>
      <div className="dropdown-item">Cover</div>
      <div className="dropdown-item">ChargerCable</div>
      <div className="dropdown-item">Adapter</div>
    
    </div>
  </div>
  <div className="nav-item">
   
     Printer
    <span className="arrow1">▼</span>
    <div className="dropdown">
      <div className="dropdown-item">Toner</div>
      <div className="dropdown-item">Ink</div>
      <div className="dropdown-item">Printer(HP)</div>
      <div className="dropdown-item">Printer(Canon)</div>
    </div>
  </div>
  <div className="nav-item">
   
    CCTV
    <span className="arrow1">▼</span>
    <div className="dropdown">
      <div className="dropdown-item">Camera</div>
      <div className="dropdown-item">DVR</div>
      <div className="dropdown-item">NVR</div>
      <div className="dropdown-item">SMPS</div>
      <div className="dropdown-item">CameraCables</div>
    </div>
  </div>
  <div className="nav-item">
    
     Labtop
    <span className="arrow1">▼</span>
    <div className="dropdown">
      <div className="dropdown-item">Battery</div>
      <div className="dropdown-item">Keyboard</div>
      <div className="dropdown-item">TouchBad</div>
      <div className="dropdown-item">Connector</div>
      <div className="dropdown-item">HardDisk</div>
      <div className="dropdown-item">TouchBad</div>
    </div>
  </div>
  <div className="nav-item">
  
   Home
  <span className="arrow1">▼</span>
    <div className="dropdown">
      <div className="dropdown-item">LiquidDetergent</div>
      <div className="dropdown-item">FloorCleaner</div>
      <div className="dropdown-item">HandWash</div>
      <div className="dropdown-item">FabricConditioner</div>
      <div className="dropdown-item">ToiletCleaner</div>
      <div className="dropdown-item">DishwashGel</div>
    </div>
  </div>
</section>


<div className="c-carousel">
      <div
        className="c-slide"
        style={{ backgroundColor: banners[currentSlide].bgColor }}
      >
        <div className="c-content">
          <h1>{banners[currentSlide].title}</h1>
          <p>{banners[currentSlide].description}</p>
          <div className="c-buttons">
            <button className="c-btn">{banners[currentSlide].button1}</button>
            <button className="c-btn">{banners[currentSlide].button2}</button>
          </div>
        </div>
        <div className="c-image">
          <img src={banners[currentSlide].image} alt={banners[currentSlide].title} />
        </div>

      </div>
     
      <div className="c-indicators">
        {banners.map((_, index) => (
          <span
            key={index}
            className={`c-indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          >
          </span>
        ))}
      </div>
    </div>



    <section className="offer-zone">
  <h2>Our Top Products</h2>
  <div className="offer-slider">
    <div className="offer-wrapper">
      {[...offers, ...offers].map((offer, index) => (
        <div className="offer-card" key={index}>
          <img src={offer.image} alt={offer.text} />
        </div>
      ))}
    </div>
  </div>
</section>




<div className="products-container">
  <h2 className="our-products-heading">Our Products</h2>
  <section className="product-grid">
    {productss.map((product, index) => (
      <div className="product-card" key={index}>
        <img src={product.imgSrc} alt={product.title} className="product-image" />
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>

          <button className="shop-now-button">Shop Now</button>
        </div>
      </div>
    ))}
  </section>
</div>


    <section className="categories-sectionj">
      {categories.map((category, index) => (
        <div className="categoryj" key={index}>
          <div className="category-headerj">
            <h2>{category.title}</h2>
            <button className="see-morej">➔</button>
          </div>
          <div className="category-gridj">
            {category.items.map((item, idx) => (
              <div className="product-cardj" key={idx}>
                <img src={item.image} alt={item.name} />
                <p className="product-namej">{item.name}</p>
                <p className="product-offerj">{item.offer}</p>
              </div>
            ))}
          </div>
        </div>
      ))}


<section className="card-sectionh">
  <h1 className="card-heading">FMCG PRODUCTS</h1>
  <div className="card-grid">
    {cards.map((card, index) => (
      <div key={index} className="card">
        <div className="card-title">{card.title}</div>
        <img src={card.image} alt={card.title} className="card-image" />
        <button className="card-button">Shop Now</button> 
      </div>
    ))}
  </div>
</section>



      {/* Banner Section */}
      <div className="ad-bannerj">
        <div className="ad-contentj">
          <h2>"A watchful eye today ensures a safer tomorrow."</h2>
          <br></br>
          <button className="explore-buttonj">BuyNow ➔</button>
        </div>
        <img
          src={cctvsalesandservices}
          alt="Sports Equipment"
          className="ad-imagej"
        />
      </div>
    </section>
   

<section className="recommendationsbt">
      <h2>See personalized recommendations</h2>
      <button className="sign-in-buttonbt">Sign in</button>
      <p className="new-customerbt">
        New customer? <a href="/register">Start here.</a>
      </p>
    </section>

    </div>
  );
};
export default HomePage;