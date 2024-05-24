import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";

const RegisterCompany = () => {
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [vatNumber, setVatNumber] = useState("");
    const [businessSector, setBusinessSector] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [registrationError, setRegistrationError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3001/auth/company/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    companyName,
                    address,
                    vatNumber,
                    businessSector,
                    email,
                    phoneNumber,
                    password,
                    role: "Company"
                }),
            });
            if (response.ok) {
                console.log(response.ok)
                navigate("/company/login")
            }else{
                throw new Error("Registration failed.")
            }
        } catch (error) {
            console.error('Registration error:', error);
            setRegistrationError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
          <div id='Login-register-company'>
         
            <Form className='login-form-register-company' onSubmit={handleRegistrationSubmit}>
              <h1 style={{textAlign:"center"}}>Register Company</h1>
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="vatNumber">
                <Form.Label>VAT Number</Form.Label>
                <Form.Control type="text" value={vatNumber} onChange={(e) => setVatNumber(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="businessSector">
                <Form.Label>Business Sector</Form.Label>
                <Form.Control type="text" value={businessSector} onChange={(e) => setBusinessSector(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button style={{marginTop:"20px"}} variant="primary" type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
              {registrationError && <Alert variant="danger">Registration failed. Please try again.</Alert>}
              <p style={{ marginTop: "20px" }}>
            <a href="#" onClick={() => navigate(-1)}>Go back</a>
          </p>
            </Form>
          </div>
        </>
      );
    }      

export default RegisterCompany;
