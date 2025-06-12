const Template3 = ({ portfolio }) => {
      return (
        <div className="bg-gray-50 min-h-screen">
          <header className="bg-white shadow p-6 flex items-center">
            <img
              src={portfolio.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold">{portfolio.userId?.name || 'Your Name'}</h1>
              <p className="text-gray-600">{portfolio.bio || 'Your bio goes here'}</p>
            </div>
          </header>
          <main className="container mx-auto p-6">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b">Skills</h2>
              <ul className="grid grid-cols-2 gap-2">
                {portfolio.skills?.map((skill, index) => (
                  <li key={index} className="bg-gray-200 p-2 rounded">{skill}</li>
                ))}
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b">Experience</h2>
              {portfolio.experience?.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b">Projects</h2>
              {portfolio.projects?.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  {project.link && (
                    <a href={project.link} className="text-blue-600 hover:underline">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>
          </main>
        </div>
      );
    };

    export default Template3;