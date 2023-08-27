import React, { useState, useEffect } from 'react';

function HelloComponent() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users`)
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
