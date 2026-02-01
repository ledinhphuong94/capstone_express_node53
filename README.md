# Instagram Clone Backend

This is a Node.js backend application for an Instagram-like social media platform. It provides APIs for user authentication, posting, commenting, liking, and bookmarking features.

### Links:
1. Link github: https://github.com/ledinhphuong94/capstone_express_node53.git
2. Link youtube: https://youtu.be/hNlf8xbIM7M
3. Database: https://github.com/ledinhphuong94/capstone_express_node53/blob/master/database.gz
4. File Json PostMan: https://github.com/ledinhphuong94/capstone_express_node53/blob/master/Capstone_Insta.postman_collection.json
5. File Read me with details endpoints: https://github.com/ledinhphuong94/capstone_express_node53/blob/master/README.md

## Features

- User authentication (register, login)
- User profiles
- Posts with images
- Comments on posts
- Likes on posts
- Bookmarks for posts

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM for database management
- **JWT** - Authentication
- **Cloudinary** - Image hosting
- **Bcrypt** - Password hashing
- **EmailJS** - Email services

## Installation

1. Clone the repository:
   ```
   git clone <https://github.com/ledinhphuong94/capstone_express_node53.git>
   cd instagram
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Configure your database in `prisma/schema.prisma`
   - Run Prisma migrations:
     ```
     npx prisma migrate dev
     ```

4. Configure environment variables:
   - Create a `.env` file with necessary variables (e.g., database URL, JWT secret, Cloudinary credentials)

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The API will be available at `http://localhost:3000` (or your configured port)

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/verifyOtp` - Verify OTP
- `POST /auth/genOtp` - Generate OTP
- `POST /auth/login` - Login user
- `POST /auth/refreshToken` - Refresh access token
- `POST /auth/logout` - Logout user

### Users
- `GET /user/personal` - Get personal user info
- `PUT /user/personal` - Update personal user info

### Posts
- `GET /posts` - Get all posts
- `GET /posts/:id` - Get a specific post
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comments
- `GET /post/:id/comments` - Get comments for a post
- `POST /post/:id/comments` - Add a comment to a post
- `PUT /post/:id/comments/:commentId` - Update a comment
- `DELETE /post/:id/comments/:commentId` - Delete a comment

### Likes
- `GET /post/:id/like` - Get likes for a post
- `POST /post/:id/like` - Toggle like on a post

### Bookmarks
- `GET /post/:id/bookmark` - Check if post is bookmarked
- `POST /post/:id/bookmark` - Toggle bookmark on a post
- `GET /bookmarks` - Get user's bookmarked posts

For detailed API documentation, refer to the router files in `src/routers/`.

## Project Structure

```
src/
├── common/
│   ├── constant/
│   ├── helpers/
│   └── middleware/
├── controllers/
├── models/
├── routers/
└── services/
prisma/
├── schema.prisma
server.js
package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is for educational purposes.