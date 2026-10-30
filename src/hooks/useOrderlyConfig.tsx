import { useMemo } from "react";
import { useTranslation } from "@orderly.network/i18n";
import { AppLogos } from "@orderly.network/react-app";
import { TradingPageProps } from "@orderly.network/trading";
import {
  AssetIcon,
  BarChartIcon,
  PersonIcon,
  PredictionIcon,
  SettingFillIcon,
  SheetTitle,
  TradingIcon,
} from "@orderly.network/ui";
import {
  BottomNavProps,
  FooterProps,
  MainNavWidgetProps,
} from "@orderly.network/ui-scaffold";
import TradeMenu from "../components/layout/customTradeSubMenu";
import { PathEnum } from "../constant";
import { WOWX_THEME } from "../constant";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps?: FooterProps;
    bottomNavProps: BottomNavProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

const APP_ICONS: AppLogos = {
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
  secondary: {
    img: WOWX_THEME.faviconUrl,
  },
};

const TRADING_VIEW_CONFIG: TradingPageProps["tradingViewConfig"] = {
  scriptSRC: "/tradingview/charting_library/charting_library.js",
  library_path: "/tradingview/charting_library/",
};

const SHARE_PNL_CONFIG: TradingPageProps["sharePnLConfig"] = {
  backgroundImages: [
    "/images/pnl/poster_bg_1.png",
    "/images/pnl/poster_bg_2.png",
    "/images/pnl/poster_bg_3.png",
    "/images/pnl/poster_bg_4.png",
  ],
  color: "rgba(255, 255, 255, 0.98)",
  profitColor: "rgba(41, 223, 169, 1)",
  lossColor: "rgba(245, 97, 139, 1)",
  brandColor: "rgba(255, 255, 255, 0.98)",
  refLink: "https://wowx.market",
  refSlogan: "WowX referral",
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();

  return useMemo<OrderlyConfig>(() => {
    return {
      scaffold: {
        mainNavProps: {
          mainMenus: [
            {
              name: "Trading",
              href: PathEnum.Root,
              activeHrefs: [PathEnum.Prediction],
              isHomePageInMobile: true,
              customSubMenuRender: () => <TradeMenu />,
            },
            { name: t("common.portfolio"), href: PathEnum.Portfolio },
            { name: t("common.markets"), href: PathEnum.Markets },
            {
              name: "Node",
              href: "https://member.wowx.market/",
              target: "_blank",
            },
          ],
          initialMenu: PathEnum.Root,
          leftNav: {
            leading: <SheetTitle className="oui-sr-only">WowX</SheetTitle>,
            menus: [
              {
                name: "Trading",
                href: PathEnum.Root,
                icon: <TradingIcon />,
              },
              {
                name: t("common.predictions"),
                href: PathEnum.Prediction,
                icon: <PredictionIcon size={20} monochrome />,
              },
              {
                name: t("common.portfolio"),
                href: PathEnum.Portfolio,
                icon: <PersonIcon />,
              },
              {
                name: t("common.markets"),
                href: PathEnum.Markets,
                icon: <BarChartIcon />,
              },
              {
                name: t("common.assets"),
                href: PathEnum.Assets,
                icon: <AssetIcon />,
              },
              {
                name: t("portfolio.setting"),
                href: PathEnum.Setting,
                icon: <SettingFillIcon color="white" opacity={0.8} />,
              },
              {
                name: "Node",
                href: "https://member.wowx.market/",
                target: "_blank",
              },
              {
                name: t("portfolio.feeTier"),
                href: PathEnum.FeeTier,
                isSecondary: true,
              },
              {
                name: t("portfolio.apiKeys"),
                href: PathEnum.ApiKey,
                isSecondary: true,
              },
            ],
          },
        },
        bottomNavProps: {
          mainMenus: [
            {
              name: t("common.markets"),
              href: PathEnum.Markets,
            },
            {
              name: "Trading",
              href: PathEnum.Root,
            },
            {
              name: t("common.portfolio"),
              href: PathEnum.Portfolio,
            },
          ],
        },
      },
      orderlyAppProvider: {
        appIcons: APP_ICONS,
      },
      tradingPage: {
        tradingViewConfig: TRADING_VIEW_CONFIG,
        sharePnLConfig: SHARE_PNL_CONFIG,
      },
    };
  }, [t]);
};