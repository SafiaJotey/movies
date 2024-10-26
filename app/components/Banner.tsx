export const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-700 to-purple-600 text-white text-center py-24 mb-8 rounded-lg shadow-lg">
      <div className="absolute inset-0 bg-black opacity-30"></div>{" "}
  
      <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome to Movie Explorer
        </h2>
        <p className="text-lg md:text-xl">
          Discover the latest and greatest movies tailored for you.
        </p>
      </div>
    </div>
  );
};
