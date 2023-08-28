import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function Leftsidebar() {
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const token = Cookies.get('auth_token');

    if (token) {
      localStorage.setItem('authToken', token);
      Cookies.remove('auth_token');
    }

    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setProfile(data);
    })
    .catch(error => {
      console.error('Ошибка при получении профиля:', error);
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/users/followers`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setFollowers(data.followers || []);
    })
    .catch(error => {
      console.error('Ошибка при получении подписчиков:', error);
      setFollowers([]);
    });

    fetch(`${process.env.REACT_APP_API_URL}/api/users/subscriptions`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setSubscriptions(data.subscriptions || []);
    })
    .catch(error => {
      console.error('Ошибка при получении подписок:', error);
      setSubscriptions([]);
    });

  }, []);

  const handleSignOut = () => {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    };

    fetch(`${process.env.REACT_APP_API_URL}/users/sign_out`, {
      method: 'DELETE',
      headers: headers,
      credentials: 'include',
    })
    .then(() => {
      localStorage.removeItem('authToken');
      const apiUrl = process.env.REACT_APP_API_URL;
      window.location.href = `${apiUrl}/users/sign_in`;
    })
    .catch(error => {
      console.error('Ошибка при выходе из системы:', error);
    });
  };

  return (
    <div className="col-md-3">
      <div className="card">
      <div className="card-body" style={{ textAlign: 'left' }}>
          <div className="h7">
            <span style={{ color: 'gray' }}>ID:</span>
            <span style={{ color: 'black' }}>{profile.id || ''}</span>
        </div>
        <div className="h7">
            <span style={{ color: 'gray' }}>Email:</span>
            <span style={{ color: 'black' }}>{profile.email || ''}</span>
        </div>
        <div className="h7">
            <span style={{ color: 'gray' }}>Token:</span>
            <span style={{ color: 'black' }}>{profile.authentication_token || ''}</span>
        </div>
        <div className="h7" style={{ marginBottom: '10px' }}>
            <span style={{ color: 'gray' }}>Sign-ins count:</span>
            <span style={{ color: 'black' }}>{profile.sign_in_count || ''}</span>
        </div>

            <button onClick={handleSignOut} className="btn btn-danger mb-2">Sign Out</button>
            <a href={`${process.env.REACT_APP_API_URL}/users/edit`} className="btn btn-danger mb-2 ml-2">Edit Profile</a>
          </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="h6 text-muted">Followers</div>
            <a href="/followers" className="btn btn-primary mb-2">Followers {followers.length || ''}</a>
          </li>
          <li className="list-group-item">
            <div className="h6 text-muted">Subscriptions</div>
            <a href="/subscriptions" className="btn btn-primary mb-2">Subscriptions {subscriptions.length || ''}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
