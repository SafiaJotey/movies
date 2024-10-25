import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '../tyrpe/movieType';

const MovieCard = ({ movie }: { movie: Movie }) => {
  console.log(movie);
  return (
    <Link href={`/movies/${movie.id}`} className="block">
      <div
        key={movie.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
      >
        <div className="relative w-full h-72">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE}${movie.poster_path}`}
            alt={movie.title}
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-500">
            Rating: {movie.vote_average} / 10
          </p>
          <p className="text-sm text-gray-400">{movie.release_date}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
