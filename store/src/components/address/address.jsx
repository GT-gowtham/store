import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingAddressForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState('1');
  const [errors, setErrors] = useState({});
  const [isDifferentBillingAddress, setIsDifferentBillingAddress] = useState(false);
  const [submittedAddresses, setSubmittedAddresses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const savedAddresses = localStorage.getItem('submittedAddresses');
    if (savedAddresses) {
      setSubmittedAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const validate = () => {
    let newErrors = {};
    if (!userId.trim()) newErrors.userId = 'User ID is required';
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!state.trim()) newErrors.state = 'State is required';
    if (!pinCode.trim()) {
      newErrors.pinCode = 'Pin Code is required';
    } else if (!/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = 'Invalid Pin Code';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Invalid Phone number';
    }
    
    // Checkbox validation
    if (!isDifferentBillingAddress.trim) {
      newErrors.isDifferentBillingAddress = 'Please check if Shipping and Billing address are different.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAddress = async () => {
    const datas = {
      user_ID: userId.trim(),
      user_name: name.trim(),
      user_address: address.trim(),
      user_city: city.trim(),
      user_country: country,
      user_state: state.trim(),
      user_pincode: pinCode.trim(),
      user_phone: phone.trim(),
      user_checkboxes: isDifferentBillingAddress.trim(),
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/User_details/', datas, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        return response; // Return the response to handle in handleSubmit
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Data:", error.response.data);
      } else {
        console.error("General Error:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await addAddress();
        if (response && response.status === 201) {
          const addressData = {
            name,
            address,
            city,
            country,
            state,
            pinCode,
            phone,
            isDifferentBillingAddress,
          };
          setSubmittedAddresses((prevAddresses) => [...prevAddresses, addressData]);
          localStorage.setItem('submittedAddresses', JSON.stringify([...submittedAddresses, addressData]));
          handleAdd();
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const handleEdit = (index) => {
    const addressToEdit = submittedAddresses[index];
    if (addressToEdit) {
      setName(addressToEdit.name);
      setAddress(addressToEdit.address);
      setCity(addressToEdit.city);
      setCountry(addressToEdit.country);
      setState(addressToEdit.state);
      setPinCode(addressToEdit.pinCode);
      setPhone(addressToEdit.phone);
      setSubmittedAddresses((prevAddresses) => prevAddresses.filter((_, i) => i !== index));
      localStorage.setItem('submittedAddresses', JSON.stringify(submittedAddresses));
    }
  };

  const handleDelete = (index) => {
    const updatedAddresses = submittedAddresses.filter((_, i) => i !== index);
    setSubmittedAddresses(updatedAddresses);
    localStorage.setItem('submittedAddresses', JSON.stringify(updatedAddresses)); // Update localStorage
  };

  const handleAdd = () => {
    setName('');
    setAddress('');
    setCity('');
    setState('');
    setPinCode('');
    setPhone('');
    setIsDifferentBillingAddress(false); 
  };

  return (
    <div>
      <Grid container>
        <Grid item lg={6} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} mt={7}>
          {submittedAddresses.length > 0 && (
            <div style={styles.summary}>
              <Typography style={{ textAlign: "center", fontWeight: "bold", color: "#550a35", }} variant='h4'>Shipping Address Summary</Typography>
              {submittedAddresses.map((address, index) => (
                <div key={index}>
                  <p><strong style={styles.text}>Name:</strong> {address.name}</p>
                  <p><strong style={styles.text}>Address:</strong> {address.address}</p>
                  <p><strong style={styles.text}>City:</strong> {address.city}</p>
                  <p><strong style={styles.text}>Country:</strong> {address.country}</p>
                  <p><strong style={styles.text}>State:</strong> {address.state}</p>
                  <p><strong style={styles.text}>Pin Code:</strong> {address.pinCode}</p>
                  <p><strong style={styles.text}>Phone:</strong> {address.phone}</p>
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <Button onClick={() => handleEdit(index)} style={{ backgroundColor: "#550a35", color: "white", textTransform: "capitalize", margin: "10px" }}>
                      Edit Address
                    </Button>
                    <Button onClick={() => handleDelete(index)} style={{ backgroundColor: "#550a35", color: "white", textTransform: "capitalize", margin: "10px" }}>
                      Delete Address
                    </Button>
                    <Button onClick={() => navigate('/payment')} style={{ backgroundColor: "#550a35", color: "white", textTransform: "capitalize", margin: "10px" }}>
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Grid>
        <Grid item lg={submittedAddresses.length > 0 ? 6 : 12} mt={7}>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <Typography style={{ textAlign: "center", fontWeight: "bold", color: "#550a35", }} variant='h4'>Create New Address</Typography>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
                {errors.name && <p style={styles.error}>{errors.name}</p>}
              </div>

              <div style={styles.formGroup}>
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                />
                {errors.address && <p style={styles.error}>{errors.address}</p>}
              </div>

              <div style={styles.formGroup}>
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={styles.input}
                />
                {errors.city && <p style={styles.error}>{errors.city}</p>}
              </div>

              <div style={styles.formGroup}>
                <label>Country:</label>
                <select
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={styles.input}
                >
                  <option value="India">India</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label>State:</label>
                <input
                  type="text"
                  name="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={styles.input}
                />
                {errors.state && <p style={styles.error}>{errors.state}</p>}
              </div>

              <div style={styles.formGroup}>
                <label>Pin Code:</label>
                <input
                  type="text"
                  name="pinCode"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  style={styles.input}
                />
                {errors.pinCode && <p style={styles.error}>{errors.pinCode}</p>}
              </div>

              <div style={styles.formGroup}>
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
                {errors.phone && <p style={styles.error}>{errors.phone}</p>}
              </div>

              <div style={styles.formGroup}>
        <label>
        <input
  type="checkbox"
  name="isDifferentBillingAddress"
  checked={isDifferentBillingAddress}
  onChange={(e) => setIsDifferentBillingAddress(e.target.value)} // Updated to e.target.checked
/>
          {' '}Check if Shipping and Billing address are different.
        </label>
                {errors.isDifferentBillingAddress && <p style={styles.error}>{errors.isDifferentBillingAddress}</p>}
              </div>

              <Button type="submit" style={{ backgroundColor: "#550a35", color: "white", textTransform: "capitalize", marginTop: "20px" }}>
                Submit Address
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '100%',
    border:"2px solid #e0e0e0",
    padding: '40px',
    borderRadius: '8px',  
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: '12px',
  },
  summary: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  checkboxLabel: {
    marginLeft: '10px',
  },
  text: {
    fontWeight: 'bold',
  }
};

export default ShippingAddressForm;