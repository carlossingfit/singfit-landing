import LegalLayout from "./LegalLayout";

export default function CookiePolicy() {
  const htmlString = `<h3 class="mt-6 mb-3 text-base font-medium"><strong>Cookie Policy</strong></h3>
<p>​</p>
<p>We use cookies to help improve your experience of our website at  This cookie policy is part of SingFit&#x27;s privacy policy. It covers the use of cookies between your device and our site.</p>
<p>
We also provide basic information on third-party services we may use, who may also use cookies as part of their service. This policy does not cover their cookies.</p>
<p>
If you don’t wish to accept cookies from us, you should instruct your browser to refuse cookies from . In such a case, we may be unable to provide you with some of your desired content and services.</p>
<p>​</p>
<h3 class="mt-6 mb-3 text-base font-medium"><strong>What is a cookie?</strong></h3>
<p><strong>​</strong></p>
<p>A cookie is a small piece of data that a website stores on your device when you visit. It typically contains information about the website itself, a unique identifier that allows the site to recognize your web browser when you return, additional data that serves the cookie’s purpose, and the lifespan of the cookie itself.</p>
<p>
Cookies are used to enable certain features (e.g. logging in), track site usage (e.g. analytics), store your user settings (e.g. time zone, notification preferences), and to personalize your content (e.g. advertising, language).</p>
<p>
Cookies set by the website you are visiting are usually referred to as first-party cookies. They typically only track your activity on that particular site.</p>
<p>
Cookies set by other sites and companies (i.e. third parties) are called third-party cookies They can be used to track you on other websites that use the same third-party service.</p>
<p>​</p>
<h3 class="mt-6 mb-3 text-base font-medium"><strong>Types of cookies and how we use them</strong></h3>
<h3 class="mt-6 mb-3 text-base font-medium">
<strong>Essential cookies</strong></h3>
<p><strong>​</strong></p>
<p>Essential cookies are crucial to your experience of a website, enabling core features like user logins, account management, shopping carts, and payment processing.</p>
<p>
We use essential cookies to enable certain functions on our website.</p>
<p><strong>​</strong></p>
<h3 class="mt-6 mb-3 text-base font-medium"><strong>Performance cookies</strong></h3>
<p><strong>​</strong></p>
<p>Performance cookies track how you use a website during your visit. Typically, this information is anonymous and aggregated, with information tracked across all site users. They help companies understand visitor usage patterns, identify and diagnose problems or errors their users may encounter, and make better strategic decisions in improving their audience’s overall website experience. These cookies may be set by the website you’re visiting (first-party) or by third-party services. They do not collect personal information about you.</p>
<p>
We use performance cookies on our site.</p>
<p>​</p>
<h3 class="mt-6 mb-3 text-base font-medium"><strong>Functionality cookies</strong></h3>
<p>Functionality cookies are used to collect information about your device and any settings you may configure on the website you’re visiting (like language and time zone settings). With this information, websites can provide you with customized, enhanced, or optimized content and services. These cookies may be set by the website you’re visiting (first-party) or by third-party services.</p>
<p>
We do not use this type of cookie on our site.</p>
<p>​</p>
<h3 class="mt-6 mb-3 text-base font-medium"><strong>Targeting/advertising cookies</strong></h3>
<p>Targeting/advertising cookies help determine what promotional content is most relevant and appropriate to you and your interests. Websites may use them to deliver targeted advertising or limit the number of times you see an advertisement. This helps companies improve the effectiveness of their campaigns and the quality of content presented to you. These cookies may be set by the website you’re visiting (first-party) or by third-party services. Targeting/advertising cookies set by third-parties may be used to track you on other websites that use the same third-party service.</p>
<p>
We do not use this type of cookie on our site.</p>`;
  return (
  <LegalLayout>
    <div className="mx-auto max-w-3xl px-4 py-10 text-center">
      <p className="font-bold text-lg">
        Musical Health Technologies, LLC (“SingFit” or the “Company”)
      </p>
      <p className="font-bold text-xl mt-1">Cookie Policy</p>
      <p className="text-gray-700 mt-1">Last updated: October 4, 2024</p>
    </div>

    <div
      className="prose max-w-none mx-auto px-4 pb-10"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  </LegalLayout>
);

}
