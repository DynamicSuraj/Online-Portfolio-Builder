
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../src/components/context/AuthContext';
import { AuthProvider } from '../src/components/context/AuthContext';
import Navbar from '../src/components/Shared/Navbar';
import Footer from '../src/components/Shared/Footer';
import Home from '../src/components/pages/Home';
import LoginPage from '../src/components/pages/LoginPage';
import RegisterPage from '../src/components/pages/RegisterPage';
import PortfolioPage from '../src/components/pages/PortfolioPage';
import AdminPage from '../src/components/pages/AdminPage';
import PublicPortfolio from '../src/components/pages/PublicPortfolio';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  console.log('ProtectedRoute - User:', user, 'Loading:', loading, 'AdminOnly:', adminOnly);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to /login');
    return <Navigate to="/login" />;
  }
  if (adminOnly && !user.isAdmin) {
    console.log('ProtectedRoute - User not admin, redirecting to /');
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/portfolio"
                element={
                  <ProtectedRoute>
                    <PortfolioPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/portfolio/:username" element={<PublicPortfolio />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
