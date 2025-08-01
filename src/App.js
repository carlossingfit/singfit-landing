// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // this is your new dummy root page
import SingFitLandingPage from './SingFitLandingPage';
import UserLanding from './UserLanding';
import FreeContent from './FreeContent';
import FreeContent2 from './FreeContent2';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aarp-member" element={<SingFitLandingPage />} />
        <Route path="/aarp-non-member" element={<UserLanding />} />
        <Route path="/aarp-member-resources" element={<FreeContent />} />
        <Route path="/aarp-non-member-resources" element={<FreeContent2 />} />
      </Routes>
    </Router>
  );
}

export default App;

