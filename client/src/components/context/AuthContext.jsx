
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('AuthContext - Initializing with token:', token ? 'Present' : 'Absent');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth/me');
          console.log('AuthContext - User fetched:', {
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            isAdmin: res.data.isAdmin
          });
          setUser(res.data);
        } catch (err) {
          console.error('AuthContext - Error fetching user:', err.response?.data || err);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        }
      } else {
        console.log('AuthContext - No token found');
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log('AuthContext - Login attempt:', { email });
      const res = await axios.post('/api/auth/login', { email, password });
      console.log('AuthContext - Login successful:', {
        _id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        isAdmin: res.data.user.isAdmin
      });
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      setUser(res.data.user);
      return res.data;
    } catch (err) {
      console.error('AuthContext - Login error:', err.response?.data || err);
      throw err.response?.data || { message: 'Login failed' };
    }
  };

  const logout = () => {
    console.log('AuthContext - Logging out');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
