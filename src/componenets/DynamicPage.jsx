import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DynamicPage = () => {
  const { pageRoute } = useParams();
  const [darkMode, setDarkMode] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(
          "https://supportive-nature-3cb22e6ade.strapiapp.com/api/dynamic-pages?populate=*"
        );
        const result = response.data.data.find(
          (item) => item.PageRoute === `/${pageRoute}`
        );

        if (result) {
          setPageData(result);
        } else {
          setError("Page not found.");
        }
      } catch (err) {
        console.error("Error fetching page data:", err);
        setError("Failed to fetch page data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [pageRoute]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>{error}</span>
      </div>
    );
  }

  const { HeadingSection, DescriptionSection, businessSection } = pageData;

  return (
    <div
      className={`min-h-screen relative ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-indigo-700 to-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 via-indigo-200 to-gray-100 text-gray-900"
      } py-20 px-4`}
    >
      {/* Toggle Dark Mode */}
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

      {/* Content */}
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          {HeadingSection || "No Heading Available"}
        </h1>

        {/* Business Section */}
        {businessSection && (
          <section className="mt-6">
            <h2 className="text-2xl font-semibold">Business Information</h2>
            <p>
              <strong>Name:</strong> {businessSection.name}
            </p>
            <p>
              <strong>Address:</strong> {businessSection.address}
            </p>
            <p>
              <strong>Rating:</strong> {businessSection.rating}
            </p>
            <div>
              <strong>Reviews:</strong>
              <ul className="list-disc list-inside">
                {businessSection.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Description Section */}
        <section className="mt-6">
          <h2 className="text-2xl font-semibold">Description</h2>
          <p className="text-lg md:text-xl">{DescriptionSection}</p>
        </section>

        {/* Call to Action */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/"
            className={`inline-block font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-indigo-500 to-gray-700 hover:from-gray-700 hover:to-indigo-500 text-white"
                : "bg-gradient-to-r from-indigo-300 to-gray-400 hover:from-gray-400 hover:to-indigo-300 text-gray-900"
            }`}
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;
