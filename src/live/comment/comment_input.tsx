import { SetStateAction, useState } from 'react';

export default function CommentInput() {
    const [atDeveloper, setAtDeveloper] = useState(0);
    const [sharePublic, setSharePublic] = useState(0);
    const [commentText, setCommentText] = useState("");

    const toggleState = (currentState: number, setState: { (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (arg0: number): void; }) => {
        setState(currentState === 0 ? 1 : 0);
        console.log(atDeveloper, sharePublic)
    };

    const submitComment = () => {
        if (commentText.trim() === "") {
            alert("Please type some comments!");
            return;
        }
        const postMessage = {
            "comment": commentText,
            "isOwner": 1,
            "atDeveloper": atDeveloper,
            "sharePublic": sharePublic,
            "createTime": new Date(),
            "user": "Muyang"
        }
        console.log(postMessage)
        alert("Comments submitted!");
        clearComment()
    }

    const clearComment = () => {
        setAtDeveloper(0)
        setSharePublic(0)
        setCommentText("")
    }

    const handleTextareaChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCommentText(event.target.value);
    }

    return (
        <div id="comment-input">
            <label id="comment-input-label">Leave a Comment:</label>
            <textarea id="comment-input-area" className="form-control" rows="3" onChange={handleTextareaChange} value={commentText}></textarea>
            <div className="flex-row">
                <button
                    id="at-developer"
                    type="button"
                    className={`btn btn-light btn-sm auto-width ${atDeveloper === 1 ? 'active' : ''}`}
                    onClick={() => toggleState(atDeveloper, setAtDeveloper)}
                >
                    @Developer
                </button>
                <button
                    id="share-public"
                    type="button"
                    className={`btn btn-light btn-sm auto-width ${sharePublic === 1 ? 'active' : ''}`}
                    onClick={() => toggleState(sharePublic, setSharePublic)}
                >
                    Share to Public
                </button>
                <button id="cancel-comment" type="button" className="btn btn-secondary" onClick={() => clearComment()}>Cancel</button>
                <button id="confirm-comment" type="button" className="btn btn-success" onClick={() => submitComment()}>Submit</button>
            </div>
        </div>
    );
}
