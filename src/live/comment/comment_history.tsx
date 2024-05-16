import React from 'react';

const OneComment = ({ record }) => {
    return (
        <div className="one-comment">
            <div id="commenter-profile-pic">
                <img src={record.profileUrl} className="img-thumbnail" alt="Profile" />
            </div>
            <div id="commenter-content-area">
                <div id="comment-title">
                    <label id="commenter-name">{record.name}</label>
                    <label id="commenter-time">{record.time}</label>
                </div>
                <div id="comment-content">
                    <label id="commenter-content-text">{record.content}</label>
                </div>
            </div>
        </div>
    );
};

export default function CommentHistory() {
    const commentRecord = {
        name: "Muyang Lu",
        time: "2024 May 11, 00:52",
        profileUrl: "/src/assets/u_0.jpg",
        content: "This is my second react example comment. This is my second react example comment. This is my second react example comment. This is my second react example comment. This is my second react example comment. This is my second react example comment."
    };

    return (
        <div id="comment-record">
            <OneComment record={commentRecord} />
        </div>
    );
}
