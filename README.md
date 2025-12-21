# 📚 BookCourier – Library to Home Book Delivery (Client)

BookCourier is a modern, scalable **library-to-home book delivery platform** designed to connect users, sellers, and administrators in a single ecosystem.  
This repository contains the **client-side (frontend)** application built with **React** and contemporary web technologies, focusing on performance, security, and user experience.

---

## 🌐 Live Application

👉 **https://books-courier.web.app/**

---

## ✨ Key Features

### 👤 User
- Secure authentication (Login / Register)
- Browse and search available books
- View detailed book information
- Place delivery orders
- Online payment integration
- Order history and invoices
- Profile management

### 🛒 Seller
- Seller account onboarding
- Add, edit, and manage books
- Order management dashboard
- Track order status

### 🛠 Admin
- Seller approval and management
- User management
- Global book management
- Platform-level oversight

### 🔐 Security & Access Control
- Private and protected routes
- Role-based authorization (User / Seller / Admin)
- Secure dashboard access

### ❌ Error & Exception Handling
- Global application error handling
- Public 404 (Not Found) page
- Dashboard-specific 404 page
- Authentication layout 404 page

---

## 🧰 Tech Stack

### Frontend
- **React 18**
- **React Router DOM (v6.4+)**
- **Tailwind CSS**
- **TanStack Query (React Query)**
- **Firebase Authentication**
- **Axios**
- **SweetAlert2**
- **AOS (Animate On Scroll)**

### Payment
- **Stripe (Client-side Integration)**


---

## 🧭 Routing Overview

- `/` → Public pages
- `/login`, `/register` → Authentication
- `/dashboard/*` → Protected dashboard routes
- Role-based routes for **Admin** and **Seller**
- Wildcard (`*`) routes for graceful error handling

---

## 🧪 Error Pages

| Error Type | Description |
|----------|-------------|
| 404 | Page Not Found |
| 403 | Unauthorized Access |
| 500 | Server / Loader Error |
| Dashboard 404 | Invalid dashboard route |

---

## ▶️ Getting Started (Local Setup)

To run the project locally, follow these steps:

```bash
git clone https://github.com/your-username/books-courier-client.git
cd books-courier-client
npm install
npm run dev

---

## 🔐 Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
VITE_API_BASE_URL=your_server_url
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key




