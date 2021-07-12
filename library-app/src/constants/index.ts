import 'dotenv/config';

export const BOOKS_DB_SETTINGS = {
    connectionString: `${process.env.DB_HOST}/${process.env.DB_NAME}`
}

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

export const UPLOAD_SETTINGS = {
    BOOKS_UPLOAD_DIRECTORY: './upload/',
    BOOKS_FORM_FIELDNAME: 'bookFile',
    BOOKS_FILES_EXTENSIONS: ['txt', 'pdf'],
    MAX_FILE_SIZE_IN_BYTES: 50 * 1024,
    UNSUPPORTED_EXTENSION_CODE: 'UNSUPPORTED_EXTENSION',
    LIMIT_FILE_SIZE_CODE: 'LIMIT_FILE_SIZE'
}
