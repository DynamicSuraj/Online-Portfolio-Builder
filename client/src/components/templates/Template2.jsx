const Template2 = ({ portfolio }) => {
      return (
        <div className="bg-white min-h-screen p-6">
          <header className="text-center mb-8">
            <img
              src={portfolio.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold">{portfolio.userId?.name || 'Your Name'}</h1>
            <p className="text-gray-600">{portfolio.bio || 'Your bio goes here'}</p>
          </header>
          <main className="max-w-2xl mx-auto">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Skills</h2>
              <p>{portfolio.skills?.join(', ') || 'No skills added'}</p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Experience</h2>
              {portfolio.experience?.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-gray-600">{exp.company} | {exp.duration}</p>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Projects</h2>
              {portfolio.projects?.map((project, index) => (
                <div key={index} className="mb-2">
                  <p className="font-medium">{project.name}</p>
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

    export default Template2;