// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingFitLandingPage from './SingFitLandingPage';
import FreeContent from './FreeContent';
import UserLanding from './UserLanding';
import FreeContent2 from "./FreeContent2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingFitLandingPage />} />
        <Route path="/free-content" element={<FreeContent />} />
        <Route path="/user-landing" element={<UserLanding />} />
        <Route path="/free-content-2" element={<FreeContent2 />} />
      </Routes>
    </Router>
  );
}

export default App;
