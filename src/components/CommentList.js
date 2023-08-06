import React, {useState} from "react";
import Comment from './Comment';

function CommentLists({ CommentLists, editComment }) {
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);

  return (
    <ul className="list-cmt">
      {CommentLists.map(comment => {
        const commentId = comment.id;
        return (
          <Comment 
            key={commentId}
            commnet={comment}
            isEditing={selectedCommentIndex == commentId ? true : false}
            setselectedCommentIndex={setSelectedCommentIndex}
            editComment={editComment}
          />
        );
      })}
    </ul>
  );
}

export default CommentLists;