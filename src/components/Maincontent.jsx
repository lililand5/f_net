import React, { useState, useEffect } from "react";
import Feed from "./Feed";
import MyFeeds from "./MyFeeds";
import FeedsGlobal from "./FeedsGlobal";

export default function Maincontent() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${authToken}`
    };

    let endpoint;
    if (activeTab === 0) {
      endpoint = `${process.env.REACT_APP_API_URL}/api/posts/my`;
    } else if (activeTab === 1) {
      endpoint = `${process.env.REACT_APP_API_URL}/api/posts/feed`;
    } else if (activeTab === 2) {
      endpoint = `${process.env.REACT_APP_API_URL}/api/posts/global_posts`;
    } else {
      return;
    }

    fetch(endpoint, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())  // Добавлен этот шаг
    .then(data => {
      if (activeTab === 1) {
        setPosts(data.feed || []);
      } else {
        setPosts(data.my_posts || []);  // Убедитесь, что ключ 'my_posts' правильный
      }
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
      setPosts([]);
    });

    // Запрос для получения email пользователя
    fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      setEmail(data.email || "");
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }, [activeTab]);


  const handlePostCreation = () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken || !newPostContent.trim() || !newPostTitle.trim()) return;

    const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };

    const endpoint = `${process.env.REACT_APP_API_URL}/api/posts/create`;

    fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            title: newPostTitle,
            content: newPostContent,
        }),
    })
    .then(response => {
        if (response.status === 201) {
            setNewPostContent("");
            setNewPostTitle("");
            window.location.reload();
            return null;
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.error) {
            console.error('Ошибка при создании публикации:', data.error);
        }
    })
    .catch(error => {
        console.error('Ошибка при создании публикации:', error);
    });
  };

  return (
    <>
      <div className="col-md-6 gedf-main">
        <div className="card gedf-card">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  My posts/Share
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  My Feed
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  Feed Global
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
          {activeTab === 0 && (
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="posts"
                  role="tabpanel"
                  aria-labelledby="posts-tab"
                >
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Title of your post"
                      value={newPostTitle}
                      onChange={e => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="sr-only" htmlFor="message">post</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="3"
                      placeholder="What are you thinking?"
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="btn-toolbar justify-content-between">
                    <div className="btn-group">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handlePostCreation}
                      >
                        share
                      </button>
                    </div>
                  </div>
                  <hr />
                  <Feed posts={posts} email={email} />
                </div>
              </div>
            )}
            {activeTab === 1 && <MyFeeds />}
            {activeTab === 2 && <FeedsGlobal />}
          </div>
        </div>
      </div>
    </>
  );
}
