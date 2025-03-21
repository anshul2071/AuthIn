# AuthIn
A simple user authentication system with registration and login functionality, built with Node.js/Express (using a JSON file as a mock database) and a Vite-based frontend.

## Project Structure

```
Auth-JsonServer
├── auth-in        # Frontend (HTML, CSS, JS - uses Vite)
│   ├── src
│   │   ├── components
│   │   │   ├── login.js
│   │   │   ├── navbar.js
│   │   │   ├── register.js
│   │   │   └── toggleform.js
│   │   ├── index.css
│   │   └── main.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── backend          # Backend (Node.js/Express server)
    ├── db.json
    ├── package.json
    └── server.js
```

## Features

- **User Registration**: Sign up with email, password, and basic profile info
- **User Login**: Authenticate with email and password
- **Session Handling**: Uses localStorage on the frontend to store session state
- **Mock Database**: Persists user data in db.json
- **Dynamic Navbar**: Shows a navbar when the user is logged in, hides it when logged out
- **Form Transition**: Smooth transitions between login and registration forms

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Auth-JsonServer.git
cd Auth-JsonServer
```

2. Install dependencies for both frontend and backend:
```bash
# For the backend
cd backend
npm install

# For the frontend
cd ../auth-in
npm install
```

### Running the Backend

1. Navigate to the backend folder:
```bash
cd backend
```

2. Start the server:
```bash
node server.js
```
The server will run on http://localhost:3001

### Running the Frontend

1. Navigate to the auth-in folder:
```bash
cd auth-in
```

2. Start the Vite development server:
```bash
npm run dev
```

3. Open your browser at the URL printed in the console (typically http://localhost:5173)

## Deployment

### Deploying the Backend

**Render or Railway:**
1. Push your code to GitHub
2. Create a new web service on Render or Railway
3. Connect your GitHub repository and select the backend folder
4. Set the start command to `node server.js`
5. Note the public URL (e.g., https://your-backend.onrender.com)

### Deploying the Frontend

**Vercel or Netlify:**
1. Push your code to GitHub
2. Create a new site on Vercel or Netlify
3. Connect your GitHub repository and select the auth-in folder
4. Important: Update the API endpoints in your frontend code to point to your deployed backend URL

## Usage

1. Register a new account by filling out the registration form
2. Login using your email and password
3. Upon successful login, you'll be redirected to the navbar page
4. Click the "Logout" button to end your session

## Form Validation

The registration form includes validation for:
- Email format (must be a valid email)
- Password strength (minimum 8 characters, at least one uppercase letter and one number)
- Password confirmation (must match the password field)

## Security Notes

This project is for demonstration purposes only:
- Passwords are stored in plain text in the db.json file
- In a production environment, you should:
  - Use a proper database like MongoDB or PostgreSQL
  - Hash passwords before storing them
  - Implement proper session management
  - Use HTTPS for all communications

## License

This project is licensed under the MIT License - see the LICENSE file for details.