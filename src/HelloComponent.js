import React, { useState, useEffect } from 'react';

function HelloComponent() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/api/hello`)
      .then(response => response.json())
      .then(data => {
        setGreeting(data.hi);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <h1>{greeting}</h1>
  );
}

export default HelloComponent;
