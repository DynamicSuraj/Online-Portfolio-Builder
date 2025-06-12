
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', isAdmin: false });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      console.log('AdminDashboard - User:', user, 'Auth Loading:', authLoading);
      if (authLoading) return; // Wait for auth to complete
      if (!user) {
        console.log('AdminDashboard - No user, redirecting to login');
        setError('Please log in to access the admin dashboard');
        navigate('/login');
        return;
      }
      if (!user.isAdmin) {
        console.log('AdminDashboard - User is not admin, redirecting');
        setError('Access denied, admin only');
        navigate('/');
        return;
      }
      try {
        console.log('AdminDashboard - Fetching users');
        const res = await axios.get('/api/admin/users');
        console.log('AdminDashboard - Users fetched:', res.data);
        setUsers(res.data);
        setError('');
      } catch (err) {
        console.error('AdminDashboard - Fetch error:', err.response?.data || err);
        setError(err.response?.data?.message || 'Failed to load users');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [user, authLoading, navigate]);

  const handleDelete = async (userId) => {
    if (user._id === userId) {
      setError('Cannot delete yourself');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      console.log('AdminDashboard - Deleting user:', userId);
      const res = await axios.delete(`/api/admin/users/${userId}`);
      console.log('AdminDashboard - Delete response:', res.data);
      setUsers(users.filter((u) => u._id !== userId));
      setError('');
    } catch (err) {
      console.error('AdminDashboard - Delete error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleEdit = (u) => {
    console.log('AdminDashboard - Editing user:', u._id);
    setEditingUser(u._id);
    setEditForm({ name: u.name, email: u.email, isAdmin: u.isAdmin });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('AdminDashboard - Updating user:', editingUser, editForm);
      const res = await axios.put(`/api/admin/users/${editingUser}`, editForm);
      setUsers(users.map((u) => (u._id === editingUser ? res.data : u)));
      setEditingUser(null);
      setError('');
    } catch (err) {
      console.error('AdminDashboard - Update error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to update user');
    }
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setEditForm({ name: '', email: '', isAdmin: false });
  };

  if (authLoading || isLoading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Please log in to access the admin dashboard</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-600">No users found</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Admin</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border">
                  {editingUser === u._id ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleEditChange}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="checkbox"
                          name="isAdmin"
                          checked={editForm.isAdmin}
                          onChange={handleEditChange}
                          className="h-4 w-4"
                        />
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={handleEditSubmit}
                          className="bg-green-600 text-white p-1 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-600 text-white p-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{u.name}</td>
                      <td className="border p-2">{u.email}</td>
                      <td className="border p-2">{u.isAdmin ? 'Yes' : 'No'}</td>
                      <td className="border p-2">
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-500 text-white p-1 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 text-white p-1 rounded"
                          disabled={u._id === user._id}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
