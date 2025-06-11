import React, { useEffect, useState } from 'react';
import LoginSection from './LoginSection';
import AdminPanel from './AdminPanel';

const AdminApp = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && (role === 'admin' || role === 'superadmin')) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
  };

  const handleLoginSuccess = () => setIsAdmin(true);

  return (
    <>
      {isAdmin ? (
        <AdminPanel onLogout={handleLogout} />
      ) : (
        <LoginSection onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default AdminApp;