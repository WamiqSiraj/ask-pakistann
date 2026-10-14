// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
      <h2 className="text-2xl font-bold text-white mt-2">Page Not Found</h2>
      <p className="text-slate-400 text-sm mt-1 max-w-md">
        The requested official resource or page does not exist or has been relocated.
      </p>
      <Link to="/" className="mt-6 bg-blue-600 hover:bg-blue-500 text-white text-sm px-5 py-2.5 rounded-lg font-medium">
        Back to Home
      </Link>
    </div>
  );
}