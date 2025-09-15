import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  const navStyle = {
    background: '#f0f0f0',
    padding: '10px',
    marginBottom: '20px',
  };

  const linkStyle = {
    marginRight: '20px',
    textDecoration: 'none',
    color: '#007bff',
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/api-data" style={linkStyle}>API Data</Link>
    </nav>
  );
}

export default Navigation;