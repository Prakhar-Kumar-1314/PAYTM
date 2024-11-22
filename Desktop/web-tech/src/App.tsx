import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Shoes from './pages/Shoes';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useStore } from './store';

function App() {
  const { user } = useStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Navbar />}
        <div className={user ? 'pt-16' : ''}>
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Landing />}
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/shoes"
              element={user ? <Shoes /> : <Navigate to="/" />}
            />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/wishlist"
              element={user ? <Wishlist /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={user ? <Orders /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/dashboard" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;