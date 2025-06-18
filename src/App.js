// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingFitLandingPage from './SingFitLandingPage';
import FreeContent from './FreeContent';
import UserLanding from './UserLanding';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SingFitLandingPage />} />
        <Route path="/free-content" element={<FreeContent />} />
        <Route path="/user-landing" element={<UserLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
