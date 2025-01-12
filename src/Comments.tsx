// src/Comments.tsx

import React, { useState } from 'react';

interface Comment {
  name: string;
  text: string;
}

function Comments(): React.JSX.Element {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      name: 'Bob Fossil',
      text: 'Oh I am so glad you taught me about the big brown angry guys in the woods...',
    },
  ]);
  const [nameField, setNameField] = useState('');
  const [commentField, setCommentField] = useState('');

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setComments([...comments, { name: nameField, text: commentField }]);
    setNameField('');
    setCommentField('');
  }

  return (
    <div className="comments">
      <button
        className="show-hide"
        onClick={() => {
          setShowComments(!showComments);
        }}
      >
        {showComments ? 'Hide comments' : 'Show comments'}
      </button>
      {showComments && (
        <div className="comment-wrapper">
          <h2>Add comment</h2>
          <form className="comment-form" onSubmit={handleSubmit}>
            <div className="flex-pair">
              <label htmlFor="name">Your name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={nameField}
                onChange={(e) => {
                  setNameField(e.target.value);
                }}
              />
            </div>
            <div className="flex-pair">
              <label htmlFor="comment">Your comment:</label>
              <input
                type="text"
                id="comment"
                placeholder="Enter your comment"
                value={commentField}
                onChange={(e) => {
                  setCommentField(e.target.value);
                }}
              />
            </div>
            <div>
              <input type="submit" value="Submit comment" />
            </div>
          </form>

          <h2>Comments</h2>
          <ul className="comment-container">
            {comments.map((c, i) => (
              <li key={i}>
                <p>
                  <strong>{c.name}</strong>
                </p>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Comments;
