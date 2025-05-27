import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-700">Z-Bridge</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Building Zambia’s Future One Virtual Experience at a Time
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800">For Learners</h2>
          <p className="text-gray-600 mt-2">
            Explore real-world tasks created by Zambian companies. Gain insights
            into careers in finance, logistics, marketing, and more—anytime,
            anywhere.
          </p>
          <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
            Start Exploring
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800">For Employers</h2>
          <p className="text-gray-600 mt-2">
            Create virtual experience modules that reflect real work in your
            company. Identify engaged young talent and build your future
            workforce pipeline.
          </p>
          <button className="mt-4 bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800">
            Partner With Us
          </button>
        </div>
      </section>

      <section className="mt-12 text-center">
        <h3 className="text-xl font-semibold text-gray-700">Join the Movement</h3>
        <p className="text-gray-600 mt-2">
          Whether you're a student, graduate, or company, Z-Bridge is where
          Zambia builds its talent.
        </p>
        <button className="mt-4 bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-900">
          Get Started
        </button>
      </section>

      <footer className="mt-20 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Z-Bridge. All rights reserved.
      </footer>
    </div>
  );
}
