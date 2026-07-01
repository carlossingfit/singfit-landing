// App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const SingFitLandingPage = lazy(() => import("./SingFitLandingPage"));
const UserLanding = lazy(() => import("./UserLanding"));
const FreeContent = lazy(() => import("./FreeContent"));
const FreeContent2 = lazy(() => import("./FreeContent2"));
const CampaignLanding = lazy(() => import("./CampaignLanding"));
const CampaignLanding2 = lazy(() => import("./CampaignLanding2"));
const CampaignLanding3 = lazy(() => import("./CampaignLanding3"));
const CampaignLanding4 = lazy(() => import("./CampaignLanding4"));
const CampaignLanding5 = lazy(() => import("./CampaignLanding5"));
const CampaignLanding6 = lazy(() => import("./CampaignLanding6"));
const CampaignLanding7 = lazy(() => import("./CampaignLanding7"));
const CampaignLandingICAA = lazy(() => import("./CampaignLandingICAA"));
const CampaignLandingConferences = lazy(() => import("./CampaignLandingConferences"));
const TermsOfService = lazy(() => import("./TermsOfService"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const Accessibility = lazy(() => import("./Accessibility"));
const CookiePolicy = lazy(() => import("./CookiePolicy"));
const CleanAARPLanding = lazy(() => import("./CleanAARPLanding"));
const DemoLandingPage = lazy(() => import("./DemoLandingPage"));
const UKLanding = lazy(() => import("./UKLanding"));
const CaregiverLandingPage = lazy(() => import("./CaregiverLandingPage"));
const CaregiverLandingPageV2 = lazy(() => import("./CaregiverLandingPageV2"));
const CaregiverLandingPageV3 = lazy(() => import("./CaregiverLandingPageV3"));
const CaregiverLandingPageV4 = lazy(() => import("./CaregiverLandingPageV4"));
const CaregiverLandingPageV5 = lazy(() => import("./CaregiverLandingPageV5"));
const CaregiverLandingPageV6 = lazy(() => import("./CaregiverLandingPageV6"));
const CaregiverLandingPageV7 = lazy(() => import("./CaregiverLandingPageV7"));
const CaregiverLandingPageV8 = lazy(() => import("./CaregiverLandingPageV8"));
const PrimeLandingPage = lazy(() => import("./PrimeLandingPage"));
const PrimeUKSalesDeck = lazy(() => import("./PrimeUKSalesDeck"));
const PrimeLandingPage2 = lazy(() => import("./PrimeLandingPage2"));

function App() {
  return (
    <Router>
      <Suspense fallback={null}>
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
          <Route path="/demo" element={<DemoLandingPage />} />
          <Route path="/uk" element={<UKLanding />} />
          <Route path="/caregiverlanding" element={<CaregiverLandingPage />} />
          <Route path="/caregiverlanding2" element={<CaregiverLandingPageV2 />} />
          <Route path="/caregiverlanding3" element={<CaregiverLandingPageV3 />} />
          <Route path="/caregiverlanding4" element={<CaregiverLandingPageV4 />} />
          <Route path="/caregiverlanding5" element={<CaregiverLandingPageV5 />} />
          <Route path="/caregiverlanding6" element={<CaregiverLandingPageV6 />} />
          <Route path="/caregiverlanding7" element={<CaregiverLandingPageV7 />} />
          <Route path="/caregiverlanding8" element={<CaregiverLandingPageV8 />} />
          <Route path="/primelandingpage1" element={<PrimeLandingPage />} />
          <Route path="/primeuksales" element={<PrimeUKSalesDeck />} />
          <Route path="/primelandingpage2" element={<PrimeLandingPage2 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;