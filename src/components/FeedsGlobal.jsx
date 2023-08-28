import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function FeedsGlobal() {
  const [globalPosts, setGlobalPosts] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);

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

    // Fetch global posts
    fetch(`${process.env.REACT_APP_API_URL}/api/posts/global_posts`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setGlobalPosts(data.all_posts || []);
    })
    .catch(error => {
      console.error("Ошибка при получении Global Posts:", error);
    });
  }, []);

  const handleSubscribe = (userId) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/follow`, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
    })
    .then(response => {
      if (response.ok) {
        setSubscribedUsers(prevSubscribed => [...prevSubscribed, userId]);
        setGlobalPosts(prevPosts => prevPosts.filter(post => post.user.id !== userId));
      } else {
        return response.json().then(data => {
          console.error("Error while subscribing to the user:", data.error || data.message);
        });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <>
      {globalPosts.map(post => (
        <div className="card gedf-card" key={post.id} style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="ml-2">
                <div className="d-flex align-items-center">
                  <div className="h5 m-0">{post.user.email}</div>
                  {post.user.email !== localStorage.getItem('userEmail') && !subscribedUsers.includes(post.user.id) && (
                    <div className="ml-2">
                      <button onClick={() => handleSubscribe(post.user.id)} className="btn btn-primary btn-sm">Subscribe</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="text-muted h7 mb-2">
              <i className="fa fa-clock-o"></i> {post.created_at}
            </div>
            <a className="card-link" href="#">
              <h5 className="card-title">{post.title}</h5>
            </a>
            <p className="card-text">{post.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
