import './comment.css'
import CommentInput from './comment_input'
import CommentHistory from './comment_history'

export default function Comment() {
    return (
        <div id="comment-row" className="body-top-block">
            <CommentInput />
            <hr />
            <div id="comment-record">
                <div className="one-comment">
                    <div id="commenter-profile-pic">
                        <img src="/assets/u_0.jpg" className="img-thumbnail" />
                    </div>
                    <div id="commenter-content-area">
                        <div id="comment-title">
                            <label id="commenter-name">Muyang Lu</label>
                            <label id="commenter-time">May 10 2024, 16:00</label>
                        </div>
                        <div id="comment-content">
                            <label id="commenter-content-text">This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. This is a example of first comment. </label>
                        </div>
                    </div>
                </div>
            </div>
            <CommentHistory />
            
        </div>
        )
    }