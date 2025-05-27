import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-red-700">Z-Bridge</h1>
        <div className="space-x-4">
          <a href="#" className="text-gray-700 hover:text-red-700">Home</a>
          <a href="#" className="text-gray-700 hover:text-red-700">Experiences</a>
          <a href="#" className="text-gray-700 hover:text-red-700">About</a>
          <a href="#" className="text-red-700 border border-red-700 px-3 py-1 rounded hover:bg-red-700 hover:text-white">Login</a>
        </div>
      </nav>

      <main className="flex-grow px-6">{children}</main>

      <footer className="bg-gray-800 text-white text-center p-4 mt-12 text-sm">
        &copy; {new Date().getFullYear()} Z-Bridge | Made in Zambia 🇿🇲
      </footer>
    </div>
  );
}
