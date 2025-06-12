# Online Portfolio Builder

A full-stack web application built with the MERN stack, allowing users to create, customize, and share professional portfolios. The application includes user authentication, portfolio creation with customizable templates, real-time preview, image uploads, shareable links, and an admin dashboard for user management.

## Features
- **User Authentication**: Secure registration and login using JWT and bcrypt.
- **Portfolio Creation**: Users can add bio, skills, experience, projects, and a profile picture.
- **Template Selection**: Choose from three design templates (Modern, Minimal, Professional).
- **Real-Time Preview**: See portfolio updates instantly as you edit.
- **Shareable Links**: Public portfolio accessible via unique URLs (e.g., `/portfolio/username`).
- **Admin Dashboard**: Admins can view, edit, and delete user accounts (with self-deletion protection).
- **Image Uploads**: Upload profile pictures with Multer, supporting JPG and PNG formats.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **File Uploads**: Multer
- **Environment Management**: dotenv
- **Development Tools**: Nodemon, Vite

## Project Structure
```
portfolio-builder/
├── client/                 # Frontend (React with Vite)
│   ├── src/
│   │   ├── components/     # Reusable components (Auth, Portfolio, Admin, etc.)
│   │   ├── pages/          # Page components (Home, Login, Portfolio, etc.)
│   │   ├── templates/      # Portfolio templates (Modern, Minimal, Professional)
│   │   ├── context/        # AuthContext for state management
│   │   ├── App.jsx         # Main app with routes
│   │   ├── main.jsx        # Entry point
│   │   ├── index.css       # Tailwind CSS
│   ├── .env               # Frontend environment variables
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   ├── vite.config.js     # Vite configuration
├── server/                # Backend (Node.js, Express)
│   ├── config/            # Database connection (db.js)
│   ├── models/            # Mongoose schemas (User, Portfolio)
│   ├── routes/            # API routes (auth, portfolio, admin)
│   ├── middleware/        # Authentication and admin middleware
│   ├── uploads/           # Folder for uploaded images
│   ├── .env               # Backend environment variables
│   ├── package.json       # Backend dependencies
│   ├── server.js          # Main server file
│   ├── seedAdmin.js       # Script to seed admin user
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
```

## Setup Instructions
Follow these steps to run the project locally.

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local instance or MongoDB Atlas)
- **Git** (for cloning the repository)
- **Code Editor** (e.g., VS Code)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone <your-repo-url>
   cd portfolio-builder
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Configure Environment Variables**:
   - Create `server/.env`:
     ```plaintext
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```
     - For local MongoDB: `MONGO_URI=mongodb://localhost:27017/portfolio-builder`
     - For MongoDB Atlas: Use the connection string from your Atlas dashboard.
     - Set `JWT_SECRET` to a secure random string (e.g., `mysecretkey123`).
   - Create `client/.env`:
     ```plaintext
     VITE_API_URL=http://localhost:5000/api
     ```

5. **Start MongoDB**:
   - For local MongoDB, ensure it’s running:
     ```bash
     mongod
     ```
   - For MongoDB Atlas, ensure your IP is whitelisted and the `MONGO_URI` is correct.

6. **Seed an Admin User (Optional)**:
   To create an admin user for testing the admin dashboard:
   ```bash
   cd server
   node seedAdmin.js
   ```
   This creates a user with:
   - Email: `admin@example.com`
   - Password: `admin123`
   - Name: `Admin User`
   - `isAdmin: true`

7. **Run the Backend**:
   ```bash
   cd server
   npm start
   ```
   The backend will run on `http://localhost:5000`.

8. **Run the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

9. **Access the Application**:
   - Open `http://localhost:5173` in your browser.
   - Register a new user or log in with existing credentials.
   - Create a portfolio, choose a template, and share it via `/portfolio/<username>`.
   - Log in as an admin to access the admin dashboard at `/admin`.

## Testing
- **User Features**:
  - Register and log in with valid credentials.
  - Create/edit a portfolio with bio, skills, experience, projects, and a profile picture.
  - Preview the portfolio in real-time and switch templates.
  - Access the public portfolio link (e.g., `http://localhost:5173/portfolio/<username>`).
- **Admin Features**:
  - Log in as an admin (e.g., `admin@example.com`).
  - Access the admin dashboard (`/admin`) to view, edit, or delete users.
  - Note: The logged-in admin cannot delete their own account for security.
- **Responsive Design**:
  - Test on mobile and desktop devices using browser DevTools.
- **API Testing**:
  - Use Postman or `curl` to test endpoints like:
    - `POST /api/auth/register`
    - `POST /api/auth/login`
    - `POST /api/portfolio` (with token and form data)
    - `GET /api/portfolio/<username>`
    - `GET /api/admin/users` (admin only)

## Troubleshooting
- **MongoDB Connection Error**:
  - Ensure MongoDB is running locally or the `MONGO_URI` is correct for Atlas.
  - Check `server/.env` for proper configuration.
- **Server Error on Public Portfolio**:
  - Verify the user exists in `db.users` and has a portfolio in `db.portfolios`.
  - Check backend logs for errors (`npm run dev`).
- **Admin Dashboard Issues**:
  - Ensure the logged-in user has `isAdmin: true` in MongoDB.
  - Verify the "Delete" button appears for all users except the logged-in admin.
- **Frontend Not Loading**:
  - Check `client/.env` for `VITE_API_URL`.
  - Clear browser cache or use Incognito mode.


