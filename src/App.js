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
import CampaignLanding4 from "./CampaignLanding4";
import CampaignLanding5 from "./CampaignLanding5";
import CampaignLanding6 from "./CampaignLanding6";
import CampaignLanding7 from "./CampaignLanding7";
import CampaignLandingICAA from "./CampaignLandingICAA"; // adjust path
import CampaignLandingConferences from "./CampaignLandingConferences";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import Accessibility from "./Accessibility";
import CookiePolicy from "./CookiePolicy";
import CleanAARPLanding from "./CleanAARPLanding";



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
        <Route path="/campaign-landing4" element={<CampaignLanding4 />} />
        <Route path="/campaign-landing5" element={<CampaignLanding5 />} />
        <Route path="/campaign-landing6" element={<CampaignLanding6 />} />
        <Route path="/campaign-landing7" element={<CampaignLanding7 />} />
        <Route path="/icaa" element={<CampaignLandingICAA />} />
        <Route path="/conferences" element={<CampaignLandingConferences />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/cleanlanding" element={<CleanAARPLanding />} />
      </Routes>
    </Router>
  );
}

export default App;

