import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { login, setLoginError } from './Redux/actions';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector(state => state.loginError);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('User ID:', data.user.id);
        sessionStorage.setItem("token", data.accessToken);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("userType", userType); 
        sessionStorage.setItem("id", data.user.id);
        console.log(data); 
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
    navigate("/registration");
  };

  const handleCompanyClick = () => {
    navigate("/company/login");
  };

  return (
    <>
      <div id='Login-register'>
        <Form className="login-form" onSubmit={handleLogin}>
          <h2 className="form-title">LOGIN</h2>
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
              Not registered?{' '}
              <a onClick={handleRegistrationClick}>
                Click here!
              </a>
            </p>
            <p>
              Are you a company?{' '}
              <a onClick={handleCompanyClick}>
                Click here!
              </a>
            </p>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
  {loading ? (
    <Spinner animation="border" size="sm" role="status">
      <span className="visually-hidden">Logging in..</span>
    </Spinner>
  ) : (
    'Login'
  )}
</Button>
      
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
