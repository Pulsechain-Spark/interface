import { ReactNode } from 'react';
import { ROUTES } from 'src/components/primitives/Link';

import { MarketDataType } from '../marketsConfig';

interface Navigation {
  link: string;
  title: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
}

export const navigation: Navigation[] = [
  // {
  //   link: ROUTES.dashboard,
  //   title: t`Dashboard`,
  //   dataCy: 'menuDashboard',
  // },
  // {
  //   link: ROUTES.markets,
  //   title: t`Markets`,
  //   dataCy: 'menuMarkets',
  // },
  {
    link: ROUTES.sDAI,
    title: `sDAI`,
    dataCy: 'menuSDAI',
  },
  // {
  //   link: ROUTES.staking,
  //   title: t`Stake`,
  //   dataCy: 'menuStake',
  //   isVisible: () =>
  //     process.env.NEXT_PUBLIC_ENABLE_STAKING === 'true' &&
  //     process.env.NEXT_PUBLIC_ENV === 'prod' &&
  //     !ENABLE_TESTNET,
  // },
  // {
  //   link: ROUTES.governance,
  //   title: t`Governance`,
  //   dataCy: 'menuGovernance',
  //   isVisible: () =>
  //     process.env.NEXT_PUBLIC_ENABLE_GOVERNANCE === 'true' &&
  //     process.env.NEXT_PUBLIC_ENV === 'prod' &&
  //     !ENABLE_TESTNET,
  // },
  // {
  //   link: ROUTES.faucet,
  //   title: t`Faucet`,
  //   isVisible: () => process.env.NEXT_PUBLIC_ENV === 'staging' || ENABLE_TESTNET,
  // },
];

interface MoreMenuItem extends Navigation {
  icon: ReactNode;
  makeLink?: (walletAddress: string) => string;
}

export const moreMenuExtraItems: MoreMenuItem[] = [];
export const moreMenuMobileOnlyItems: MoreMenuItem[] = [];

export const moreNavigation: MoreMenuItem[] = [...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [...navigation, ...moreMenuMobileOnlyItems];
