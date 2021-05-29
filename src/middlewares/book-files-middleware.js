const multer = require('multer');
const { ErrorResult } = require('../models');
const { UPLOAD_SETTINGS, HTTP_STATUS_CODES } = require('../constants');

const multerStorage = multer.diskStorage({
    destination: UPLOAD_SETTINGS.BOOKS_UPLOAD_DIRECTORY,
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    }
})

const fileNameRegex = UPLOAD_SETTINGS.BOOKS_FILES_EXTENSIONS && UPLOAD_SETTINGS.BOOKS_FILES_EXTENSIONS.length
    ? new RegExp(`.+\.${UPLOAD_SETTINGS.BOOKS_FILES_EXTENSIONS.join('|')}$`)
    : null;

const fileFilter = fileNameRegex ? (req, file, cb) => {
  if (!fileNameRegex.test(file.originalname)) {
      cb(new multer.MulterError(UPLOAD_SETTINGS.UNSUPPORTED_EXTENSION_CODE, file.fieldname));
  } else {
      cb(null, true);
  }
} : null;

const uploadOptions = {
    storage: multerStorage,
    limits: {
        fileSize: UPLOAD_SETTINGS.MAX_FILE_SIZE_IN_BYTES
    },
    fileFilter
}

const getErrorMessage = code => {
    switch (code) {
        case UPLOAD_SETTINGS.LIMIT_FILE_SIZE_CODE:
            return `Check file size. Max file size is ${UPLOAD_SETTINGS.MAX_FILE_SIZE_IN_BYTES} bytes`;
        case UPLOAD_SETTINGS.UNSUPPORTED_EXTENSION_CODE:
            return `Only files with extensions ${UPLOAD_SETTINGS.BOOKS_FILES_EXTENSIONS.map(x => `'.${x}'`).join(', ')} can be processed`;
        default:
            return 'Attempt to save file failed';
    }
}

const upload = multer(uploadOptions).single(UPLOAD_SETTINGS.BOOKS_FORM_FIELDNAME);

const fileUpload = (req, res, next) => {
    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json(new ErrorResult(`Invalid request. ${getErrorMessage(err.code)}`));
        } else {
            next();
        }
    })
}
module.exports = fileUpload;