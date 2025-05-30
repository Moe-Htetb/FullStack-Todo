# FullStack-Todo

A full-stack todo application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (login, register, logout)
- Create, read, update, and delete notes
- Profile management
- Responsive design

## Tech Stack

- **Frontend**: React, Redux, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/FullStack-Todo.git
   cd FullStack-Todo
   ```

2. Install dependencies:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:

   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_API_URL=http://localhost:5173
   ```

4. Start the server:

   ```bash
   cd server
   npm start
   ```

5. Start the client:
   ```bash
   cd client
   npm start
   ```

## Usage

- Open your browser and navigate to `http://localhost:5173`
- Register a new account or login with existing credentials
- Create, edit, and delete notes
- Update your profile information

## License

MIT
