# FastCart 🛒

A modern e-commerce admin dashboard built with **React**, complete with a responsive navbar, collapsible sidebar, and dynamic category management using a backend API.

## 🚀 Features

- 🔐 Authentication with JWT (reads username from token)
- 📦 Manage product categories (view, edit, add)
- 🔧 Responsive Navbar with logout functionality
- 📂 Sidebar with active tab highlighting and sections
- 💬 Real-time message and notification icons with badges
- 🎨 Smooth fade-in transitions on page refresh

## 🛠 Tech Stack

- **Frontend:** React, React Router, Axios, React Icons
- **Styling:** CSS
- **Backend:** Node.js + Express (API endpoints)
- **Data:** MongoDB Atlas


### Install dependencies
cd frontend
npm install
npm run dev

for backend 
cd backend 
npm install
npm start


🔑 Auth Example

The app looks for a JWT in `localStorage` under the key `token`. The username is decoded from this token and used in the Navbar.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

### 📬 Contact

If you'd like to collaborate or have questions, feel free to reach out!
