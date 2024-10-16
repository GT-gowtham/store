import React, { useState } from 'react';
import './ContactPage.css';
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { TbClock12 } from "react-icons/tb";
import { IoMail } from "react-icons/io5";
import { CgWebsite } from "react-icons/cg";
import { FaSquarePhone, FaLocationDot } from "react-icons/fa6";
import Whatsapp from "../assets/CONTACT/REMOVEBACKCONTACT.png";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    // Validation function
    const validateForm = () => {
        let formErrors = {};
        if (!name.trim()) formErrors.name = "Name is required";
        if (!email) formErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email address is invalid";
        if (!message.trim()) formErrors.message = "Message is required";
        else if (message.length < 10) formErrors.message = "Message must be at least 10 characters";

        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
        } else {
            const datas = {
                contact_name: name,
                contact_email: email,
                contact_message: message,
            };

            try {
                const response = await axios.post('http://127.0.0.1:8000/api/Contact/', datas, {
                // const response = await axios.post('http://127.0.0.1:8000/api/contact/', datas, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setSubmitted(true);
                console.log("Response data:", response.data);

                if (response.status === 201) {
                    setName('');
                    setEmail('');
                    setMessage('');
                    setErrors({});
                    // navigate('/');
                }

            } catch (error) {
                console.error("Submission error:", error);
            }
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-form">
                    <h2>Contact</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {errors.name && <p className="error">{errors.name}</p>}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}

                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                        {errors.message && <p className="error">{errors.message}</p>}

                        <button type="submit">Send</button>
                    </form>
                </div>

                <div className="contact-info">
                    <h2 style={{ color: "#ffc400" }}> Contact Here...</h2>
                    <p><IoMail /> support@hifiitpark.com</p>
                    <p><FaSquarePhone /> +91 8098309295</p>
                    <p><TbClock12 /> 09:00 AM - 09:00 PM</p>
                    <p><FaLocationDot /> 34/15, Balavinayagar Kovil Street, Tuticorin-628002</p>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/profile.php?id=61560236537282&mibextid=ZbWKwL">
                            <FaFacebook style={{ padding: "10px" }} />
                        </a>
                        <a href="https://www.instagram.com/hifi_itpark_fmcg/">
                            <FaSquareInstagram style={{ padding: "10px" }} />
                        </a>
                        <a href="https://fmcg.hifiitpark.com/">
                            <CgWebsite style={{ padding: "10px" }} />
                        </a>
                    </div>
                    <div className="sb__footer-links_div_img">
                        <img src={Whatsapp} width="200px" height="200px" alt="WhatsApp" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;