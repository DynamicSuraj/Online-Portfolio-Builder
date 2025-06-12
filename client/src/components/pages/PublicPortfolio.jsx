
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';

const PublicPortfolio = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        console.log('Fetching portfolio for:', username);
        const res = await axios.get(`/api/portfolio/${username}`);
        console.log('Portfolio data:', res.data);
        setPortfolio(res.data.portfolio);
        setError('');
      } catch (err) {
        console.error('Frontend error:', err);
        setError(err.response?.data?.message || 'Failed to load portfolio');
      }
    };
    fetchPortfolio();
  }, [username]);

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

  if (error) {
    return <div className="text-red-500 text-center p-6">{error}</div>;
  }

  if (!portfolio) {
    return <div className="text-center p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {renderTemplate()}
    </div>
  );
};

export default PublicPortfolio;
