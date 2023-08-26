import React, { useState, useEffect } from 'react';
import config from './config';

function HelloComponent() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetch(`${config.API_URL}/api/hello`)
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
