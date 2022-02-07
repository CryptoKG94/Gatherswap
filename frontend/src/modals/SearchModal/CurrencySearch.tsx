import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import CHAINLINK_TOKENS from '@sushiswap/chainlink-whitelist/dist/sushiswap-chainlink.whitelist.json'
import { ChainId, Currency, NATIVE, Token } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import Typography from 'app/components/Typography'
import { filterTokens, useSortedTokensByQuery } from 'app/functions/filtering'
import { isAddress } from 'app/functions/validate'
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from 'app/hooks/Tokens'
import useDebounce from 'app/hooks/useDebounce'
import CurrencyModalView from 'app/modals/SearchModal/CurrencyModalView'
import { useCurrencyModalContext } from 'app/modals/SearchModal/CurrencySearchModal'
import { useActiveWeb3React } from 'app/services/web3'
import { useRouter } from 'next/router'
import React, { KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import ReactGA from 'react-ga'

import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import ImportRow from './ImportRow'
import { useTokenComparator } from './sorting'

interface CurrencySearchProps {
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  currencyList?: (string | undefined)[]
  allowManageTokenList?: boolean
}

export function CurrencySearch({
  otherSelectedCurrency,
  showCommonBases,
  currencyList,
  allowManageTokenList = true,
}: CurrencySearchProps) {
  const { i18n } = useLingui()
  const router = useRouter()
  let allTokens = useAllTokens()
  const { chainId } = useActiveWeb3React()
  const { setView, onDismiss, onSelect, includeNative, showSearch, setImportToken } = useCurrencyModalContext()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)
  const isAddressSearch = isAddress(debouncedQuery)
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
  const tokenComparator = useTokenComparator()

  if (router.asPath.startsWith('/kashi/create') && chainId) {
    allTokens = Object.keys(allTokens).reduce((obj, key) => {
      // @ts-ignore TYPE NEEDS FIXING
      if (CHAINLINK_TOKENS[chainId].find((address) => address === key)) obj[key] = allTokens[key]
      return obj
    }, {})
  }

  if (currencyList) {
    allTokens = Object.keys(allTokens).reduce((obj, key) => {
      // @ts-ignore TYPE NEEDS FIXING
      if (currencyList.includes(key)) obj[key] = allTokens[key]
      return obj
    }, {})
  }

  useEffect(() => {
    if (isAddressSearch) {
      ReactGA.event({
        category: 'Currency Select',
        action: 'Search by address',
        label: isAddressSearch,
      })
    }
  }, [isAddressSearch])

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)
  // @ts-ignore TYPE NEEDS FIXING
  const ether = useMemo(() => chainId && ![ChainId.CELO].includes(chainId) && NATIVE[chainId], [chainId])

  const filteredSortedTokensWithETH: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    if (s === '' || s === 'e' || s === 'et' || s === 'eth') {
      return ether ? [ether, ...filteredSortedTokens] : filteredSortedTokens
    }
    return filteredSortedTokens
  }, [debouncedQuery, ether, filteredSortedTokens])

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onSelect(currency)
      onDismiss()
    },
    [onSelect, onDismiss]
  )

  // manage focus on modal show
  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checkSum = isAddress(input)
    setSearchQuery(checkSum || input)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'eth' && ether) {
          handleCurrencySelect(ether)
        } else if (filteredSortedTokensWithETH.length > 0) {
          if (
            filteredSortedTokensWithETH[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokensWithETH.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokensWithETH[0])
          }
        }
      }
    },
    [debouncedQuery, ether, filteredSortedTokensWithETH, handleCurrencySelect]
  )

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined
  )

  const handleImport = useCallback(() => {
    if (searchToken) {
      setImportToken(searchToken)
    }

    setView(CurrencyModalView.importToken)
  }, [searchToken, setImportToken, setView])

  return (
    <>
      <HeadlessUiModal.Header onClose={onDismiss} header={i18n._(t`Pay with:`)} />
      {showSearch && (
        <div className="my-1 relative rounded-md shadow-sm text-indigo-900">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentcolor"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path><path d="M11.412 8.586c.379.38.588.882.588 1.414h2a3.977 3.977 0 0 0-1.174-2.828c-1.514-1.512-4.139-1.512-5.652 0l1.412 1.416c.76-.758 2.07-.756 2.826-.002z"></path></svg>
            </div>
            <input
              type="text"
              id="token-search-input"
              placeholder={i18n._(t`Search token name or paste address`)}
              autoComplete="off"
              value={searchQuery}
              onChange={handleInput}
              onKeyDown={handleEnter}
              className="focus:ring-indigo-500 focus:border-indigo-500 text-indigo-900 focus:bg-white block w-full pl-10 sm:text-sm border-indigo-300 font-bold text-base p-4 appearance-none rounded-md" // w-full bg-[rgba(0,0,0,0.2)] border border-dark-800 focus:border-blue rounded placeholder-secondary font-bold text-base p-4 appearance-none
            />
        </div>
      )}
      {showCommonBases && <CommonBases />}

      {searchToken && !searchTokenIsAdded && <ImportRow token={searchToken} onClick={handleImport} />}
      <div className="h-full overflow-hidden overflow-y-auto border rounded border-dark-800 bg-blue-02 text-white">
        {filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
          <CurrencyList
            currencies={includeNative ? filteredSortedTokensWithETH : filteredSortedTokens}
            otherListTokens={filteredInactiveTokens}
            otherCurrency={otherSelectedCurrency}
          />
        ) : (
          <Typography weight={700} variant="xs" className="text-secondary flex h-full justify-center items-center">
            {i18n._(t`No results found`)}
          </Typography>
        )}
      </div>
      {allowManageTokenList && (
        <div className="flex justify-center">
          <Button
            size="sm"
            id="list-token-manage-button"
            onClick={() => setView(CurrencyModalView.manage)}
            color="blue"
            className="border-t border-indigo-900 p-4 text-sm hover:text-indigo-200 text-indigo-300"
            variant="empty"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentcolor"><path d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"></path><path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"></path></svg>
            {i18n._(t`Manage Token Lists`)}
          </Button>
        </div>
      )}
    </>
  )
}
