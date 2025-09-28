import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const onDashboard = location.pathname === '/dashboard';

  return (
    <header className="header">
      <div className="brand">TaskManager</div>
      <nav>
        {user ? (
          <>
            {onDashboard ? (
              <Link to="/tasks"><button className="btn btn-success">Tasks</button></Link>
            ) : (
              <Link to="/dashboard"><button className="btn btn-success">Dashboard</button></Link>
            )}
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
