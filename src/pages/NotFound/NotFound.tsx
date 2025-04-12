import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-black text-white text-center">
      <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="text-sm sm:text-base text-gray-400 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="bg-red-600 hover:bg-red-700 transition-all px-6 py-3 rounded-md text-white font-semibold text-lg">
        Go to Home</Link>



    </div>
  );
};

export default NotFound;
