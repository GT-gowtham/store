import React, { useState, useEffect } from "react";
import ShareIcon from '@mui/icons-material/Share';
import './Academyhome.css';
import technician from "../assets/academy/technician.png";
import softwareweb1 from "../assets/academy/softwareweb1.jpg";
import teaching from "../assets/academy/teaching.png";
import languages from "../assets/academy/languages.png";
import ownweb from "../assets/academy/ownweb.jpg";
import djangocourse from "../assets/academy/djangocourse.jpg";
import pythoncourse from "../assets/academy/pythoncourse.png";
import reactcourse from "../assets/academy/reactcourse.png";
import photoshopcourse from "../assets/academy/photoshopcourse.jpg";
import angularcourse from "../assets/academy/angularcourse.jpg";
import hifiacademylogo from "../assets/academy/hifiacademylogo.jpeg";
import perlcourse from "../assets/academy/perlcourse.jpg";
import ccourse from "../assets/academy/ccourse.png";
import cpluscourse from "../assets/academy/cpluscourse.png";
import vbnetcourse from "../assets/academy/vbnetcourse.jpg";
import autocadcourse from "../assets/academy/autocadcourse.jpg";
import fluttercourse from "../assets/academy/fluttercourse.jpg";
import tallyprimecourse from "../assets/academy/tallyprimecourse.jpg";
import coraldrawcourse from "../assets/academy/coraldrawcourse.png";
import htmlcssjscourse from "../assets/academy/htmlcssjscourse.jpg";
import homeautomationcourse from "../assets/academy/homeautomationcourse.jpg";
import mathscourse from "../assets/academy/mathscourse.jpg";
import tamilcourse from "../assets/academy/tamilcourse.png";
import spokenenglishcourse from "../assets/academy/spokenenglishcourse.jpg";
import { useNavigate } from 'react-router-dom';


const slides = [
    {
        image:softwareweb1,
        heading:" “ Software courses build the foundation for navigating the digital world with confidence.They empower you with skills to innovate, create, and solve real-world challenges.In a tech-driven era, mastering software opens doors to endless career opportunities.”",
        subheading: "SoftWare",
    },

    {
        image:teaching,
        heading: " “ A good tuition unlocks doors to knowledge, building bridges to brighter futures.With guidance and effort, every student can soar beyond limits.Tuition isn’t just about lessons; it’s about nurturing confidence and curiosity.Every question answered ignites a spark for a lifetime of learning.”",
        subheading: "Tuition",
    },
    {
        image: technician,
        heading: " “ Technicians are the backbone of modern infrastructure, ensuring systems run smoothly.They bridge the gap between complex technology and practical functionality.From repairs to innovations, technicians keep industries moving forward. ” ",
        subheading: "Technician",
    },
];

const courses = [
{title: "Python", hours: "60 Hourse",price: "7,000 /-",image: pythoncourse,level: "10 %", type: "Python" },
{title: "React",hours: "60 Hourse",  price: "9,000 /-",image: reactcourse, level: "10 %",type: "React"},  
{ title: "Django",hours: "60 Hourse", price: "10,000 /-", image: djangocourse,level: "10 %",type: "Django"},
{title: "HTML/CSS/JS", hours: "60 Hourse",price: "8,000 /-", image: htmlcssjscourse, level: "10 %",type: "HTML/CSS/JS"},
{title: "PhotoShop", hours: "60 Hourse", price: "9,600 /-", image: photoshopcourse, level: "10 %", type: "PhotoShop"},
{title: "Angular", hours: "60 Hourse", price: "9,000 /-",image: angularcourse, level: "10 %",type: "Angular"},  
];
const coursesnext = [
{title: "Perl", hours: "60 Hourse",price: "9,000 /-",image: perlcourse,level: "10 %",type: "Perl"  }, 
{title: "Flutter", hours: "60 Hourse",price: "7,200 /-",image: fluttercourse,level: "10 %",type: "Flutter"},
{title: "C",hours: "60 Hourse",price: "6,000 /-",image: ccourse,level: "10 %",type: "C"},
{title: "C++",hours: "60 Hourse", price: "6,000 /-",image: cpluscourse, level: "10 %",type: "C++" }, 
{title: "TallyPrime",hours: "60 Hourse", price: "6,000 /-",image: tallyprimecourse, level: "10 %",type: "TallyPrime"  },  
{title: "VB.NET", hours: "60 Hourse",price: "9,000 /-",image: vbnetcourse,level: "10 %",type: "VB.NET" },    
]
const coursesnextone= [
{ title: "CoralDraw", hours: "60 Hourse", price: "7,200 /-", image: coraldrawcourse,level: "10 %", type: "CoralDraw",},
{ title: "AutoCad",hours: "60 Hourse",price: "8,100 /-",image: autocadcourse,level: "10 %", type: "AutoCad"},
{title: "HomeAutomation",hours: "60 Hourse", price: "13,200 /-",  image: homeautomationcourse,  level: "10 %", type: "HomeAutomation"},
{ title: "MathsTuition",price: "10,000 /-",image: mathscourse,level: "10 %",type: "MathsTuition"},
{ title: "SpokenEnglish", hours: "60 Hourse", price: "6,000 /-",image: spokenenglishcourse,level: "10 %", type: "SpokenEnglish"},
{title: "TamilTuition",hours: "60 Hourse",price: "6,000 /-", image: tamilcourse,level: "10 %",  type: "TamilTuition"},
]



