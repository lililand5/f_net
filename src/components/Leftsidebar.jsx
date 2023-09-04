import React, { useState, useEffect } from "react";

export default function Leftsidebar() {
  const [profile, setProfile] = useState({});
  const [followers, setFollowers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const authToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("auth_token="))
      .split("=")[1];

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    // Запрос для получения профиля
    fetch("http://localhost:3000/api/users/profile", { headers })
      .then((response) => response.json())
      .then((data) => setProfile(data));

    // Запрос для получения списка подписчиков
    fetch("http://localhost:3000/api/users/followers", { headers })
      .then((response) => response.json())
      .then((data) => setFollowers(data.followers || []));

    // Запрос для получения списка подписок
    fetch("http://localhost:3000/api/users/subscriptions", { headers })
      .then((response) => response.json())
      .then((data) => setSubscriptions(data.subscriptions || []));
  }, []);

  const handleSignOut = () => {
    // Удаление куки
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Запрос на сервер для выхода из системы
    fetch("http://localhost:3000/users/sign_out", {
      method: 'DELETE'
    }).then(response => {
      if (response.ok) {
        // Действия после успешного выхода, например, перенаправление на страницу входа
        window.location.href = "/login"; 
      }
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
          <div className="h7" style={{ marginBottom: '10px' }}>
            <span style={{ color: 'gray' }}>Sign-ins count:</span>
            <span style={{ color: 'black' }}>{profile.sign_in_count || ''}</span>
          </div>
          <button onClick={handleSignOut} className="btn btn-danger mb-2">Sign Out</button>
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
