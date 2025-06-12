const TemplateSelector = ({ selectedTemplate, onSelect }) => {
      const templates = [
        { id: 'modern', name: 'Modern' },
        { id: 'minimal', name: 'Minimal' },
        { id: 'professional', name: 'Professional' },
      ];

      return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Select Template</h2>
          <div className="flex space-x-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => onSelect(template.id)}
                className={`p-4 border rounded-md ${
                  selectedTemplate === template.id ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
      );
    };

    export default TemplateSelector;