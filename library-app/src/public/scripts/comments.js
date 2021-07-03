const roomName = location.pathname.split('/').pop();
const socket = io.connect('/', { query: { roomName } });
const commentsList = document.querySelector('#book-comments');
const inputUserName = document.querySelector('#username');
const inputCommentText = document.querySelector('#comment');
const sendButtom = document.querySelector('#comment-send-button');
const COMMENT_ADDED_EVENT = 'comment-added';

const DEFAULT_LOCALE = 'ru';
const getDateFormatted = (date) => {
    return `${date.toLocaleDateString(DEFAULT_LOCALE)}`;
}

const getTemplate = ({ userName, text, created }) => {
    const formattedDate = getDateFormatted(new Date(created));
    return `<div class="card">
                <div class="card-header">${userName}</div>
                <div class="card-body">
                    <p class="card-text">${text}</p>
                </div>
                <div class="card-footer text-muted small">${formattedDate}</div>
            </div>`
}

socket.on(COMMENT_ADDED_EVENT, (msg) => {
    const newDomEl = getTemplate(msg);
    commentsList.insertAdjacentHTML('beforeend', newDomEl);
    inputUserName.value = '';
    inputCommentText.value = '';
})
sendButtom.addEventListener('click', () => {
    socket.emit(COMMENT_ADDED_EVENT, {
        userName: inputUserName.value,
        text: inputCommentText.value,
        created: new Date()
    })
})