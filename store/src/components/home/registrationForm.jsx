import React, { useState } from "react";
import axios from "axios";
import "./registrationForm.css";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [college, setCollege] = useState("");
  const [qualification, setQualification] = useState("");
  const [yearPassing, setYearPassing] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [courseTiming, setCourseTiming] = useState("");
  const [onlineOffline, setOnlineOffline] = useState("");
  
 

  // State for form errors
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const course = location.state || { name: ""};

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = "Full Name is required";
    if (!email) errors.email = "Email is required";
    if (!age) errors.age = "Age is required";
    if (!phone) errors.phone = "Phone number is required";
    if (!dob) errors.dob = "Date of Birth is required";
    if (!gender) errors.gender = "Gender is required";
    if (!permanentAddress) errors.permanentAddress = "Permanent Address is required";
    if (!residentialAddress) errors.residentialAddress = "Residential Address is required";
    if (!college) errors.college = "College is required";
    if (!qualification) errors.qualification = "Qualification is required";
    if (!yearPassing) errors.yearPassing = "Year of Passing is required";
    if (!joiningDate) errors.joiningDate = "Joining Date is required";
    if (!courseTiming) errors.courseTiming = "Course Timing is required";
    if (!onlineOffline) errors.onlineOffline = "Online/Offline option is required";
  

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm();
    setFormErrors(errors);

    // If no errors, submit the form
    if (Object.keys(errors).length === 0) {
      const datas = {
        full_name: name,
        email: email,
        age: age,
        phone_no: phone,
        dob: dob,
        gender: gender,
        permanent_address: permanentAddress,
        residential_address: residentialAddress,
        school_college: college,
        qualification: qualification,
        year_of_passing: yearPassing,
        joined_course: course.name,
        joining_date: joiningDate,
        course_timing: courseTiming,
        online_offline: onlineOffline,
      
      };

      try {
        const csrfToken = Cookies.get("csrftoken");
        const response = await axios.post("http://127.0.0.1:8000/api/registration/registration/", datas, {
          headers: {
            'Content-Type': 'application/json',
             "X-CSRFToken": csrfToken,  // Get the CSRF token from the browser's cookies
          },
        });

        if (response.status === 201) {
          setName('');
          setEmail('');
          setAge('');
          setPhone('');
          setDob('');
          setGender('');
          setPermanentAddress('');
          setResidentialAddress('');
          setCollege('');
          setQualification('');
          setYearPassing('');
          setJoiningDate('');
          setCourseTiming('');
          setOnlineOffline('');
       
          setFormErrors({});
          setSubmitted(true);
        }

        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Submission error:", error);
      }
    }
  };

  return (
    <div className="form-container">
      
      <h1 className="form-title">
        REGISTRATION <span className="highlight">FORM</span>
      </h1>
      <p className="form-subtitle">
      கற்க கசடற கற்பவை கற்றபின்
      நிற்க அதற்குத் தக.
      </p>

      <form onSubmit={handleSubmit}>
        <section className="form-section">
          <h2>PERSONAL INFORMATION</h2>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {formErrors.name && <p className="error" style={{color:"red"}}>{formErrors.name}</p>}
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {formErrors.email && <p className="error" style={{color:"red"}}>{formErrors.email}</p>}
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
            {formErrors.age && <p className="error" style={{color:"red"}}>{formErrors.age}</p>}
            <label>Phone No:</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            {formErrors.phone && <p className="error" style={{color:"red"}}>{formErrors.phone}</p>}
          </div>
          <div className="form-group dob-group">
            <label>Date of Birth:</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            {formErrors.dob && <p className="error" style={{color:"red"}}>{formErrors.dob}</p>}
          </div>
          <div className="form-group gender-group">
  <label>Gender:</label>
  <select
    name="gender"
    value={gender}
    onChange={(e) => setGender(e.target.value)}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  {formErrors.gender && <p className="error" style={{ color: "red" }}>{formErrors.gender}</p>}
</div>

        </section>

        <section className="form-section">
          <h2>ADDRESS</h2>
          <div className="form-group">
            <label>Permanent Address:</label>
            <input
              type="text"
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
            />
            {formErrors.permanentAddress && <p className="error" style={{color:"red"}}>{formErrors.permanentAddress}</p>}
          </div>
          <div className="form-group">
            <label>Residential Address:</label>
            <input
              type="text"
              value={residentialAddress}
              onChange={(e) => setResidentialAddress(e.target.value)}
            />
            {formErrors.residentialAddress && <p className="error" style={{color:"red"}}>{formErrors.residentialAddress}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>ACADEMIC HISTORY</h2>
          <div className="form-group">
            <label>Last Attended School/College:</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
            />
            {formErrors.college && <p className="error" style={{color:"red"}}>{formErrors.college}</p>}
          </div>
          <div className="form-group">
            <label> Last Qualification Obtained:</label>
            <input
              type="text"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
            {formErrors.qualification && <p className="error" style={{color:"red"}}>{formErrors.qualification}</p>}
            <label>Year Of Passing:</label>
            <input
              type="number"
              value={yearPassing}
              onChange={(e) => setYearPassing(e.target.value)}
            />
            {formErrors.yearPassing && <p className="error" style={{color:"red"}}>{formErrors.yearPassing}</p>}
          </div>
        </section>

        <section className="form-section">
          <h2>COURSE DETAILS</h2>
          <div className="form-group">
            <label>Joined Course:</label>
            <input type="text" name="joinedCourse" value={course.name} readOnly />
          
            {formErrors.joinedCourse && <p className="error" style={{color:"red"}}>{formErrors.joinedCourse}</p>}
          </div>
          <div className="form-group">
            <label>Joining Date:</label>
            <input
              type="date"
              value={joiningDate}
              onChange={(e) => setJoiningDate(e.target.value)}
            />
            {formErrors.joiningDate && <p className="error" style={{color:"red"}}>{formErrors.joiningDate}</p>}
          </div>
          <div className="form-group">
            <label>Course Timing:</label>
            <input
              type="text"
              value={courseTiming}
              onChange={(e) => setCourseTiming(e.target.value)}
            />
            {formErrors.courseTiming && <p className="error" style={{color:"red"}}>{formErrors.courseTiming}</p>}
          </div>
          <div className="form-group">
            <label>Mode of Study:</label>
            <select
              value={onlineOffline}
              onChange={(e) => setOnlineOffline(e.target.value)}
            >
              <option value="">Select</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            {formErrors.onlineOffline && <p className="error" style={{color:"red"}}>{formErrors.onlineOffline}</p>}
          </div>
        </section>



        <button type="submit">Submit</button>

        {submitted && (
          <div className="success-message" style={{color:"green"}}>
            Registration successful!
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;