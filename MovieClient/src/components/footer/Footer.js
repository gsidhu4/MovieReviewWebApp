// Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Optional: import a CSS file for additional styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Movie Masala Inc. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
