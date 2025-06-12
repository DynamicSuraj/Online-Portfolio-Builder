import { useState, useContext } from 'react';
    import axios from 'axios';
    import { AuthContext } from '../context/AuthContext';

    const PortfolioForm = ({ onUpdate }) => {
      const { user } = useContext(AuthContext);
      const [formData, setFormData] = useState({
        bio: user.portfolio?.bio || '',
        skills: user.portfolio?.skills || [],
        experience: user.portfolio?.experience || [],
        projects: user.portfolio?.projects || [],
        profilePicture: null,
      });
      const [error, setError] = useState('');

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        onUpdate({ ...formData, [name]: value });
      };

      const handleArrayChange = (e, index, field, subfield) => {
        const updatedArray = [...formData[field]];
        updatedArray[index] = { ...updatedArray[index], [subfield]: e.target.value };
        setFormData({ ...formData, [field]: updatedArray });
        onUpdate({ ...formData, [field]: updatedArray });
      };

      const addItem = (field) => {
        const newItem =
          field === 'skills' ? '' : field === 'experience' ? { company: '', role: '', duration: '' } : { name: '', description: '', link: '' };
        setFormData({ ...formData, [field]: [...formData[field], newItem] });
        onUpdate({ ...formData, [field]: [...formData[field], newItem] });
      };

      const removeItem = (field, index) => {
        const updatedArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: updatedArray });
        onUpdate({ ...formData, [field]: updatedArray });
      };

      const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
        onUpdate({ ...formData, profilePicture: e.target.files[0] });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('bio', formData.bio);
        data.append('skills', JSON.stringify(formData.skills));
        data.append('experience', JSON.stringify(formData.experience));
        data.append('projects', JSON.stringify(formData.projects));
        if (formData.profilePicture) {
          data.append('profilePicture', formData.profilePicture);
        }

        try {
          const res = await axios.post('/api/portfolio', data);
          alert('Portfolio saved successfully!');
          onUpdate(res.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to save portfolio');
        }
      };

      return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Create Your Portfolio</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Skills</label>
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...formData.skills];
                      updatedSkills[index] = e.target.value;
                      setFormData({ ...formData, skills: updatedSkills });
                      onUpdate({ ...formData, skills: updatedSkills });
                    }}
                    className="w-full p-2 border rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem('skills', index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('skills')}
                className="text-blue-600 mt-2"
              >
                Add Skill
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium">Experience</label>
              {formData.experience.map((exp, index) => (
                <div key={index} className="border p-4 mb-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleArrayChange(e, index, 'experience', 'company')}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => handleArrayChange(e, index, 'experience', 'role')}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) => handleArrayChange(e, index, 'experience', 'duration')}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('experience')}
                className="text-blue-600 mt-2"
              >
                Add Experience
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium">Projects</label>
              {formData.projects.map((project, index) => (
                <div key={index} className="border p-4 mb-4 rounded-md">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleArrayChange(e, index, 'projects', 'name')}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) => handleArrayChange(e, index, 'projects', 'description')}
                    className="w-full p-2 border rounded-md mb-2"
                    rows="3"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={project.link}
                    onChange={(e) => handleArrayChange(e, index, 'projects', 'link')}
                    className="w-full p-2 border rounded-md mb-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem('projects', index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('projects')}
                className="text-blue-600 mt-2"
              >
                Add Project
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Save Portfolio
            </button>
          </form>
        </div>
      );
    };

    export default PortfolioForm;