import { useState, useContext } from 'react';
    import PortfolioForm from '../Portfolio/PortfolioForm';
    import PortfolioPreview from '../Portfolio/PortfolioPreview';
    import TemplateSelector from '../Portfolio/TemplateSelector';
    import { AuthContext } from '../context/AuthContext';

    const PortfolioPage = () => {
      const { user } = useContext(AuthContext);
      const [portfolio, setPortfolio] = useState(user.portfolio || {});
      const [selectedTemplate, setSelectedTemplate] = useState(portfolio.template || 'modern');

      const handleUpdate = (updatedPortfolio) => {
        setPortfolio(updatedPortfolio);
      };

      return (
        <div className="min-h-screen bg-gray-100 py-6">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Build Your Portfolio</h1>
            <p className="text-center mb-4">
              Shareable Link:{' '}
              <a
                href={`${window.location.origin}/portfolio/${user.name}`}
                className="text-blue-600 hover:underline"
              >
                {window.location.origin}/portfolio/{user.name}
              </a>
            </p>
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelect={setSelectedTemplate}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PortfolioForm onUpdate={handleUpdate} />
              <PortfolioPreview portfolio={portfolio} template={selectedTemplate} />
            </div>
          </div>
        </div>
      );
    };

    export default PortfolioPage;