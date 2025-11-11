import LegalLayout from "./LegalLayout";

export default function Accessibility() {
  const htmlString = `
  
<h1><strong>Accessibility Statement</strong></h1>
<p>This accessibility statement applies to SingFit’s mobile application.</p>

<p>Feedback and contact information</p>
<p>If you find any problem not listed on this page or think we’re not meeting accessibility requirements, please email us at <a href="mailto:compliance@singfit.com"><a href="mailto:compliance@singfit.com">compliance@singfit.com</a></a> . We will review your request and get back to you within 5 business days. </p>
<p>​</p>
<p>If you need information from the app in a different format (e.g., an accessible PDF for the FAQ page), you can request this by emailing us at <a href="mailto:compliance@singfit.com"><a href="mailto:compliance@singfit.com">compliance@singfit.com</a></a> .  We will consider your request and get back to you within 30 business days.</p>
<p>​</p>

<p>Enforcement procedure</p>
<p>The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the ‘accessibility regulations’). If you’re not happy with how we respond to your complaint,contact the Equality Advisory and Support Service </p>
<p>Technical information about the mobile application&#x27;s accessibility</p>
<p>SingFit is committed to making its mobile application accessible, in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018.</p>

<p>Compliance status</p>
<p>The mobile application is partially compliant with the Web Content Accessibility Guidelines AA standard.</p>
<p>NON-ACCESSIBLE CONTENT</p>
<p>The content listed below is non-accessible for the following reasons.</p>
<p>​</p>
<p>Non-compliance with the accessibility regulations</p>
<p>​</p>
<ol>
<li>Some visual presentations of text and images of text do not have a contrast ratio of at least 4.5:1 (poor color contrast).  This fails WCAG 2.1 success criterion  1.4.3 Contrast (Minimum).</li>
</ol>
<p>DISPROPORTIONATE BURDEN</p>
<p>​</p>
<p>We believe that fixing the accessibility problems with some content would be disproportionate because the relevant platform will be retired soon.</p>
<p>​</p>
<ol>
<li>Currently all functionality is not available from a keyboard.  This fails WCAG 2.1.1-2.1.4  success criterion for keyboard accessibility. Meeting the requirements for these standards would be challenging and complex.  For example, mapping searching, playlist management, playback controls, and other features to keyboard inputs would significantly compromise usability and overall user experience. </li>
</ol>
<p>CONTENT THAT’S NOT WITHIN THE SCOPE OF THE ACCESSIBILITY REGULATIONS</p>
<p>​</p>
<p>At this time, we are not aware of any content within the app that is not within scope of the accessibility regulations.</p>
<p>​</p>
<p>How we tested the mobile application</p>
<p>We used the Web Content Accessibility Guidelines Version 2.1 level AA to test how accessible SingFit’s mobile application is. In December 2023, an internal audit of the SingFit STUDIO application was conducted, from which common accessibility issues across the platform  were identified.</p>
<p>What we’re doing to improve accessibility</p>
<p>Following the audit conducted in December 2023, we are working on a more in-depth review and action plan to address content which fails to meet the Web Content Accessibility Guidelines version 2.1 AA standard with anticipated changes in early 2024.</p>
<p>Preparation of this accessibility statement</p>
<p>This statement was prepared on 19 December 2023. It was last reviewed and updated on 27 December 2023.</p>`;

function ensureLinks(html) {
  let out = html;

  // Fix common issues
  out = out.replace(/<a [^>]*>(\s*)<a href="mailto:compliance@singfit.com">.*?<\/a>(\s*)<\/a>/g,
    '<a href="mailto:compliance@singfit.com">compliance@singfit.com</a>');
  out = out.replace(/,contact the Equality Advisory and Support Service/g, ', contact the Equality Advisory and Support Service');

  // ✅ Add bold formatting to section headers
  const headings = [
    "Feedback and contact information",
    "Enforcement procedure",
    "Technical information about the mobile application’s accessibility",
    "Compliance status",
    "NON-ACCESSIBLE CONTENT",
    "Non-compliance with the accessibility regulations",
    "DISPROPORTIONATE BURDEN",
    "CONTENT THAT’S NOT WITHIN THE SCOPE OF THE ACCESSIBILITY REGULATIONS",
    "How we tested the mobile application",
    "What we’re doing to improve accessibility",
    "Preparation of this accessibility statement"
  ];

  headings.forEach(h => {
    const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex characters
    const regex = new RegExp(`<p>${escaped}</p>`, "g");
    out = out.replace(regex, `<h3 class="mt-6 mb-3 text-base font-medium">${h}</h3>`);


  });

  // 🔗 Link EASS phrase
  out = out.replace(
    /contact the Equality Advisory and Support Service/g,
    '<a href="https://www.equalityadvisoryservice.com/" target="_blank" rel="noopener noreferrer">contact the Equality Advisory and Support Service</a>'
  );

  // 🔗 Link WCAG phrase
  out = out.replace(
    /Web Content Accessibility Guidelines/g,
    '<a href="https://www.w3.org/TR/WCAG21/" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines</a>'
  );

  // ✉️ Link visible email
  out = out.replace(
    /(?<!mailto:)compliance@singfit\.com/g,
    '<a href="mailto:compliance@singfit.com">compliance@singfit.com</a>'
  );

  return out;
}

const processedHtml = ensureLinks(htmlString);


  return (
    <LegalLayout>
      <div className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="font-bold text-lg">
          Musical Health Technologies, LLC (“SingFit” or the “Company”)
        </p>
        <p className="font-bold text-xl mt-1">Accessibility Statement</p>
        <p className="text-gray-700 mt-1">Last updated: October 4, 2024</p>
      </div>

      <div
        className="prose max-w-none mx-auto px-4 pb-10"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </LegalLayout>
  );
}
