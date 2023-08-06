import React, { useState } from 'react';

function CommentApp() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === '') {
      return;
    }
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <div>
      <h4>댓글</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="댓글을 입력하세요..."
          rows = {5}
          cols = {50}
          className='custom-textarea'
        />
        <br />
        <button type="submit" className='custom-button'>댓글 작성</button>
      </form>
    </div>
  );
}

export default CommentApp;