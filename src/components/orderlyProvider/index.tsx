import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { OrderlyAppProvider } from "@orderly.network/react-app";
import { WalletConnectorProvider } from "@orderly.network/wallet-connector";
import { WOWX_THEME, PageTitleMap } from "../../constant";
import { useNav } from "../../hooks/useNav";
import { useOrderlyConfig } from "../../hooks/useOrderlyConfig";
import { usePageTitle } from "../../hooks/usePageTitle";
import { useWowxStyleFixer } from "../../utils/wowxStyleFixer";
import { OrderlyLocaleProvider } from "./orderlyLocaleProvider";

export const OrderlyProvider = () => {
  const config = useOrderlyConfig();
  const { onRouteChange } = useNav();
  const location = useLocation();
  usePageTitle();

  // Enforce global CSS overrides for production parity
  useWowxStyleFixer();

  const isWowx =
    window.location.href.includes("wowx.market") ||
    window.location.href.includes("localhost") ||
    window.location.href.includes("127.0.0.1") ||
    window.location.href.includes("trade-wowx-tawny.vercel.app");

  useEffect(() => {
    if (isWowx) {
      document.documentElement.setAttribute("data-theme", "wowx");
      let currentTitle = "ETH-PERP";
      for (const [path, title] of Object.entries(PageTitleMap)) {
        if (location.pathname.includes(path)) {
          currentTitle = title;
          break;
        }
      }
      document.title = `${currentTitle} | WowX`;

      let favicon = document.querySelector(
        "link[rel*='icon']",
      ) as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = WOWX_THEME.faviconUrl;
      } else {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        favicon.href = WOWX_THEME.faviconUrl;
        document.head.appendChild(favicon);
      }
    }
  }, [location.pathname, isWowx]);

  return (
    <OrderlyLocaleProvider>
      <WalletConnectorProvider>
        <OrderlyAppProvider
          brokerId="wowx"
          brokerName="WOWX"
          // Force Mainnet exclusively
          networkId="mainnet"
		  // Set BNB Chain (bsc) as the initial default network
		  initialChainId={56} // 56 is the official Chain ID for BSC Mainnet
          theme={{
            primaryColor: "#E2FE30",
            mode: "dark",
          }}
          appIcons={{
            main: {
              component: (
                <img
                  className="orderly-app-logo"
                  alt="WowX"
                  src={WOWX_THEME.logoUrl}
                  style={{ height: "42px", width: "auto", objectFit: "contain" }}
                />
              ),
            },
          }}
          onRouteChange={onRouteChange}
        >
          <Outlet />
        </OrderlyAppProvider>
      </WalletConnectorProvider>
    </OrderlyLocaleProvider>
  );
};