
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import { useNavigate } from 'react-router-dom';

const Portfolio = () => {
  const { user } = useContext(AuthContext);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    bio: '',
    skills: [],
    experience: [],
    projects: [],
    profilePicture: null,
    template: 'modern',
  });
  const navigate = useNavigate();

  // Fetch portfolio
  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem('token');
      console.log('Portfolio - Fetching portfolio - User:', user?._id, 'Token:', token ? 'Present' : 'Absent');
      if (!token || !user) {
        setError('Please log in to view your portfolio');
        navigate('/login');
        return;
      }
      try {
        const res = await axios.get('/api/portfolio');
        console.log('Portfolio - Data received:', res.data);
        setPortfolio(res.data.portfolio);
        setFormData({
          bio: res.data.portfolio.bio || '',
          skills: res.data.portfolio.skills || [],
          experience: res.data.portfolio.experience || [],
          projects: res.data.portfolio.projects || [],
          profilePicture: null,
          template: res.data.portfolio.template || 'modern',
        });
        setError('');
      } catch (err) {
        console.error('Portfolio - Fetch error:', err.response?.data || err);
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(err.response?.data?.message || 'Failed to load portfolio');
        }
      }
    };
    if (user) fetchPortfolio();
  }, [user, navigate]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map((skill) => skill.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, skills }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, profilePicture: e.target.files[0] }));
  };

  const handleArrayChange = (e, field, index, key) => {
    const newArray = [...formData[field]];
    newArray[index] = { ...newArray[index], [key]: e.target.value };
    setFormData((prev) => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], {}],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log('Portfolio - Submitting form - Token:', token ? 'Present' : 'Absent');
    if (!token) {
      setError('Please log in to save your portfolio');
      navigate('/login');
      return;
    }
    const data = new FormData();
    data.append('bio', formData.bio);
    data.append('skills', JSON.stringify(formData.skills));
    data.append('experience', JSON.stringify(formData.experience));
    data.append('projects', JSON.stringify(formData.projects));
    if (formData.profilePicture) {
      data.append('photo', formData.profilePicture);
    }
    data.append('template', formData.template);

    try {
      const res = await axios.post('/api/portfolio', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Portfolio - Saved:', res.data);
      setPortfolio(res.data);
      setError('');
      alert('Portfolio saved successfully');
    } catch (err) {
      console.error('Portfolio - Save error:', err.response?.data || err);
      setError(err.response?.data?.message || 'Failed to save portfolio');
    }
  };

  // Render template
  const renderTemplate = () => {
    if (!portfolio) return null;
    switch (portfolio.template) {
      case 'modern':
        return <Template1 portfolio={portfolio} />;
      case 'minimal':
        return <Template2 portfolio={portfolio} />;
      case 'professional':
        return <Template3 portfolio={portfolio} />;
      default:
        return <Template1 portfolio={portfolio} />;
    }
  };

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Please log in to view your portfolio</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-600 text-white p-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {portfolio ? (
        <>
          {renderTemplate()}
          <h3 className="text-lg font-semibold mt-6">Edit Portfolio</h3>
        </>
      ) : (
        <p className="text-gray-600 mb-4">Create your portfolio below</p>
      )}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills (comma-separated)</label>
          <input
            type="text"
            value={formData.skills.join(', ')}
            onChange={handleSkillsChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Experience</label>
          {formData.experience.map((exp, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Company"
                value={exp.company || ''}
                onChange={(e) => handleArrayChange(e, 'experience', index, 'company')}
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Role"
                value={exp.role || ''}
                onChange={(e) => handleArrayChange(e, 'experience', index, 'role')}
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration || ''}
                onChange={(e) => handleArrayChange(e, 'experience', index, 'duration')}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('experience')}
            className="bg-gray-600 text-white p-1 rounded"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Projects</label>
          {formData.projects.map((proj, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Name"
                value={proj.name || ''}
                onChange={(e) => handleArrayChange(e, 'projects', index, 'name')}
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Description"
                value={proj.description || ''}
                onChange={(e) => handleArrayChange(e, 'projects', index, 'description')}
                className="w-full p-2 border rounded mb-1"
              />
              <input
                type="text"
                placeholder="Link"
                value={proj.link || ''}
                onChange={(e) => handleArrayChange(e, 'projects', index, 'link')}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('projects')}
            className="bg-gray-600 text-white p-1 rounded"
          >
            Add Project
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Template</label>
          <select
            name="template"
            value={formData.template}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Save Portfolio
        </button>
      </form>
    </div>
  );
};

export default Portfolio;