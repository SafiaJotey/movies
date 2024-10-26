// components/MenuBar.tsx
'use client';
import Link from "next/link";

 



const MenuBar = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-xl font-bold">
          <Link href="/">Movie Explorer</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/watchlist" className="hover:underline">
            Wishlist
          </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
