
// 'use server'

// // In-memory store for the watchlist
// let watchlist = [];
// export async function getWatchList() {
//   return watchlist;
// }

// export async function postWatchList(movie) {

//   if (!watchlist.includes(movie.id)) {
//     watchlist.push(movie);
//   }
//   console.log(watchlist)
//   return watchlist;
// }

// export async function deleteWatchList(movie) {

//   watchlist = watchlist.filter(id => id !== movie.id);
//   return watchlist;
// }