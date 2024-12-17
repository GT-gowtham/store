import React, { useState } from 'react';
import './automation.css';
import smarthome3 from "../assets/automation/smarthome3.jpg";
import automationtaple from "../assets/automation/automationtaple.jpg";
import smarthomeapp from "../assets/automation/smarthomeapp.jpg";
import plcpowersupply from "../assets/automation/plcpowersupply.jpg";
import smartlocks from "../assets/automation/smartlocks.jpg";
import smartthermostats from "../assets/automation/smartthermostats.jpg";
import speakersalexa from "../assets/automation/speakersalexa.png";
import ringvideobell from "../assets/automation/ringvideobell.jpg";


function Automation() {

  const images = [
    { src: plcpowersupply, alt: "Look 1", height: "450px", width: "257px" },
    { src: smartlocks, alt: "Look 2", height: "550px", width: "320px" },
    { src: smartthermostats, alt: "Look 3", height: "650px", width: "370px" },
    { src: speakersalexa, alt: "Look 4", height: "550px", width: "320px" },
    { src: ringvideobell, alt: "Look 5", height: "450px", width: "270px" },
  ];


  return (
    
    <section>
    <section
    className="home-automation-section"
    style={{
      background: `url(${smarthome3}) no-repeat center center/cover`,
      height: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    <div className="overlay">
      <h1 className="main-heading">
        Your search for the perfect <br />
        <span className="highlight">Home Automation </span> <br />
        ends here!
      </h1>
    </div>
  </section>
{/* Top Text Section */}
<section className="text-sectionapptop">
        <p>
        What’s Home Automation, and How Does it Work?
        </p>
      </section>

      {/* Landscape Image Section */}
      <section className="image-sectionapp">
        <img src={smarthomeapp} alt="Home Automation Landscape" className="landscape-imageapp" />
      </section>
      

      {/* Bottom Text Section */}
      <section className="text-sectionappbottom">
  <p className="white-text">
    If you think home automation is a futuristic dream, think again — ongoing advances in smart technology have made it easier than ever to customize and control the appliances, devices, and systems that run your home.
  </p>
</section>


      {/* Landscape Image Section */}
      <section className="image-section">
        <img src={automationtaple} alt="Home Automation Landscape" className="landscape-image" />
      </section>
  
      <section className="text-section">
        <p>
        No longer the exclusive domain of commercial buildings and tech-savvy homeowners living in high-end residences, 
        home automation is remarkably intuitive, increasingly accessible, and totally comprehensive: in short, it has a little something to offer everyone. 

        But what exactly is home automation, and how does it work? Here’s what you should know about the next frontier in home customization, efficiency, comfort, and protection.</p>
        <p>
          But what exactly is home automation, and how does it work? Here’s what you should know about the next frontier in home customization: efficiency, comfort, and protection.
        </p >
        <h2 className='contentheading'>
        Home Automation 101 :
        </h2>
        <p>
        The term “home automation” is used to describe a system of networked, 
        controllable devices that work synergistically to make your home environment more comfortable,
         energy-efficient, and secure. 

Also known as domotics — the Latin domus, or “home,”
 combined with the Greek suffix otics, meaning “of, relating to,
  or characterized by an action or process” — home automation allows you to monitor 
  and manage your appliances, lighting, heating, cooling, and security systems, 
  and so much more via the internet, remote control, or smart device. 

Simply put, home automation uses smart technology to give you full control over your home’s utilities,
 features, and systems. It’s designed to help you minimize energy waste, save money, keep your house,
  property, and family secure, streamline daily tasks, and simplify your life. 

        </p>
        <h2 className='contentheading'>
        Smart Home Technology :
        </h2>
        <p>
        Even if you’ve never heard of home automation before, 
        chances are you already have at least one device or system 
        that uses smart technology in your house: the most popular stand-alone elements of home automation 
        are programmable thermostats, smart lighting systems, remote controllable window shades, 
        smart televisions, and wireless audio systems.  

Smart home technology falls into two general categories: 
        </p>
        <h2 className='contentheading'>
        Basic smart devices :
        </h2>
        <p>
        Easily programmed through an intuitive user interface, basic smart devices operate
         without network connectivity (Bluetooth, LTE, or Wi-Fi). A smart coffee maker that automatically 
         brews your first cup of coffee at a specific time is one example; 
        a programmable thermostat that you set solely via its own keypad is another. 
        </p>
        <h2 className='contentheading'>
        Smart connected devices :
        </h2>
        <p>
        Smart connected devices are controlled and monitored remotely via network connectivity. 
        A smart refrigerator with an interactive touchscreen and high-tech whiteboard is one example; 
        smart security, lighting, heating, and cooling systems are other examples. 

You can manage and control smart connected devices from your smartphone, tablet, or laptop whether 
you’re at home, at the office, or thousands of miles away.
        </p>
        <h2 className='contentheading'>
        Home Automation Elements :
        </h2>
        <p>
        Complete home automation ties smart connected devices and systems together to create a smart home.
         Each component of a home automation system has three main elements:
        </p >
        <h2 className='contentheading'>
        Sensors :
        </h2>
        <p>
        Home automation systems have high-tech sensors that monitor voice and motion detection as well as changes in time, daylight, and temperature, among other things. 
        Once you program the settings of your system as desired, the sensors keep the automation gears in motion.
        </p>
        <h2 className='contentheading'>
        Actuators :
        </h2>
        <p>
        Actuators are the physical mechanisms (switches, motors, and motorized valves) that control 
        the function of your home automation system.
         Smart actuators are activated and programmed by remote commands from a controller.
        </p>
        <h2 className='contentheading'>
        Controllers :
        </h2>
        <p>
        Home automation controllers are the devices (smartphones, tablets, or computers) that you use 
        to send and receive messages about the status of the smart technology 
        and automated features in your home. Controllers allow you to interact with your system from anywhere. 
        </p>
        <h2 className='contentheading'>
        A Home that Works… For You :
        </h2>
        <p>
        Using these three essential elements, your smart home can take center stage in a wide range of scenarios. 
        
        You may program your system to perform timed tasks like lowering the blinds at 7:30 p.m. or automatically 
        adjusting the temperature when you leave for work, for example. 

You may program it to respond to a specific prompt, otherwise known as a triggered event. For example,
 you can program your system to unlock your smart lock and illuminate specific smart
  lights when you approach your front door with your smartphone.  

You can also use your system to rectify unexpected problems remotely,
 like turning your oven off or shutting your garage door after you’ve left your house.

Home automation systems offer a variety of customizable services and functions. 
Some of the most requested features are:
        </p>
        <h2 className='contentheading'>
        Comfort and efficiency :
        </h2>
        <p>
        <ul>
    <li>Remote lighting control</li>
    <li>Remote temperature control</li>
    <li>Remote appliance control</li>
    <li>Automated sprinkler systems</li>
</ul>

        </p>
        <h2 className='contentheading'>
        Safety and security :
        </h2>
        <p>
        <li>Fire and carbon monoxide monitoring</li>
    <li>Smart cameras and security systems</li>
    <li>Live video surveillance and keyless entry</li>

        </p>
        <h2 className='contentheading'>
        Convenience and ease :
        </h2>
        <p>
        <li>Real-time text and email alerts</li>
    <li>Voice-activated command and control</li>
    <li>Digital personal assistant integration</li>
While a completely automated home might have all the above (and more), 
one of the best features of home automation 
is its customizability — you can make your system as basic or as extensive as you’d like. 
        </p>
      </section>


      <section className="text-sectionapptop">
        <p>
       Products Sales & Automation Services .
        </p>
      </section>

      <section className="shop-the-lookhome">
 
  {images.map((image, index) => (
    <div key={index} className="image-containerhome" style={{ height: image.height, width: image.width }}>
      <img src={image.src} alt={image.alt} />
      
    </div>
  ))}
</section>

<section className="automationfooterhome">
  <h2 className="section-headinghome">
  "Which button are you going to choose? The choice is yours."</h2>
  <div className="button-containerhome">
    <button className="sign-in-buttonhome1">Shop Now</button>
    <button className="sign-in-buttonhome2">Book Now</button>
  </div>
</section>


  </section>
  );
}

export default Automation;