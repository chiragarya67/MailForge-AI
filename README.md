# Mailforge AI

Mailforge AI is a full-stack cold outreach generator that creates personalized email sequences from prospect and company context. It generates a subject line, cold email, follow-up email, and LinkedIn DM in one request.

## Features

- AI-generated personalized cold emails
- Follow-up email generation
- LinkedIn DM generation
- User registration and login
- Email OTP verification
- Password show/hide controls
- MongoDB user and email history storage
- Copy generated messages to the clipboard
- Responsive React interface

## Tech Stack

### Client

- React
- Vite
- React Router
- Tailwind CSS
- Axios
- Heroicons

### Server

- Node.js
- Express
- MongoDB with Mongoose
- Groq API
- Nodemailer
- JWT authentication
- bcryptjs password hashing

## Project Structure

```text
.
├── client/                 # React/Vite frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── utils/
├── server/                 # Express backend
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   └── utils/
└── .gitignore
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB database
- Groq API key
- Gmail account with a Google App Password for OTP emails

## Installation

Clone the repository and install dependencies in both applications:

```bash
git clone <your-repository-url>
cd "Ai coldmail genrator"

cd server
npm install

cd ../client
npm install
```

## Environment Variables

Create `server/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

Create `client/.env` only if the API is not running at the default URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Never commit `.env` files or API keys to GitHub.

## Running Locally

Open two terminals from the project root.

### Start the backend

```bash
cd server
npm start
```

The API runs at `http://localhost:3000`.

### Start the frontend

```bash
cd client
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API Overview

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a user and send an OTP |
| POST | `/api/auth/login` | Log in a verified user |
| POST | `/api/auth/verifymail` | Verify a user's email OTP |
| POST | `/api/ai/generate-email` | Generate an outreach sequence |
| GET | `/api/ai/history` | Get the authenticated user's email history |

The AI generation and history endpoints require a valid JWT bearer token.

## Example AI Input

Provide details such as:

```text
Write outreach for a marketing director at a SaaS company. We offer an AI analytics tool that improves customer retention by 20%. Keep the tone professional and conversational.
```

Mailforge AI returns:

- Subject line
- Cold email
- Follow-up email
- LinkedIn DM

## Scripts

### Client

- `npm run dev` - Start the Vite development server
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

### Server

- `npm start` - Start the Express server

## Security Notes

- Use a Gmail App Password instead of your normal Gmail password.
- Rotate any credentials that have been exposed.
- Use a strong, unique `JWT_SECRET` in production.
- Configure restricted CORS origins before deploying publicly.
- Store production secrets in the deployment platform's environment settings.

## License

This project is currently not published under a specific open-source license.
