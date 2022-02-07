import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, CurrencyAmount, JSBI, Token, USD, ZERO } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import { CurrencyLogo } from 'app/components/CurrencyLogo'
import { HeadlessUiModal } from 'app/components/Modal'
import Typography from 'app/components/Typography'
import { useKashiPair } from 'app/features/kashi/hooks'
import { easyAmount, formatNumber } from 'app/functions'
import { useCurrency } from 'app/hooks/Tokens'
import { useActiveWeb3React } from 'app/services/web3'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { PairType } from './enum'
import { usePendingSushi, useUserInfo } from './hooks'
import useMasterChef from './useMasterChef'
import usePendingReward from './usePendingReward'

// @ts-ignore TYPE NEEDS FIXING
const RewardRow = ({ value, symbol }) => {
  return (
    <Typography weight={700} className="text-high-emphesis">
      {value}{' '}
      <Typography component="span" className="text-secondary">
        {symbol}
      </Typography>
    </Typography>
  )
}

// @ts-ignore TYPE NEEDS FIXING
const InvestmentDetails = ({ farm }) => {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()
  const { harvest } = useMasterChef(farm.chef)
  const router = useRouter()
  const addTransaction = useTransactionAdder()
  const kashiPair = useKashiPair(farm.pair.id)
  const [pendingTx, setPendingTx] = useState(false)
  const token0 = useCurrency(farm.pair.token0.id)
  const token1 = useCurrency(farm.pair.token1.id)

  const liquidityToken = new Token(
    // @ts-ignore TYPE NEEDS FIXING
    chainId,
    getAddress(farm.pair.id),
    farm.pair.type === PairType.KASHI ? Number(farm.pair.asset.decimals) : 18,
    farm.pair.symbol ?? farm.pair.type === PairType.KASHI ? 'KMP' : 'SLP',
    farm.pair.name
  )

  const stakedAmount = useUserInfo(farm, liquidityToken)

  const kashiAssetAmount =
    kashiPair &&
    stakedAmount &&
    easyAmount(
      BigNumber.from(stakedAmount.quotient.toString()).mulDiv(
        // @ts-ignore TYPE NEEDS FIXING
        kashiPair.currentAllAssets.value,
        // @ts-ignore TYPE NEEDS FIXING
        kashiPair.totalAsset.base
      ),
      // @ts-ignore TYPE NEEDS FIXING
      kashiPair.asset
    )

  const pendingSushi = usePendingSushi(farm)
  const pendingReward = usePendingReward(farm)

  const positionFiatValue = CurrencyAmount.fromRawAmount(
    // @ts-ignore TYPE NEEDS FIXING
    USD[chainId],
    farm.pair.type === PairType.KASHI
      ? // @ts-ignore TYPE NEEDS FIXING
        kashiAssetAmount?.usdValue.toString() ?? ZERO
      : JSBI.BigInt(
          ((Number(stakedAmount?.toExact() ?? '0') * farm.pair.reserveUSD) / farm.pair.totalSupply)
            // @ts-ignore TYPE NEEDS FIXING
            .toFixed(USD[chainId].decimals)
            // @ts-ignore TYPE NEEDS FIXING
            .toBigNumber(USD[chainId].decimals)
        )
  )

  // @ts-ignore TYPE NEEDS FIXING
  const secondaryRewardOnly = [ChainId.FUSE].includes(chainId)

  const rewardValue = !secondaryRewardOnly
    ? (farm?.rewards?.[0]?.rewardPrice ?? 0) * Number(pendingSushi?.toExact() ?? 0) +
      (farm?.rewards?.[1]?.rewardPrice ?? 0) * Number(pendingReward ?? 0)
    : (farm?.rewards?.[0]?.rewardPrice ?? 0) * Number(pendingReward ?? 0)

  async function onHarvest() {
    setPendingTx(true)
    try {
      const tx = await harvest(farm.id)
      addTransaction(tx, {
        summary: i18n._(t`Harvest ${farm.pair.token0.name}/${farm.pair.token1.name}`),
      })
    } catch (error) {
      console.error(error)
    }
    setPendingTx(false)
  }

  return (
    <>
      <HeadlessUiModal.BorderedContent className="flex flex-col gap-2 bg-dark-1000/40">
        <div className="flex justify-between">
          <Typography variant="xs" weight={700} className="text-secondary">
            {i18n._(t`Your Deposits`)}
          </Typography>
          <Typography variant="xs" className="flex gap-1 text-secondary">
            {formatNumber(stakedAmount?.toSignificant(6) ?? 0)} {farm.pair.token0.symbol}-{farm.pair.token1.symbol}
            <Typography variant="xs" weight={700} className="text-high-emphesis" component="span">
              {formatNumber(positionFiatValue?.toSignificant(6) ?? 0, true)}
            </Typography>
          </Typography>
        </div>
        {[PairType.KASHI, PairType.SWAP].includes(farm.pair.type) && (
          <div className="flex items-center gap-2">
            {/*@ts-ignore TYPE NEEDS FIXING*/}
            {token0 && <CurrencyLogo currency={token0} size={18} />}
            {farm.pair.type === PairType.KASHI && (
              <RewardRow
                symbol={token0?.symbol}
                // @ts-ignore TYPE NEEDS FIXING
                value={formatNumber(kashiAssetAmount?.value.toFixed(kashiPair.asset.tokenInfo.decimals) ?? 0)}
              />
            )}
            {farm.pair.type === PairType.SWAP && (
              <RewardRow
                value={formatNumber(
                  (farm.pair.reserve0 * Number(stakedAmount?.toExact() ?? 0)) / farm.pair.totalSupply
                )}
                symbol={token0?.symbol}
              />
            )}
          </div>
        )}
        {farm.pair.type === PairType.SWAP && (
          <div className="flex items-center gap-2">
            {token1 && <CurrencyLogo currency={token1} size={18} />}
            <RewardRow
              value={formatNumber((farm.pair.reserve1 * Number(stakedAmount?.toExact() ?? 0)) / farm.pair.totalSupply)}
              symbol={token1?.symbol}
            />
          </div>
        )}
      </HeadlessUiModal.BorderedContent>
      <HeadlessUiModal.BorderedContent className="flex flex-col gap-2 bg-dark-1000/40">
        <div className="flex justify-between">
          <Typography variant="xs" weight={700} className="text-secondary">
            {i18n._(t`Your Rewards`)}
          </Typography>
          <Typography variant="xs" weight={700} className="text-high-emphesis" component="span">
            {formatNumber(rewardValue, true)}
          </Typography>
        </div>

        {/* @ts-ignore TYPE NEEDS FIXING */}
        {farm?.rewards?.map((reward, i) => {
          return (
            <div className="flex items-center gap-2" key={i}>
              <CurrencyLogo currency={reward.currency} size={18} />
              {!secondaryRewardOnly ? (
                <>
                  {i === 0 && (
                    <RewardRow
                      value={formatNumber(pendingSushi?.toSignificant(6) ?? 0)}
                      symbol={reward.currency.symbol}
                    />
                  )}
                  {i === 1 && <RewardRow value={formatNumber(pendingReward)} symbol={reward.currency.symbol} />}
                </>
              ) : (
                <RewardRow value={formatNumber(pendingReward)} symbol={reward.currency.symbol} />
              )}
            </div>
          )
        })}
      </HeadlessUiModal.BorderedContent>
      {farm.pair.type === PairType.KASHI && (
        <Button
          fullWidth
          color="blue"
          variant="empty"
          size="sm"
          className="!italic"
          onClick={() => router.push(`/lend/${farm.pair.id}`)}
        >
          {i18n._(t`View details on Kashi`)}
        </Button>
      )}
      <Button
        loading={pendingTx}
        fullWidth
        color="blue"
        disabled={
          pendingTx ||
          !((pendingSushi && pendingSushi.greaterThan(ZERO)) || (pendingReward && Number(pendingReward) > 0))
        }
        onClick={onHarvest}
      >
        {i18n._(t`Harvest Rewards`)}
      </Button>
    </>
  )
}

export default InvestmentDetails
