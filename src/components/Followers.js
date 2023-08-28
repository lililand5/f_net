import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function Followers() {
  const [followers, setFollowers] = useState([]);

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

    fetch(`${process.env.REACT_APP_API_URL}/api/users/followers`, {
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
      setFollowers(data.followers);
    })
    .catch(error => {
      console.error('Ошибка при получении подписчиков:', error);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Followers</h2>
      {followers.length > 0 ? (
        <ul>
          {followers.map(followerId => (
            <li key={followerId}>Follower ID: {followerId}</li>
          ))}
        </ul>
      ) : (
        <p>You have no followers yet.</p>
      )}
    </div>
  );
}
