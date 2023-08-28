import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Leftsidebar from './Leftsidebar';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      localStorage.setItem('authToken', token);
      Cookies.remove('auth_token');
    }

    const headers = {};
    if (localStorage.getItem('authToken')) {
      headers['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/users/subscriptions`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setSubscriptions(data.subscriptions);
    })
    .catch(error => {
      console.error('Ошибка при получении подписок:', error);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Subscriptions</h2>
      {subscriptions.length > 0 ? (
        <ul>
          {subscriptions.map(subscriptionId => (
            <li key={subscriptionId}>Subscription ID: {subscriptionId}</li>
          ))}
        </ul>
      ) : (
        <p>You have no subscriptions yet.</p>
      )}
    </div>
  );
}
