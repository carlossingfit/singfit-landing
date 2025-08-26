// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // this is your new dummy root page
import SingFitLandingPage from './SingFitLandingPage';
import UserLanding from './UserLanding';
import FreeContent from './FreeContent';
import FreeContent2 from './FreeContent2';
import CampaignLanding from './CampaignLanding';
import CampaignLanding2 from './CampaignLanding2';
import CampaignLanding3 from "./CampaignLanding3";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aarp-member" element={<SingFitLandingPage />} />
        <Route path="/aarp-non-member" element={<UserLanding />} />
        <Route path="/aarp-member-resources" element={<FreeContent />} />
        <Route path="/aarp-non-member-resources" element={<FreeContent2 />} />
        <Route path="/campaign-landing" element={<CampaignLanding />} />
        <Route path="/campaign-landing2" element={<CampaignLanding2 />} />
        <Route path="/campaign-landing3" element={<CampaignLanding3 />} />
      </Routes>
    </Router>
  );
}

export default App;

