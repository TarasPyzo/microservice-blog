import React from 'react';
import axios from 'axios';

import CommentCreate from './CommentCreate';

const CommentList = ({ postId, comments }) => {

  return (
    <div style={{ marginTop: '20px', padding: '10px' }}>
      <h4>Comment List</h4>
      {comments.map(comments => {
        return (
          <div key={comments.id} style={{ padding: '5px', margin: '10px', border: '1px solid white' }}>
            <div>CommentId: {comments.id}</div>
            <div>Content: {comments.content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
