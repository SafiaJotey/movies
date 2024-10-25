import MovieList from "../components/MovieList";
import Search from "../components/Search";


const HomePage = () => {
  return (
    <main className="container mx-auto">
      <h1 className="text-2xl font-bold p-4">Movie List</h1>
      <Search />
      <MovieList />
    </main>
  );
};

export default HomePage;
