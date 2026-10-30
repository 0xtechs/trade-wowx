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
    window.location.href.includes("127.0.0.1");

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
          // Hide testnet option in the dropdown selector completely
          networkDropdown={{
            hideTestnet: true,
          }}
          theme={{
            primaryColor: "#E2FE30",
            mode: "dark",
          }}
          appIcons={{
            main: {
              img: WOWX_THEME.logoUrl,
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
