import React, { useState, useEffect } from "react";
import axios from "axios";

const StaticPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [heroData, setHeroData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Fetch hero data from API
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get(
          "https://supportive-nature-3cb22e6ade.strapiapp.com/api/hero-sections?populate=*"
        );
        setHeroData(response.data.data[0]);
        // console.log(response.data.data[0]); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-700 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-indigo-200 to-gray-100 text-gray-900"
      } py-20 px-4`}
    >
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 font-semibold py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-indigo-500 hover:from-indigo-500 hover:to-gray-700 text-white"
            : "bg-gradient-to-r from-gray-400 to-indigo-300 hover:from-indigo-300 hover:to-gray-400 text-gray-900"
        }`}
      >
        {darkMode ? "Light" : "Dark"} Mode
      </button>

      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="relative inline-block">
          {heroData && heroData.logo ? (
            <img
              src={`https://supportive-nature-3cb22e6ade.media.strapiapp.com/${heroData.logo.url}`}
              alt="Bino Logo"
              className="mx-auto w-40 h-auto bg-white p-2 rounded-full shadow-xl transform hover:scale-110 transition-transform duration-300"
              // onClick={() => console.log()}
            />
          ) : (
            <div className="mx-auto w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-white">No Logo</span>
            </div>
          )}
          <div
            className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow ${
              darkMode
                ? "bg-gradient-to-r from-indigo-500 to-gray-700 text-white"
                : "bg-gradient-to-r from-indigo-200 to-gray-400 text-gray-900"
            }`}
          >
            #SmarterBot
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          {heroData ? heroData.title : "no data from backend"}
        </h1>

        <p className="text-lg md:text-2xl max-w-3xl mx-auto">
          {heroData ? heroData.subtitle : "no subtitle from backend."}
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href={heroData ? heroData.ButtonURL : ""}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-indigo-500 to-gray-700 hover:from-gray-700 hover:to-indigo-500 text-white"
                : "bg-gradient-to-r from-indigo-300 to-gray-400 hover:from-gray-400 hover:to-indigo-300 text-gray-900"
            }`}
          >
            {heroData ? heroData.ButtonLabel : "No Button"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
