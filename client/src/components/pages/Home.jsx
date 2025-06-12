import { Link } from 'react-router-dom';

    const Home = () => {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
          <h1 className="text-4xl font-bold mb-4">Welcome to Portfolio Builder</h1>
          <p className="text-lg mb-6 text-center max-w-md">
            Create and share your professional portfolio with ease. Choose from multiple templates and get started today!
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              Login
            </Link>
          </div>
        </div>
      );
    };

    export default Home;