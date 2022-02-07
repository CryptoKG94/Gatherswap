import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency } from '@sushiswap/core-sdk'
import NavLink from 'app/components/NavLink'
import Settings from 'app/components/Settings'
import Typography from 'app/components/Typography'
import MyOrders from 'app/features/legacy/limit-order/MyOrders'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const getQuery = (input?: Currency, output?: Currency) => {
  if (!input && !output) return

  if (input && !output) {
    // @ts-ignore
    return { inputCurrency: input.address || 'ETH' }
  } else if (input && output) {
    // @ts-ignore
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface HeaderNewProps {
  inputCurrency?: Currency
  outputCurrency?: Currency
}

const HeaderNew: FC<HeaderNewProps> = ({ inputCurrency, outputCurrency }) => {
  const { i18n } = useLingui()
  const { asPath } = useRouter()
  const isLimitOrder = asPath.startsWith('/limit-order')

  return (
    <div className="flex items-center justify-between gap-1">
      <div className="flex gap-4">
        <NavLink
          activeClassName="bg-purple-600 hover:bg-blue-900 text-high-emphesis"
          href={{
            pathname: '/swap',
            query: getQuery(inputCurrency, outputCurrency),
          }}
        >
          <Typography weight={700} className="items-center px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-purple-400 hover:bg-opacity-75">
            {i18n._(t`Swap`)}
          </Typography>
        </NavLink>
        <NavLink
          activeClassName="bg-purple-600 hover:bg-blue-900 text-high-emphesis"
          href={{
            pathname: '/limit-order',
            query: getQuery(inputCurrency, outputCurrency),
          }}
        >
          <Typography weight={700} className="items-center px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-purple-400 hover:bg-opacity-75">
            {i18n._(t`Limit`)}
          </Typography>
        </NavLink>
      </div>
      <div className="flex gap-4">
        {isLimitOrder && <MyOrders />}
        <Settings className="!w-6 !h-6" />
      </div>
    </div>
  )
}

export default HeaderNew
