import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StaticPage from "./componenets/StaticPage.jsx";
import DynamicPage from "./componenets/DynamicPage.jsx"; 

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Define Routes for Static and Dynamic Pages */}
        <Routes>
          {/* Static Page Route */}
          <Route path="/" element={<StaticPage />} />

          {/* Dynamic Page Route */}
          <Route path="/:pageRoute" element={<DynamicPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
