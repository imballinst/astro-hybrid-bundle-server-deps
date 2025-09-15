import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ApiData from './pages/ApiData.jsx';
import Navigation from './components/Navigation.jsx';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/api-data" element={<ApiData />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;