import 'dotenv/config';

export const BOOKS_DB_SETTINGS = {
    connectionString: `${process.env.DB_HOST}/${process.env.DB_NAME}`
}
