
'use client'; 

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Oops! Page not found.</h2>
      <p className="mb-6 text-lg text-center max-w-lg">
        We can’t seem to find the page you’re looking for. It might have been
        removed or never existed.
      </p>
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go Back
      </button>
      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default NotFoundPage;
