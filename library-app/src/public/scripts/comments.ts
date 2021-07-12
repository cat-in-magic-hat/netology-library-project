import { IComment } from "../../contracts/models";
import { io } from '../../typings/globals';

const roomName = location.pathname.split('/').pop();
const socket = io.connect('/', { query: { roomName } });
const commentsList = document.querySelector('#book-comments');
const inputUserName = document.querySelector('#username') as HTMLInputElement;
const inputCommentText = document.querySelector('#comment') as HTMLInputElement;
const sendButton = document.querySelector('#comment-send-button');
const COMMENT_ADDED_EVENT = 'comment-added';

const DEFAULT_LOCALE = 'ru';
const getDateFormatted = (date: Date): string => {
    return `${date.toLocaleDateString(DEFAULT_LOCALE)}`;
}

const getTemplate = ({ userName, text, created }: IComment): string => {
    const formattedDate = getDateFormatted(new Date(created));
    return `<div class="card">
                <div class="card-header">${userName}</div>
                <div class="card-body">
                    <p class="card-text">${text}</p>
                </div>
                <div class="card-footer text-muted small">${formattedDate}</div>
            </div>`
}

socket.on(COMMENT_ADDED_EVENT, (msg: IComment) => {
    const newDomEl = getTemplate(msg);
    if (commentsList) {
        commentsList.insertAdjacentHTML('beforeend', newDomEl);
    }
    inputUserName.value = '';
    inputCommentText.value = '';
})

if (sendButton) {
    sendButton.addEventListener('click', () => {
        socket.emit(COMMENT_ADDED_EVENT, {
            userName: inputUserName.value,
            text: inputCommentText.value,
            created: new Date()
        })
    })
}
