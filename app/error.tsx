// app/error.tsx
"use client"; // Make sure to include this to handle client-side rendering

import React from 'react';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4 bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600">Something Went Wrong</h1>
      <p className="mt-4 text-xl font-medium">
        We encountered an unexpected error. Please try again later.
      </p>
      <p className="mt-2 text-gray-600">
        If the problem persists, feel free to contact support.
      </p>
      <Link href="/" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        Go to Home
      </Link>
      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
      </footer>
    </div>
  );
};

export default ErrorPage;
