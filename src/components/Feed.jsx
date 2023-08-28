import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");

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

    const fetchData = async () => {
      try {
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
          method: 'GET',
          headers: headers,
          credentials: 'include',
        });
        const profileData = await profileResponse.json();
        setEmail(profileData.email);

        const postsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/posts/my`, {
          method: 'GET',
          headers: headers,
          credentials: 'include',
        });
        const postsData = await postsResponse.json();
        setPosts(postsData.my_posts);

      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {posts.map(post => (
        <div className="card gedf-card" key={post.id} style={{ marginBottom: '20px' }}>
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="ml-2">
                  <div className="h5 m-0">{email}</div>
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
