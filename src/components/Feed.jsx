import React from "react";

export default function Feed({ posts, email }) { // Принимаем posts и email как пропы
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
