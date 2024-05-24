import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { login, setLoginError } from './Redux/actions';

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector(state => state.loginError);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("company", JSON.stringify(data.company));
        sessionStorage.setItem("userType", "company"); 
        sessionStorage.setItem("companyId", data.company.id)
        dispatch(login(data.user));
        navigate("/Home");
      } else {
        dispatch(setLoginError('Email or password incorrect'));
      }
    } catch (err) {
      console.log(err);
      dispatch(setLoginError('Something went wrong. Please try again later.'));
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationClick = () => {
    navigate("/registration/company");
  };

  return (
    <>
      <div id='Login-register'>
      {/* <img className="logo" src="Kerkim pune.png" alt="Logo" /> */}
      {/* <img src="public/Kerkim pune.png" alt="" /> */}
        <Form className="login-form" onSubmit={handleLogin}>
          <h2 className="form-title">COMPANY LOGIN</h2>
          {loginError && <p style={{ color: 'red', textAlign: 'center' }}>{loginError}</p>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <p>
              Not registered as a Company?{' '}
              <a onClick={handleRegistrationClick}>
                Click here!
              </a>
            </p>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            Login
          </Button>
          {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Logging in...</p>}
        </Form>
      </div>
    </>
  );
};

export default LoginCompany;