# Room Rent Application

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

A modern full-stack room rental platform that allows users to browse available rooms, save favorites, place bookings, and make payments, while giving owners and admins tools to manage listings and reservations.

## ✨ Overview

This project combines a React + Vite frontend with an Express + Node.js backend and MongoDB database to provide a seamless rental experience for three user roles:

- **Users**: browse rooms, favorite listings, book rooms, and view booking history
- **Owners**: add and manage their own rooms and bookings
- **Admins**: oversee platform operations and manage listings

## 🚀 Features

- Secure user authentication and role-based access control
- Room listing with detailed room information
- Favorite room management for quick access
- Booking flow with reservation history
- Secure payments integration via Razorpay
- Image upload support using Cloudinary
- Admin and owner dashboards for platform management
- Responsive UI built with Tailwind CSS and React

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- Cloudinary for media uploads
- Razorpay for payments

## 📁 Project Structure

```text
room-rent-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
└── README.md
```

## ✅ Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm or yarn installed
- A MongoDB instance or MongoDB Atlas connection string
- A Cloudinary account
- A Razorpay account

## ⚙️ Environment Variables

Create a `.env` file inside the backend directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd room-rent-app
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

## ▶️ Running the Application

### Start the backend

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`.

### Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`.

## 👤 Usage

1. Open the frontend in your browser.
2. Register an account or log in.
3. Browse rooms, add favorites, and make bookings.
4. Owners can add and manage rooms.
5. Admins can manage the platform from the admin dashboard.

## 🔗 API Notes

The backend exposes REST APIs under the `/api` route group, covering:

- authentication
- room management
- bookings
- payments
- admin operations

## 👨‍💻 Developer

- Developer: Mohit Chauhan

## 🤝 Contributing

Contributions are welcome. If you would like to improve the project:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Submit a pull request

## 📄 License

This project is licensed under the ISC license.
