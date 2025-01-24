import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Message = () => {

    const [message, setMessage] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchMessage = async () => {
          try {
              setLoading(true);
              const res = await axios.get(`${process.env.REACT_APP_URL}/api/messages`, {
                  headers: {
                      'Content-Type': 'application/json',
                  }
              });
              if (res.data) {
                  setMessage(res.data); // Corrected from setBusDetails to setMessage
              }
          } catch (err) {
              console.error('Error fetching message data:', err);
              if (err.response?.status === 401) {
                  setError('Please log in again to view messages');
              } else if (err.response?.status === 403) {
                  setError('You do not have permission to view messages');
              } else {
                  setError('Error loading messages. Please try again later.');
              }
          } finally {
              setLoading(false); // Ensure loading is set to false after fetching
          }
      };

      fetchMessage(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

// Loading state
if (loading) {
  return <div>Loading...</div>;
}

// Error state
if (error) {
  return (
      <div className="alert alert-danger" role="alert">
          {error}
      </div>
  );
}
  return (
    <div className='container'>
    <div className="card">
        <div className="card-body">
        <h2 className="card-title text-primary">Messages Details</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {message.map((item, index) => (
                    <tr key={index}>
                        <td>{item.Name}</td>
                        <td>{item.Title}</td>
                        <td>{item.Message}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
    </div>
  )
}

export default Message