import { API_ETH_MOCK_ADDRESS, PERMISSION } from '@aave/contract-helpers';
import React from 'react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import {
  ComputedReserveData,
  ComputedUserReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/app-data-provider/useWalletBalances';
import { AssetCapsProvider } from 'src/hooks/useAssetCaps';
import { useIsWrongNetwork } from 'src/hooks/useIsWrongNetwork';
import { useModalContext } from 'src/hooks/useModal';
import { usePermissions } from 'src/hooks/usePermissions';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { getNetworkConfig, isFeatureEnabled } from 'src/utils/marketsAndNetworksConfig';

import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { ChangeNetworkWarning } from '../Warnings/ChangeNetworkWarning';
import { TxErrorView } from './Error';

export interface ModalWrapperProps {
  underlyingAsset: string;
  poolReserve: ComputedReserveData;
  userReserve: ComputedUserReserveData;
  symbol: string;
  tokenBalance: string;
  nativeBalance: string;
  isWrongNetwork: boolean;
  hideSwitchSourceToken?: boolean;
}

export const ModalWrapper: React.FC<{
  underlyingAsset: string;
  title: ReactElement;
  requiredChainId?: number;
  // if true wETH will stay wETH otherwise wETH will be returned as ETH
  keepWrappedSymbol?: boolean;
  hideTitleSymbol?: boolean;
  requiredPermission?: PERMISSION;
  children: (props: ModalWrapperProps) => React.ReactNode;
  minimal?: boolean;
}> = ({
  hideTitleSymbol,
  underlyingAsset,
  children,
  title,
  requiredPermission,
  keepWrappedSymbol,
  minimal,
}) => {
  const { readOnlyModeAddress } = useWeb3Context();
  const { walletBalances } = useWalletBalances();
  const { currentNetworkConfig, currentMarketData } = useProtocolDataContext();
  const { user, reserves } = useAppDataContext();
  const { txError, mainTxState } = useModalContext();
  const { permissions } = usePermissions();

  const { isWrongNetwork, requiredChainId } = useIsWrongNetwork(369);

  if (txError && txError.blocking) {
    return <TxErrorView txError={txError} />;
  }

  if (
    requiredPermission &&
    isFeatureEnabled.permissions(currentMarketData) &&
    !permissions.includes(requiredPermission) &&
    currentMarketData.permissionComponent
  ) {
    return <>{currentMarketData.permissionComponent}</>;
  }

  const poolReserve = reserves.find((reserve) => {
    if (underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
      return reserve.isWrappedBaseAsset;
    return underlyingAsset === reserve.underlyingAsset;
  }) as ComputedReserveData;

  const userReserve = user?.userReservesData.find((userReserve) => {
    if (underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
      return userReserve.reserve.isWrappedBaseAsset;
    return underlyingAsset === userReserve.underlyingAsset;
  }) as ComputedUserReserveData;

  const symbol =
    poolReserve.isWrappedBaseAsset && !keepWrappedSymbol
      ? currentNetworkConfig.baseAssetSymbol
      : poolReserve.symbol;

  return (
    <AssetCapsProvider asset={poolReserve}>
      {!mainTxState.success && !minimal && (
        <TxModalTitle title={title} symbol={hideTitleSymbol ? undefined : symbol} />
      )}
      {isWrongNetwork && !readOnlyModeAddress && (
        <ChangeNetworkWarning
          networkName={getNetworkConfig(requiredChainId).name}
          chainId={requiredChainId}
        />
      )}
      {children({
        isWrongNetwork,
        nativeBalance: walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()]?.amount || '0',
        tokenBalance: walletBalances[poolReserve.underlyingAsset.toLowerCase()]?.amount || '0',
        poolReserve,
        symbol,
        underlyingAsset,
        userReserve,
      })}
    </AssetCapsProvider>
  );
};
