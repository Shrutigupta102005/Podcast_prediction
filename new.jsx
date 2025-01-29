import React, { useState } from "react";

const App = () => {
  const [activePage, setActivePage] = useState("auth");
  const [rating, setRating] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    setActivePage("home");
  };

  const handleLogout = () => {
    setActivePage("auth");
  };

  const updateRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="min-h-screen gradient-bg text-white">
      {/* Navigation Bar */}
      {activePage !== "auth" && (
        <nav className="glass-effect fixed w-full z-50">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-2xl font-bold">InsightPod</span>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setActivePage("home")} className="nav-link">
                Home
              </button>
              <button
                onClick={() => setActivePage("player")}
                className="nav-link"
              >
                Player
              </button>
              <button
                onClick={() => setActivePage("leaderboard")}
                className="nav-link"
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActivePage("feedback")}
                className="nav-link"
              >
                Feedback
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-2 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Auth Page */}
      {activePage === "auth" && (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto glass-effect p-10 rounded-2xl neon-border">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm ml-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-300 text-sm ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-xl font-semibold hover:opacity-90"
              >
                Login to Your Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Home Page */}
      {activePage === "home" && (
        <div className="container mx-auto px-6 pt-24">
          <h1 className="text-6xl font-bold text-center mb-12">
            Discover. Learn. Grow.
          </h1>
          <div className="text-center">
            <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-12 py-4 rounded-xl font-semibold">
              Start Listening Now
            </button>
          </div>
        </div>
      )}

      {/* Feedback Page */}
      {activePage === "feedback" && (
        <div className="container mx-auto px-6 pt-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Your Feedback Matters
          </h2>
          <div className="glass-effect rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Rate Us</h3>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => updateRating(star)}
                  className={`text-4xl ${
                    rating >= star ? "text-cyan-400" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
