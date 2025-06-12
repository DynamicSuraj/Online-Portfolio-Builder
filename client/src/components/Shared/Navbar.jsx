import { useContext } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { AuthContext } from '../context/AuthContext'

    const Navbar = () => {
      const { user, logout } = useContext(AuthContext);
      const navigate = useNavigate();

      const handleLogout = () => {
        logout();
        navigate('/login');
      };

      return (
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Portfolio Builder</Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">Home</Link>
              {user ? (
                <>
                  <Link to="/portfolio" className="hover:underline">My Portfolio</Link>
                  {user.isAdmin && (
                    <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="hover:underline">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="hover:underline">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      );
    };

    export default Navbar;