import { useEffect } from "react";

export function useWowxStyleFixer() {
  useEffect(() => {
    // Inject a global style override tag into the head
    const styleId = "wowx-global-overrides";
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;

    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      /* 1. Force Connect Wallet & Primary Buttons: Neon Yellow with Black Text */
      button[class*="oui-button-primary"],
      .orderly-button-primary,
      button[id*="connect-wallet-btn"],
      .oui-button-primary span,
      .oui-button-primary * {
        background-color: #E2FE30 !important;
        color: #000000 !important;
        font-weight: 700 !important;
      }
      button[class*="oui-button-primary"]:hover,
      .orderly-button-primary:hover {
        background-color: #d2ec20 !important;
        color: #000000 !important;
      }

      /* 2. Force oui-box and card surfaces to #12141A */
      .oui-box,
      div[class*="oui-box"],
      div[class*="oui-card"],
      div[class*="oui-panel"],
      div[class*="orderly-card"] {
        background-color: #12141A !important;
        border-color: #1C1E24 !important;
      }

      /* 3. Force primary text highlights to #E2FE30 */
      .oui-text-primary,
      span[class*="oui-text-primary"],
      p[class*="oui-text-primary"],
      div[class*="oui-text-primary"] {
        color: #E2FE30 !important;
      }
    `;

    return () => {
      styleEl?.remove();
    };
  }, []);
}
