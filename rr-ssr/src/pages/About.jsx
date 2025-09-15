import React from 'react';

function About() {
  return (
    <div>
      <h1>About This Application</h1>
      <p>This is a React Router Server-Side Rendering (SSR) example application.</p>
      
      <h2>Features:</h2>
      <ul>
        <li>Server-side rendering with React Router</li>
        <li>Express.js backend server</li>
        <li>External API integration for load simulation</li>
        <li>Docker containerization support</li>
        <li>Memory monitoring capabilities</li>
      </ul>

      <h2>Technology Stack:</h2>
      <ul>
        <li>React 18</li>
        <li>React Router 6</li>
        <li>Express.js</li>
        <li>Vite (build tool)</li>
        <li>Axios (HTTP client)</li>
      </ul>
    </div>
  );
}

export default About;