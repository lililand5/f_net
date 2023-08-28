import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function MyFeeds() {
  const [feeds, setFeeds] = useState([]);

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

    fetch(`${process.env.REACT_APP_API_URL}/api/posts/feed`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setFeeds(data.feed || []);
    })
    .catch(error => {
      console.error("Ошибка при получении My Feeds:", error);
    });

  }, []);

  function handleUnfollow(userId) {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/unfollow`, {
      method: 'DELETE',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      // Обновляем ленту после успешного отписывания
      setFeeds(feeds.filter(feed => feed.user.id !== userId));
    })
    .catch(error => {
      console.error("Ошибка при отписывании:", error);
    });
  }

  return (
    <>
      {feeds.map(feed => (
        <div className="card gedf-card" key={feed.id} style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="ml-2">
                  <div className="h5 m-0">{feed.user.email}</div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <button onClick={() => handleUnfollow(feed.user.id)} className="btn btn-danger btn-sm">Unfollow</button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="text-muted h7 mb-2">
              <i className="fa fa-clock-o"></i> {feed.created_at}
            </div>
            <a className="card-link" href="#">
              <h5 className="card-title">{feed.title}</h5>
            </a>
            <p className="card-text">{feed.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
