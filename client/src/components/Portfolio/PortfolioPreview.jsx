import Template1 from '../templates/Template1';
    import Template2 from '../templates/Template2';
    import Template3 from '../templates/Template3';

    const PortfolioPreview = ({ portfolio, template }) => {
      const templates = {
        modern: Template1,
        minimal: Template2,
        professional: Template3,
      };
      const SelectedTemplate = templates[template] || Template1;

      return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Portfolio Preview</h2>
          <div className="border p-4">
            <SelectedTemplate portfolio={portfolio} />
          </div>
        </div>
      );
    };

    export default PortfolioPreview;