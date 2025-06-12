const Template1 = ({ portfolio }) => {
      return (
        <div className="bg-gray-100 min-h-screen">
          <header className="bg-blue-600 text-white p-6 text-center">
            <img
              src={portfolio.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold">{portfolio.userId?.name || 'Your Name'}</h1>
            <p className="text-lg">{portfolio.bio || 'Your bio goes here'}</p>
          </header>
          <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Skills</h2>
              <ul className="list-disc pl-6">
                {portfolio.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">Experience</h2>
              {portfolio.experience?.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium">{exp.role}</h3>
                  <p>{exp.company} | {exp.duration}</p>
                </div>
              ))}
            </section>
            <section className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Projects</h2>
              {portfolio.projects?.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  <p>{project.description}</p>
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

    export default Template1;