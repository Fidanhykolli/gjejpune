import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-light text-dark py-5">
      <Container>
          <Col md={4} className="mb-4 mb-md-0">
            <img src="Kerkim pune.png" alt="" width="250px" />
          </Col>
        <Row className="footer-content">
          <Col md={8} className="Quick-links-socials mb-4 mb-md-0 ">
            <div className="footer-section ">
              <div>
                <h2>Quick Links</h2>
                <ul className="list-unstyled">
                  <li><a href="#" className="text-dark">Home</a></li>
                  <li><a href="#" className="text-dark">About</a></li>
                  <li><a href="#" className="text-dark">Services</a></li>
                  <li><a href="#" className="text-dark">Blog</a></li>
                  <li><a href="#" className="text-dark">Contact</a></li>
                </ul>
              </div>
              <div className="socials">
                <h2>Socials</h2>               
                  <a href="#" className="text-dark d-block mb-2"><FaFacebook /> Facebook</a>
                  <a href="#" className="text-dark d-block mb-2"><FaInstagram /> Instagram</a>
                  <a href="#" className="text-dark d-block mb-2"><FaTwitter /> Twitter</a>
                  <a href="#" className="text-dark d-block mb-2"><FaLinkedin /> Linkedin</a>
                
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom text-center mt-4">
        &copy; {new Date().getFullYear()} GJEJ PUNË. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
