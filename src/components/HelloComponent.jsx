import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function HelloComponent() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const token = Cookies.get('auth_token'); // получаем токен из куки

    if (token) {
      localStorage.setItem('authToken', token); // сохраняем токен в localStorage
      Cookies.remove('auth_token'); // удаляем токен из куки
    }

    const headers = {};
    if (localStorage.getItem('authToken')) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`; // добавляем токен в заголовок запроса
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      headers: headers
    })
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
