import React from 'react';

function Home() {
  return (
    <div>
      <h1>Welcome to React Router SSR Example</h1>
      <p>This is a server-side rendered React application using React Router.</p>
      <p>Navigate to other pages using the links above.</p>
      <ul>
        <li><strong>Home</strong>: This page</li>
        <li><strong>About</strong>: Information about this application</li>
        <li><strong>API Data</strong>: Demonstrates external API fetching with server load simulation</li>
      </ul>
    </div>
  );
}

export default Home;