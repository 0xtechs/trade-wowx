import { ComponentType, lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, type RouteObject, Outlet } from "react-router";
import { PortfolioLayout, TradingRewardsLayout } from "./components/layout";
import { OrderlyProvider } from "./components/orderlyProvider";
import { WOWX_THEME } from "./constant";
import { PageLoading, PerpsRedirect, AffiliateRedirect } from "./routes";

const lazyImportPage = (
  importFn: () => Promise<{ default: ComponentType<Record<string, unknown>> }>,
): ComponentType<Record<string, unknown>> => {
  const LazyComponent = lazy(importFn);
  const WrappedComponent = (props: Record<string, unknown>) => (
    <Suspense fallback={<PageLoading />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  return WrappedComponent;
};

const PerpPage = lazyImportPage(() => import("./pages/perp/page"));
const PredictionPage = lazyImportPage(() => import("./pages/prediction/page"));

const PortfolioPage = lazyImportPage(() => import("./pages/portfolio/page"));
const PositionsPage = lazyImportPage(
  () => import("./pages/portfolio/positions/page"),
);
const OrdersPage = lazyImportPage(
  () => import("./pages/portfolio/orders/page"),
);
const AssetsPage = lazyImportPage(
  () => import("./pages/portfolio/assets/page"),
);
const FeeTierPage = lazyImportPage(() => import("./pages/portfolio/fee/page"));
const APIKeyPage = lazyImportPage(
  () => import("./pages/portfolio/api-key/page"),
);
const SettingsPage = lazyImportPage(
  () => import("./pages/portfolio/setting/page"),
);
const HistoryPage = lazyImportPage(
  () => import("./pages/portfolio/history/page"),
);

const MarketsPage = lazyImportPage(() => import("./pages/markets/page"));
const LeaderboardPage = lazyImportPage(
  () => import("./pages/leaderboard/page"),
);

const AffiliatePage = lazyImportPage(
  () => import("./pages/rewards/affiliate/page"),
);

export const baseRoutes: RouteObject[] = [
  {
    path: "perp",
    children: [
      {
        index: true,
        element: <PerpsRedirect />,
      },
      {
        path: ":symbol",
        element: <PerpPage />,
      },
    ],
  },
  {
    path: "prediction/:symbol?",
    element: <PredictionPage />,
  },
  {
    path: "portfolio",
    element: <PortfolioLayout />,
    children: [
      {
        index: true,
        element: <PortfolioPage />,
      },
      {
        path: "positions",
        element: <PositionsPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "assets",
        element: <AssetsPage />,
      },
      {
        path: "fee",
        element: <FeeTierPage />,
      },
      {
        path: "api-key",
        element: <APIKeyPage />,
      },
      {
        path: "setting",
        element: <SettingsPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
    ],
  },
  {
    path: "markets",
    element: <MarketsPage />,
  },
  {
    path: "leaderboard",
    element: <LeaderboardPage />,
  },
  {
    path: "rewards",
    element: <TradingRewardsLayout />,
    children: [
      {
        index: true,
        element: <AffiliateRedirect />,
      },
      {
        path: "affiliate",
        element: <AffiliatePage />,
      },
    ],
  },
];

// Layout wrapper component that intercepts the URL context and overrides branding tokens
function RootThemeWrapper() {
  useEffect(() => {
    const isWowx =
      window.location.href.includes("wowx.market") ||
      window.location.href.includes("localhost") ||
      window.location.href.includes("127.0.0.1");

    if (isWowx) {
      const root = document.documentElement;

      // Update browser document title
      document.title = "ETH-PERP | WowX";

      // Inject standard Orderly UI token overrides
      root.style.setProperty(
        "--oui-color-primary",
        WOWX_THEME.primaryColor || "#12d3a6",
      );
      root.style.setProperty(
        "--oui-color-base-100",
        WOWX_THEME.bgBackgroundColor || "#0b0e14",
      );

      // Keep your custom properties if needed
      root.style.setProperty("--brand-primary", WOWX_THEME.primaryColor);
      root.style.setProperty("--brand-bg", WOWX_THEME.bgBackgroundColor);
      root.setAttribute("data-theme", "wowx");

      // Dynamically update favicon
      const faviconElement = document.getElementById(
        "favicon",
      ) as HTMLLinkElement;
      if (faviconElement) {
        faviconElement.href = WOWX_THEME.faviconUrl || "/wowx-favicon.png";
      }
    }
  }, []);

  return (
    <OrderlyProvider>
      <Outlet />
    </OrderlyProvider>
  );
}

export function createAppRouter(routes: RouteObject[] = baseRoutes) {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootThemeWrapper />, // Mount wrapper layout injection rule profile safely
      children: [
        { index: true, element: <PerpsRedirect /> },
        {
          path: ":lang",
          children: [{ index: true, element: <PerpsRedirect /> }, ...routes],
        },
      ],
    },
  ]);
}
