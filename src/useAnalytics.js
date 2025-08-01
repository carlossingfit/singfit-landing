import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-HMCYWJE753";

export function useAnalytics(pageId) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.gtag) {
      const script1 = document.createElement("script");
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script1.async = true;
      document.head.appendChild(script1);

      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          send_page_view: false
        });
      `;
      document.head.appendChild(script2);
    }

    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_id: pageId
    });
  }, [pageId]);

  const track = (eventName, params = {}) => {
    if (typeof window === "undefined") return;
    window.gtag?.('event', eventName, { page_id: pageId, ...params });
  };

  return { track };
}
