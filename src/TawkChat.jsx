import { useEffect } from "react";

export default function TawkChat() {
  useEffect(() => {
    const existingScript = document.getElementById("tawk-chat-script");

    if (existingScript) {
      return undefined;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");

    script.id = "tawk-chat-script";
    script.async = true;
    script.src =
      "https://embed.tawk.to/6a5a807312d6f21d496d731d/1jtoobh20";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      script.remove();

      const tawkFrames = document.querySelectorAll(
        'iframe[src*="tawk.to"], iframe[title*="chat"]'
      );

      tawkFrames.forEach((frame) => frame.remove());

      delete window.Tawk_API;
      delete window.Tawk_LoadStart;
    };
  }, []);

  return null;
}