const Academyhome = () => {

    const [currentSlide, setCurrentSlide] = useState(0);

    // Handler for moving to the next slide
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    // Handler for moving to the previous slide
    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // Change slides every 5 seconds
        return () => clearInterval(timer);
    }, []);
    

    const navigate = useNavigate();

    const handleRegisterClick = (course) => {
      navigate("/registrationForm", { state: course });
    };
    return (
        <div>
            
            {/* Navigation Section */}
            <section className="navbar1">
                <div className="nav-item1">
                    Software
                    <span className="arrow1">▼</span>
                    <div className="dropdown1">
                        <div className="dropdown-item1">C</div>
                        <div className="dropdown-item1">C++</div>
                        <div className="dropdown-item1">C#</div>
                        <div className="dropdown-item1">Java</div>
                        <div className="dropdown-item1">Python</div>
                        <div className="dropdown-item1">PHP</div>
                        <div className="dropdown-item1">Django</div>
                        <div className="dropdown-item1">React</div>
                        <div className="dropdown-item1">HTML,CSS</div>
                        <div className="dropdown-item1">JavaScript</div>
                    </div>
                </div>               

                <div className="nav-item1">
                    Technical
                    <span className="arrow1">▼</span>
                    <div className="dropdown1">
                        <div className="dropdown-item1">CCTV</div>
                        <div className="dropdown-item1">Printer</div>
                        <div className="dropdown-item1">Laptop</div>
                    </div>
                </div>
                <div className="nav-item1">
                    Tuition
                    <span className="arrow1">▼</span>
                    <div className="dropdown1">
                        <div className="dropdown-item1">Maths</div>
                        <div className="dropdown-item1">Spoken English</div>
                        <div className="dropdown-item1">Tamil</div>
                    </div>
                </div>
                <div className="nav-item1">
                    Designing
                    <span className="arrow1">▼</span>
                    <div className="dropdown1">
                        <div className="dropdown-item1">PhotoShop</div>
                        <div className="dropdown-item1">Laravel</div>
                        <div className="dropdown-item1">CorelDRAW</div>
                    </div>
                </div>
            </section>

            
  <div className="hero-slider">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`slide ${
                        index === currentSlide
                            ? "active"
                            : index === (currentSlide - 1 + slides.length) % slides.length
                            ? "prev"
                            : ""
                    }`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="slide-content1">
                        <h2 className="h21">{slide.heading}</h2>
                        <p className="p1">{slide.subheading}</p>
                    </div>
                </div>
            ))}
            <div className="slider-controls">
                <button onClick={prevSlide}>Previous</button>
                <button onClick={nextSlide}>Next</button>
            </div>
        </div>


     <section className="think">  
  <div className="content1">
    <div className="image1">
      <img
        src={languages} // Replace with the actual image URL
        alt="Community benefits"
      />
    </div>
    <div className="text1">
      <h1>
      why choosing  programming language ? 
      </h1>
      <p>
      Choosing a programming language is essential for aligning with project goals, team expertise, 
      and performance needs. It depends on factors like ease of learning, community support, 
      and available libraries. Some languages are better suited for web development, 
      while others excel in data analysis or machine learning. Scalability and maintainability of code are also key considerations.
       Ultimately, the right language can enhance productivity and long-term project success.
      </p>

    </div>
  </div>
</section>

<section className="think">
  <div className="content1">
    <div className="text1">
      <h1>
      How do programming languages help in creating your own websites?
      </h1>
      <p>
      Programming languages provide the foundation for creating your own websites. 
      Learning languages like HTML, CSS, and JavaScript enables you to design 
      and structure web pages. With additional skills in backend languages like
       Python, PHP, or Node.js, you can build dynamic, interactive, and functional websites.
        Mastering these tools allows you to bring creative ideas to life and establish an online presence. With dedication,
       you can create professional, personalized websites from scratch.
      </p>
    
    </div>
    <div className="image1">
      <img
        src={ownweb} 
        alt="Community benefits"
      />
    </div>
  </div>

</section>



{/* Course Section */}


