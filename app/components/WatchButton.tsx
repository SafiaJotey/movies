// 'use client';

// import { useEffect, useState } from 'react';
// import { deleteWatchList, getWatchList, postWatchList } from '../lib/action';


// const WatchlistButton = ({ movieId, movieTitle }) => {
//   const [isInWatchlist, setIsInWatchlist] = useState(false);

//   useEffect(() => {
//     const checkInWatchlist = async () => {
//       const watchlist = await getWatchList();
//       setIsInWatchlist(watchlist.some(item => item.id === movieId));
//     };

//     checkInWatchlist();
//   }, [movieId]);

//   const handleToggleWatchlist = async () => {
//     if (isInWatchlist) {
//       await deleteWatchList({ id: movieId });
//     } else {
//       const movieData = { id: movieId, title: movieTitle }; // Include other movie details as needed
//       await postWatchList(movieData);
//     }
//     setIsInWatchlist(!isInWatchlist);
//   };

//   return (
//     <button onClick={handleToggleWatchlist}>
//       {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
//     </button>
//   );
// };

// export default WatchlistButton;
