import React, {useState} from "react";
import CommentLists from './CommentLists';

export default function WrapComments({ comments }) {
    const [commentLists, setCommentLists] = useState(comments);

    const editComment = (commnetId, editValue) => {
        let newCommnetLists = commentLists.map(item => {
            if (item.id == commnetId) {
                item.content = editValue;
            }
            return item;
        });

        setCommentLists(newCommnetLists);
    };

    return (
        <div className="wrap-comment">
            <CommentLists commentLists={commentLists} editComment={editComment} />
        </div>
    );
}