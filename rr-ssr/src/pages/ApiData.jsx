import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ApiData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using JSONPlaceholder API as a reliable public API
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div>
        <h1>API Data</h1>
        <p>Loading external data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>API Data</h1>
        <p style={{ color: 'red' }}>Error: {error}</p>
        <button onClick={handleRefresh}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <h1>API Data</h1>
      <p>Data fetched from JSONPlaceholder API (simulating server load):</p>
      <button onClick={handleRefresh} style={{ marginBottom: '20px' }}>
        Refresh Data
      </button>
      
      <div>
        {data && data.map(post => (
          <div key={post.id} style={{
            border: '1px solid #ddd',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px'
          }}>
            <h3>Post #{post.id}: {post.title}</h3>
            <p>{post.body}</p>
            <small>User ID: {post.userId}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiData;