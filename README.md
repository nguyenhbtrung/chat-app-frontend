# Chat App Frontend - React (Vite + Material UI + Socket.IO)

## 📌 Overview
This is a modern chat application frontend built with **React + Vite**, using **Material UI** for the interface, **Socket.IO** for real-time messaging, **i18next** for internationalization, and **React Router** for routing.

Backend repository: [chat-app-backend](https://github.com/nguyenhbtrung/chat-app-backend)

---

## 🚀 Tech Stack
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Material UI](https://mui.com/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [React Router](https://reactrouter.com/)
- [i18next](https://www.i18next.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [Yarn](https://yarnpkg.com/) (Package Manager)

---

## 📂 Project Structure
```
.
├── public/
│   └── locales/      # i18n translation files
├── src/
│   ├── components/   # Reusable components
│   ├── context/      # React contexts
│   ├── hooks/        # Custom hooks
│   ├── i18n/         # i18n configuration
│   ├── pages/        # Page components
│   ├── routes/       # Route configurations
│   ├── services/     # API services
│   ├── socket.js     # Socket.IO setup
│   └── App.jsx       # Root component
├── .env             # Environment variables
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Variables
Create a `.env` file in the project root:

```env
VITE_BACKEND_BASE_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/nguyenhbtrung/chat-app-frontend.git
cd chat-app-frontend
```

### 2. Install dependencies

```bash
yarn
```

### 3. Start development server

```bash
yarn dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint
```

---

## 🌍 Internationalization

The app supports multiple languages using i18next:

- Translation files are located in `/public/locales/<lang>/`
- Supported namespaces:
  - `common`: Shared translations
  - `auth`: Authentication related
  - `chat`: Chat interface
  - `errors`: Error messages
  - `time`: Time formatting
  - And more...

---

## 🔌 Socket.IO Integration

Socket.IO is used for real-time features:
- Connection setup in `src/socket.js`
- Authentication using JWT token
- Event handling for:
  - User presence
  - Real-time messaging
  - Notifications

---

## 🎨 UI Components

Built with Material UI (v7):
- Responsive layout
- Dark/light theme support
- Custom components for:
  - Chat interface
  - User lists
  - Forms
  - Notifications

---

## 🔒 Authentication

- JWT-based authentication
- Token stored in localStorage
- Protected routes
- Automatic token refresh
- Login/Register forms with validation

---

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Mobile-specific layouts
- Adaptive navigation
- PWA ready

---

## 📝 Notes

* Ensure `.env` is configured properly
* Backend server must be running for full functionality
* Node.js 18+ recommended
* Yarn 1.22+ recommended
* For production deployment:
  - Set proper environment variables
  - Enable HTTPS
  - Configure proper CORS settings
