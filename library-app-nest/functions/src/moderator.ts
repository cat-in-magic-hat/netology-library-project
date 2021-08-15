import * as functions from 'firebase-functions';

const defaultDescription = 'Скоро здесь будет описание…';

export const moderator = functions.database
    .ref('/books/{bookId}')
    .onWrite((change) => {
      const book = change.after.val();
      if (book && !book.description) {
        return change.after.ref.update({
          description: defaultDescription,
        });
      }
      return null;
    });