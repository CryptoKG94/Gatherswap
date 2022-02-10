import { NATIVE } from '@sushiswap/core-sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import Container from 'app/components/Container'
import { NAV_CLASS } from 'app/components/Header/styles'
import useMenu from 'app/components/Header/useMenu'
import Web3Network from 'app/components/Web3Network'
import Web3Status from 'app/components/Web3Status'
import { useActiveWeb3React } from 'app/services/web3'
import { useETHBalances } from 'app/state/wallet/hooks'
// import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import NavLink from '../NavLink'
import { NavigationItem } from './NavigationItem'

const HEADER_HEIGHT = 64

const Desktop: FC = () => {
  const menu = useMenu()
  const { account, chainId, library, connector } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const isCbWallet =
    connector instanceof WalletLinkConnector ||
    (connector instanceof InjectedConnector && window.walletLinkExtension) ||
    window?.ethereum?.isCoinbaseWallet

  return (
    <>
      <header className="fixed z-20 w-full hidden lg:block" style={{ height: HEADER_HEIGHT }}>
        <nav className={NAV_CLASS}>
          <Container maxWidth="7xl" className="mx-auto">
            <div className="flex gap-4 px-6 items-center justify-between">
              <div className="flex gap-4">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                  <NavLink href="/landing">
                    <a className="text-white flex items-center">
                      <img
                        className="h-8 w-8"
                        src="/images/gather-assets/GatherSwap-Logo-Icon.svg"
                        alt="Gather logo"
                        width="24px"
                        height="24px"
                      />
                      <span className="text-white font-bold ml-2">GatherSwap</span>
                    </a>
                  </NavLink>
                </div>

                {menu.map((node) => {
                  return <NavigationItem node={node} key={node.key} />
                })}
              </div>
              <div className="flex items-center justify-end gap-2">
                {library && (library.provider.isMetaMask || isCbWallet) && (
                  <div className="hidden sm:inline-block">
                    <Web3Network />
                  </div>
                )}

                <div className="flex items-center w-auto text-sm font-bold border-2 rounded shadow cursor-pointer pointer-events-auto select-none border-dark-800 hover:border-dark-700 bg-dark-900 whitespace-nowrap">
                  {account && chainId && userEthBalance && (
                    <Link href="/balances" passHref={true}>
                      <a className="hidden px-3 text-high-emphesis text-bold md:block">
                        {/*@ts-ignore*/}
                        {userEthBalance?.toSignificant(4)} {NATIVE[chainId || 1].symbol}
                      </a>
                    </Link>
                  )}
                  <Web3Status />
                </div>
                <div className="hidden lg:flex">
                  {/* <LanguageSwitch /> */}
                </div>
              </div>
            </div>
          </Container>
        </nav>
      </header>
      <div style={{ height: HEADER_HEIGHT, minHeight: HEADER_HEIGHT }} />
    </>
  )
}

export default Desktop
