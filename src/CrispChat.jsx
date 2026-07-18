import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) {
      return;
    }

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "1d0a854c-4946-47f1-bf4a-95981463270d";

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;

    document.head.appendChild(script);
  }, []);

  return null;
}