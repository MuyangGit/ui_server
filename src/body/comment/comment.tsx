import './comment.css'
export default function Comment() {
    return (
        <div id="comment-row" className="body-top-block">
            <div id="comment-input">
                <label id="comment-input-label">Leave a Comment:</label>
                <textarea id="comment-input-area" class="form-control" rows="3"></textarea>
                <div className="flex-row">
                    <button id="is-owner" type="button" class="btn btn-light btn-sm auto-width">Is Owner</button>
                    <button id="at-developer" type="button" class="btn btn-light btn-sm auto-width">@Developer</button>
                    <button id="share-public" type="button" class="btn btn-light btn-sm auto-width">Share to Public</button>
                    <button id="cancel-comment" type="button" class="btn btn-secondary">Cancel</button>
                    <button id="confirm-comment" type="button" class="btn btn-success">Submit</button>
                </div>
            </div>
            <hr />
            <div id="comment-record">
                <div class="one-comment">
                    <div id="commenter-profile-pic">
                        <img src="/src/assets/u_0.jpg" class="img-thumbnail" />
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
        </div>
        )
    }