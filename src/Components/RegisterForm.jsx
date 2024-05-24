import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasWorkVisa, setHasWorkVisa] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [spokenLanguage, setSpokenLanguage] = useState('');
  const [address, setAddress] = useState('');
  const [registrationError, setRegistrationError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'surname':
        setSurname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'hasWorkVisa':
        setHasWorkVisa(value === 'true');
        break;
      case 'dateOfBirth':
        setDateOfBirth(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'workExperience':
        setWorkExperience(value);
        break;
      case 'spokenLanguage':
        setSpokenLanguage(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/auth/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          surname,
          email,
          password,
          hasWorkVisa,
          dateOfBirth,
          phoneNumber,
          workExperience,
          spokenLanguage,
          address,
          role: "User"
        }),
      });
      if (response.ok) {
        
      setRegistrationError(false);
      navigate("/")
      } else{
        throw new Error('Registration failed');
      }
      ;
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyClick = () => {
    // Redirect to company registration page
    navigate("/registration/company");
  };

  return (
    <>
      <div id='Login-register-user'>
       
        <Form className='login-form-user' onSubmit={handleRegistrationSubmit}>
          <h1 style={{textAlign:"center"}}>Register</h1>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={name} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" name="surname" value={surname} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={password} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formHasWorkVisa">
            <Form.Label>Has Work Visa</Form.Label>
            <Form.Control as="select" name="hasWorkVisa" value={hasWorkVisa ? 'true' : 'false'} onChange={handleInputChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" name="dateOfBirth" value={dateOfBirth} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" name="phoneNumber" value={phoneNumber} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formWorkExperience">
            <Form.Label>Work Experience</Form.Label>
            <Form.Control type="text" name="workExperience" value={workExperience} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formSpokenLanguage">
            <Form.Label>Spoken Language</Form.Label>
            <Form.Control type="text" name="spokenLanguage" value={spokenLanguage} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={address} onChange={handleInputChange} />
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
};

export default RegisterPage;
