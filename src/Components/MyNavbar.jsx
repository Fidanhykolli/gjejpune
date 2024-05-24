import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import _debounce from 'lodash/debounce';

function MyNavbar() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = _debounce(() => {
      setIsScrolled(window.scrollY > 200);
    }, 100); // Imposta un ritardo di 100 ms

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="sm" className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Container id='navbr'>
        <Nav className="image-home me-auto">
          <img className={`img-nvbr ${isScrolled ? 'hidden' : ''}`} src="Kerkim pune.png" alt="Logo" />
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">About Us</Nav.Link>
        </Nav>
        <Button className='Logout' onClick={handleLogout}>Logout</Button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