<div className="academy-homea">
  <h2>
    10% discount on <span className="highlighta">online</span> registration
  </h2>

  <div className="course-carousela">
    <div className="carousel-containera">
      {courses.map((course, index) => {
        const originalPrice = parseFloat(course.price.replace(/[^0-9]/g, '')) || 0;
        const discountAmount = (originalPrice * 10) / 100;
        const discountedPrice = originalPrice - discountAmount;
        return (
          <div key={index} className="course-carda">
            <img
              src={course.image}
              alt={course.title}
              className="course-imagea"
            />
            <div className="course-levela">{course.level}</div>
            <ShareIcon className="share-icona" />
            <div className="course-descriptiona">
              <p>📖 Course • {course.type}</p>
              <p>⏱ Hours • {course.hours}</p>
              <p>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{originalPrice.toLocaleString("en-IN")}/-
                </span>{" "}
                <span style={{ color: "#550a35", fontWeight: "bold" }}>
                  ₹{discountedPrice.toLocaleString("en-IN")}/-
                </span>
              </p>
              <h3 className="course-titlea">{course.title}</h3>
            </div>
            <button
                  className="register-buttona"
                  onClick={() => handleRegisterClick({ name: course.title, amount: discountedPrice })}
                >
                  Register Now
                </button>
          </div>
          
        );
      })}
    </div>
  </div>
</div>



<div className="academy-homea">
  <div className="course-carousela">
    <div className="carousel-containera">
      {coursesnext.map((course, index) => {
        const originalPrice = parseFloat(course.price.replace(/[^0-9]/g, '')) || 0;
        const discountAmount = (originalPrice * 10) / 100;
        const discountedPrice = originalPrice - discountAmount;
        return (
          <div key={index} className="course-carda">
            <img
              src={course.image}
              alt={course.title}
              className="course-imagea"
            />
            <div className="course-levela">{course.level}</div>
            {/* <ShareIcon className="share-icona" /> */}
            <div className="course-descriptiona">
              <p>📖 Course • {course.type}</p>
              <p>⏱ Hours • {course.hours}</p>
              <p>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{originalPrice.toLocaleString("en-IN")}/-
                </span>{" "}
                <span style={{ color: "#550a35", fontWeight: "bold" }}>
                  ₹{discountedPrice.toLocaleString("en-IN")}/-
                </span>
              </p>
              <h3 className="course-titlea">{course.title}</h3>
            </div>
            <button
                  className="register-buttona"
                  onClick={() => handleRegisterClick({ name: course.title, amount: discountedPrice })}
                >
                  Register Now
                </button>
          </div>
        );
      })}
    </div>
  </div>
</div>


<div className="academy-homea">
 <div className="course-carousela">
    {/* <ChevronLeftIcon className="carousel-icona" /> */}
    <div className="carousel-containera">
      {coursesnextone.map((course, index) => {
        // Ensure the price is a number by removing commas and non-numeric characters
        const originalPrice = parseFloat(course.price.replace(/[^0-9]/g, '')) || 0;
        const discountAmount = (originalPrice * 10) / 100;
        const discountedPrice = originalPrice - discountAmount;

        return (
          <div key={index} className="course-carda">
            <img
              src={course.image}
              alt={course.title}
              className="course-imagea"
            />
            <div className="course-levela">{course.level}</div>
            {/* <ShareIcon className="share-icona" /> */}
            <div className="course-descriptiona">
              <p>📖 Course • {course.type}</p>
              <p>⏱ Hours • {course.hours}</p>
              <p>
                <span style={{ textDecoration: "line-through", color: "red" }}>
                  ₹{originalPrice.toLocaleString("en-IN")}/-
                </span>{" "}
                <span style={{ color: "#550a35", fontWeight: "bold" }}>
                  ₹{discountedPrice.toLocaleString("en-IN")}/-
                </span>
              </p>
              <h3 className="course-titlea">{course.title}</h3>
            </div>
            <button
                  className="register-buttona"
                  onClick={() => handleRegisterClick({ name: course.title })}
                >
                  Register Now
                </button>         
                 </div>
          
        );
      })}
    </div>
   
  
  </div>
</div>    


    <section className="professional-sections">
      {/* Stylish Banner */}
      <div className="banners">
        <h1>
          Unlock Your <span className="highlights">Potential</span> with Us
        </h1>
        <p>
          Empowering learners to achieve excellence through innovative learning
          methods.
        </p>
      </div>

      {/* Image and Content Section */}
      <div className="content-wrappers">
        <div className="image-containers">
          <img src={hifiacademylogo} alt="Competence Development" />
        </div>
        <div className="text-containers">
          <div className="content-items">
            <h2>Development of Competences</h2>
            <p>
              Facilitates the integration of theoretical and practical
              knowledge.
            </p>
          </div>
          <div className="content-items">
            <h2>Skill Development</h2>
            <p>
              Students repeat the experiments until results are acceptable,
              solidifying their skills.
            </p>
          </div>
          <div className="content-items">
            <h2>Custom Follow-Up</h2>
            <p>
              Close interaction with each student, appreciating the skills
              developed.
            </p>
          </div>
          <div className="content-items">
            <h2>Independent Study</h2>
            <p>
              Facilitates independent study, connecting theoretical concepts to
              projects.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="bannerb">
      <div className="banner-contentb">
        <h1>100% Placement Service</h1>
      
        <p>Get certified and boost your career with our intensive program!</p>
        <button className="enroll-buttonb">SIGNUP NOW</button>
      </div>
    </section>
  


        </div>
    );
};

export default Academyhome;