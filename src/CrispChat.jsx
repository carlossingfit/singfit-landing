import { useEffect } from "react";

const PAGE_ID = "PrimeLandingPage1";

const OPENED_SESSION_KEY = "prime_chat_opened_fired";
const STARTED_SESSION_KEY = "prime_chat_started_fired";

export default function CrispChat() {
  useEffect(() => {
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = "1d0a854c-4946-47f1-bf4a-95981463270d";

    const hasFired = (key) => {
      try {
        return window.sessionStorage.getItem(key) === "true";
      } catch {
        return window[key] === true;
      }
    };

    const markAsFired = (key) => {
      try {
        window.sessionStorage.setItem(key, "true");
      } catch {
        window[key] = true;
      }
    };

    const pushTrackingEvent = (eventName) => {
      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: eventName,
        page_id: PAGE_ID,
        chat_platform: "crisp",
        page_path: window.location.pathname,
      });
    };

    const handleChatOpened = () => {
      if (hasFired(OPENED_SESSION_KEY)) {
        return;
      }

      markAsFired(OPENED_SESSION_KEY);
      pushTrackingEvent("prime_chat_opened");
    };

    const handleMessageSent = () => {
      if (hasFired(STARTED_SESSION_KEY)) {
        return;
      }

      markAsFired(STARTED_SESSION_KEY);
      pushTrackingEvent("prime_chat_started");
    };

    /*
     * Crisp supports registering these listeners before its script has
     * finished loading. "message:sent" applies to visitor messages;
     * operator replies use the separate "message:received" event.
     */
    window.$crisp.push(["on", "chat:opened", handleChatOpened]);
    window.$crisp.push(["on", "message:sent", handleMessageSent]);

    const existingScript = document.querySelector(
      'script[src="https://client.crisp.chat/l.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://client.crisp.chat/l.js";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      window.$crisp.push(["off", "chat:opened"]);
      window.$crisp.push(["off", "message:sent"]);
    };
  }, []);

  return null;
}