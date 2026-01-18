# 📚 BooksCourier - Library to Home Delivery Platform

> **A modern, full-featured e-commerce platform for book delivery with advanced filtering, real-time dashboard, and comprehensive user management.**

![React](https://img.shields.io/badge/React-19.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-purple?logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.0-cyan?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)

## 🌟 **Live Demo**

- **Frontend**: [BooksCourier Live](https://books-courier-library-to-home.web.app)
- **Backend API**: [API Documentation](https://books-courier-library-to-home-serve.vercel.app)

---

## 🎯 **Project Overview**

BooksCourier is a comprehensive book delivery platform that connects readers with their favorite books through an intuitive online marketplace. The platform features advanced search and filtering, real-time dashboards, multi-role user management, and seamless payment integration.

### **🎨 Key Features**

#### **🏠 Homepage (10 Sections)**
- **Hero Banner**: Interactive 3-slide carousel with auto-advance
- **Latest Books**: Newest additions with wishlist functionality
- **Categories**: Browse books by genre with visual cards
- **How It Works**: Step-by-step delivery process
- **Statistics**: Live platform metrics and achievements
- **Coverage Areas**: Service availability map
- **Newsletter**: Subscription with email validation
- **FAQ**: Expandable questions and answers
- **About Section**: Company information and mission
- **Contact**: Multiple contact methods and form

#### **📖 Book Management**
- **Advanced Search**: Search by title, author, or keywords
- **Smart Filters**: Rating (2+, 3+, 4+ stars), price range, categories
- **Multiple Sorting**: Latest, price (low/high), rating, popularity
- **Infinite Scroll**: Seamless pagination with loading states
- **Book Details**: Comprehensive information with specifications
- **Related Books**: AI-powered recommendations
- **Wishlist System**: Save favorites with persistent storage

#### **🔐 Authentication System**
- **Email/Password**: Traditional registration and login
- **Google OAuth**: One-click Google sign-in
- **Facebook Login**: Social media authentication
- **Demo Account**: Quick access with pre-filled credentials
- **Role Management**: User, Seller, Admin permissions
- **Profile Management**: Update personal information

#### **📊 Real-time Dashboard**
- **Role-based Views**: Different interfaces for User/Seller/Admin
- **Live Statistics**: Auto-refreshing metrics every 30 seconds
- **Interactive Charts**: Line, bar, and doughnut charts with Chart.js
- **Animated Counters**: Smooth number transitions
- **Activity Feed**: Real-time updates with pulse animations
- **Responsive Design**: Works on all devices

#### **🎨 Theme System**
- **Light/Dark Mode**: Complete theme switching
- **WCAG AAA Compliant**: Accessible color contrasts
- **CSS Variables**: Consistent theming across components
- **Smooth Transitions**: Animated theme changes
- **Persistent Preference**: Remembers user choice

#### **📱 User Experience**
- **Responsive Design**: Mobile-first approach
- **Loading States**: Professional skeleton animations
- **Error Handling**: Graceful fallbacks and user feedback
- **Smooth Scrolling**: Enhanced navigation experience
- **Custom Scrollbar**: Branded scroll indicators
- **Breadcrumbs**: Clear navigation paths

---

## 🛠 **Technology Stack**

### **Frontend**
- **React 19**: Latest React with concurrent features
- **Vite 7.2**: Lightning-fast build tool and dev server
- **Tailwind CSS 4**: Utility-first CSS framework
- **DaisyUI**: Beautiful component library
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Efficient data fetching and caching
- **React Router**: Client-side routing
- **Chart.js**: Interactive data visualizations

### **Backend Integration**
- **Node.js**: Server runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for scalability
- **Firebase Auth**: Secure authentication system
- **Axios**: HTTP client for API communication

### **Development Tools**
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Git**: Version control
- **Firebase Hosting**: Deployment platform

---

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control
- Firebase account for authentication
- MongoDB database (local or cloud)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/books-courier-client.git
   cd books-courier-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### **Build for Production**
```bash
npm run build
npm run preview  # Preview production build
```

---

## 📁 **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── shared/          # Navigation, Footer, etc.
│   ├── EmptyState.jsx   # No data states
│   ├── LoadingSpinner.jsx
│   ├── ScrollToTop.jsx
│   └── Breadcrumbs.jsx
├── contexts/            # React Context providers
│   ├── AuthProvider.jsx # Authentication state
│   └── ThemeContext.jsx # Theme management
├── hooks/               # Custom React hooks
│   ├── useAuth.jsx      # Authentication hook
│   ├── useTheme.jsx     # Theme switching
│   ├── useRole.jsx      # User role management
│   └── useAxiosSecure.jsx
├── layouts/             # Page layouts
│   ├── RootLayout.jsx   # Main app layout
│   └── DashboardLayout.jsx
├── pages/               # Application pages
│   ├── Home/           # Homepage sections
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── AllBooks.jsx    # Book listing
│   ├── BookDetails.jsx # Individual book page
│   ├── About.jsx       # About page
│   └── Contact.jsx     # Contact page
├── router/             # Route configuration
└── firebase/           # Firebase configuration
```

---

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Blue (#3b82f6) - Navigation, buttons, links
- **Secondary**: Purple (#8b5cf6) - Accents, highlights
- **Accent**: Pink (#ec4899) - Call-to-action elements
- **Success**: Green (#10b981) - Success states
- **Warning**: Orange (#f59e0b) - Warnings
- **Error**: Red (#ef4444) - Error states

### **Typography**
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular weights
- **Code**: Monospace for technical content

### **Spacing**
- **Base unit**: 4px (0.25rem)
- **Component spacing**: 16px, 24px, 32px
- **Section spacing**: 48px, 64px, 96px

---

## 🔧 **API Integration**

### **Backend Endpoints**

#### **Books API**
```javascript
GET /books                    // Get all books with filters
GET /books/:id               // Get single book details
POST /books                  // Add new book (seller/admin)
PUT /books/:id               // Update book (seller/admin)
DELETE /books/:id            // Delete book (seller/admin)
```

#### **Authentication**
```javascript
POST /users/register         // User registration
POST /users/login           // User login
GET /users/:email/role      // Get user role
PUT /users/:email           // Update user profile
```

#### **Dashboard APIs**
```javascript
GET /admin/orders-stats     // Admin order statistics
GET /admin/users-stats      // User growth metrics
GET /seller/orders-stats    // Seller-specific orders
GET /user/orders-stats      // User order history
```

### **Query Parameters**
- **search**: Search by title or author
- **rating**: Filter by minimum rating (2, 3, 4)
- **sort**: Sort by latest, price (low/high), rating
- **page**: Pagination page number
- **limit**: Items per page
- **category**: Filter by book category

---

## 🧪 **Testing**

### **Manual Testing Checklist**

#### **Authentication**
- [ ] Email/password registration and login
- [ ] Google OAuth integration
- [ ] Facebook login functionality
- [ ] Demo account access
- [ ] Role-based access control

#### **Book Features**
- [ ] Search functionality (title, author)
- [ ] Rating filters (2+, 3+, 4+ stars)
- [ ] Price sorting (low to high, high to low)
- [ ] Infinite scroll pagination
- [ ] Wishlist add/remove functionality
- [ ] Book details page navigation

#### **Dashboard**
- [ ] Role-specific dashboard views
- [ ] Real-time data updates (30s interval)
- [ ] Interactive charts and animations
- [ ] Responsive design on mobile/tablet
- [ ] Theme switching in dashboard

#### **Theme System**
- [ ] Light/dark mode toggle
- [ ] Theme persistence across sessions
- [ ] Consistent theming on all pages
- [ ] Smooth theme transitions
- [ ] Accessibility compliance

### **Performance Testing**
- [ ] Page load times under 3 seconds
- [ ] Smooth animations at 60fps
- [ ] Efficient API caching with React Query
- [ ] Optimized image loading
- [ ] Mobile performance optimization

---

## 🚀 **Deployment**

### **Firebase Hosting**

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize project**
   ```bash
   firebase init hosting
   ```

4. **Build and deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### **Environment Variables**
Ensure all environment variables are properly configured in your hosting platform:
- Firebase configuration keys
- API base URLs
- Feature flags

---

## 🤝 **Contributing**

### **Development Workflow**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Code Standards**
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers

### **Pull Request Guidelines**
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed
- Request review from maintainers

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 **Team**

- **Frontend Developer**: React, UI/UX Implementation
- **Backend Developer**: Node.js, MongoDB, API Design
- **DevOps**: Firebase, Deployment, CI/CD

---

## 📞 **Support**

- **Email**: support@bookscourier.com
- **Documentation**: [Project Wiki](https://github.com/yourusername/books-courier-client/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/books-courier-client/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/books-courier-client/discussions)

---

## 🎉 **Acknowledgments**

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Firebase** for authentication and hosting
- **Chart.js** for beautiful data visualizations
- **Framer Motion** for smooth animations
- **Open Source Community** for inspiration and tools

---

**Built with ❤️ by the BooksCourier Team**

*Bringing books to your doorstep, one delivery at a time.*
