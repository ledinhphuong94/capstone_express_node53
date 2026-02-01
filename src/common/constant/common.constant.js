import "dotenv/config";

// Prisma URL
export const DATABASE_URL = process.env.DATABASE_URL;
const {hostname, username, password, pathname, port} = new URL(DATABASE_URL);
export const DATABASE_HOST = hostname;
export const DATABASE_USER = username;
export const DATABASE_PASSWORD = password;
export const DATABASE_NAME = pathname.slice(1);
export const DATABASE_PORT = port;
export const VERIFY_CODE_TIME = 10;

// Email JS
export const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
export const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
export const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

// JWT
export const JWT_AT_SIGNATURE = process.env.JWT_AT_SIGNATURE;
export const JWT_RT_SIGNATURE = process.env.JWT_RT_SIGNATURE;

// CLOUDINARY
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;