// import Link from 'next/link'
import NavLink from 'app/components/NavLink'
import { LandingLayout } from 'app/layouts/LandingLayout'
import React from 'react'

const Landing = () => {

  return (
    <>
        {/* top section */}
    <div className="relative bg-city overflow-hidden">
        <div className="container mx-auto">
            {/* header */}
            <div className="p-4 relative z-10">
                <div className="flex justify-between items-center">
                  <NavLink href="/Landing">
                    <a className="text-white flex items-center">
                        <img src="/images/gather-assets/GatherSwap-Logo-Icon.svg" alt="GatherSwap Logo" className="h-10"/>
            
                        <h1 className="hidden lg:block font-bold ml-2 text-xl">GatherSwap</h1>
                    </a>
                  </NavLink>
                  <div>
                      <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-white bg-transparent hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-purple-500">
                          Analytics
                      </button>
                      <NavLink href="/swap">
                        <a className="inline-flex items-center px-4 py-2 border-gradient rounded-lg text-white bg-gradient hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-purple-500">
                            Enter App
                        </a>
                      </NavLink>
                  </div>
                </div>
            </div>
            {/* hero */}
            <div className="relative z-10 lg:flex ">
                <div className="lg:py-24 max-w-2xl p-4">
                    <img src="/images/gather-assets/gatherswap-coin.png" alt="Gatherswap Coin" className="h-16 lg:hidden block mx-auto mb-6"/>
                    <div className="sm:text-center lg:text-left">
                        <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl text-white">
                            <span className="block xl:inline">SuperFast Defi with</span>
                            <span className="block xl:inline font-bold">GatherSwap.</span>
                        </h1>
                        <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                        Swap, earn, stack yields, lend, borrow, leverage all on one decentralized community driven platform.
                        Welcome to Defi Powered by the Gather Network.
                        </p>
                        <div className="mt-5 sm:mt-8 space-x-6">
                            <NavLink href="/swap">
                              <a className="inline-flex items-center px-6 py-3 border-gradient text-base font-medium rounded-xl shadow-sm text-white bg-gradient hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-purple-500">
                                  View App
                              </a>
                            </NavLink>
                            <a href="#" className="inline-flex items-center px-6 py-3 border-gradient text-base font-medium rounded-xl shadow-sm text-white bg-transparent hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset focus:ring-purple-500">
                                Learn More
                            </a>
                        </div>
                    </div>
                    <div className="mt-7 inline-flex space-x-10">
                        <div className="space-y-10">
                            <p>
                                <span className="block text-4xl text-white">$0.21</span>
                                <span className="mt-1 block text-base text-violet-300">$GTHx Price</span>
                            </p>
                    
                            <p>
                                <span className="block text-4xl text-white">$4.48m</span>
                                <span className="mt-1 block text-base text-violet-300">Total Liquidity</span>
                            </p>
                        </div>
                        <div className="space-y-10">
                            <p>
                                <span className="block text-4xl text-white">$145.59m</span>
                                <span className="mt-1 block text-base text-violet-300">Total Volume</span>
                            </p>
                
                            <p>
                                <span className="block text-4xl text-white">200</span>
                                <span className="mt-1 block text-base text-violet-300">Total Pairs</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <img src="/images/gather-assets/gs-hero-img.png" alt="" className="absolute bottom-0 center"/>
                </div>
            </div>
        </div>
    </div>
    
    {/* Logos */}
    <div className="bg-blue-02">
        <div className="container mx-auto py-7 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
                <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                    <img className="h-12" src="/images/gather-assets/logo-placeholder.png" alt="Tuple"/>
                </div>
            </div>
        </div>
    </div>

    {/* stats */}
    <div className="bg-orbit">
        <div className="mmax-w-2xl mx-auto text-center text-white pt-10 lg:pt-28 p-4">
            <div className="pb-10 lg:pb-28">
                <h1 className="font-bold text-2xl lg:text-4xl">An Expanding Defi Platform</h1>
                <p className="text-lg lg:text-2xl">Powered by the Gather Ecosystem.</p>
            </div>
            <div className="lg:inline-flex lg:space-x-16 lg:space-y-16">
                <div className="grid grid-cols-2 gap-4 lg:block">
                    <div className="bg-blue-02 text-center border border-purple-600 rounded-3xl p-4 mb-4 lg:pt-10 lg:pb-16 lg:px-12 lg:mb-24">
                        <img src="/images/gather-assets/wallet-icon.svg" alt="Supported Wallets" className="h-10 lg:h-20 mx-auto lg:-mt-16 lg:pb-6"/>
                        <h1 className="text-white font-bold text-2xl lg:text-4xl">10+</h1>
                        <p className="text-purple-300">Wallets Supported</p>
                    </div>
                    <div className="bg-blue-02 text-center border border-purple-600 rounded-3xl p-4 mb-4 lg:pt-10 lg:pb-16 lg:px-12 lg:mb-24">
                        <img src="/images/gather-assets/users-icon.svg" alt="GatherSwap Holders" className="h-10 lg:h-20 mx-auto lg:-mt-16 lg:pb-6"/>
                        <h1 className="text-white font-bold text-2xl lg:text-4xl">150+</h1>
                        <p className="text-purple-300">GatherSwap Holders</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 lg:block">
                    <div className="bg-blue-02 text-center border border-purple-600 rounded-3xl p-4 mb-4 lg:pt-10 lg:pb-16 lg:px-12 lg:mb-24">
                        <img src="/images/gather-assets/chain-icon.svg" alt="Supported Chains" className="h-10 lg:h-20 mx-auto lg:-mt-16 lg:pb-6"/>
                        <h1 className="text-white font-bold text-2xl lg:text-4xl">10</h1>
                        <p className="text-purple-300">Chains Supported</p>
                    </div>
                    <div className="bg-blue-02 text-center border border-purple-600 rounded-3xl p-4 mb-4 lg:pt-10 lg:pb-16 lg:px-12 lg:mb-24">
                        <img src="/images/gather-assets/discord-icon.svg" alt="Discord Members" className="h-10 lg:h-24 mx-auto lg:-mt-16 lg:pb-6"/>
                        <h1 className="text-white font-bold text-2xl lg:text-4xl">15k+</h1>
                        <p className="text-purple-300">Community Members</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* footer */}
    <footer className="text-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="container mx-auto py-6 px-4">
            <div className="lg:grid grid-cols-3 xl:gap-8">
                <div className="space-y-8 col-span-1">
                    <img className="h-10 inline-flex" src="/images/gather-assets/GatherSwap-Logo-Icon.svg" alt="GatherSwap"/>
                    <h1 className="inline-flex font-bold text-xl pt-2 px-3">GatherSwap</h1>
                    <p className="text-white">
                        GatherSwap is the technology of DeFi. Our community is building a comprehensive, decentralized trading platform for the future of finance. Join us!
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-white hover:text-violet-600">
                            <span className="sr-only">Facebook</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
            
                        <a href="#" className="text-white hover:text-violet-600">
                            <span className="sr-only">Instagram</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>
            
                        <a href="#" className="text-white hover:text-violet-600">
                            <span className="sr-only">Twitter</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
            
                        <a href="#" className="text-white hover:text-violet-600">
                            <span className="sr-only">Discord</span>
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 50 50" aria-hidden="true">
                                <g>
                                    <path className="st0" d="M41.14,10.01C38.13,8.61,34.91,7.58,31.55,7c-0.41,0.75-0.9,1.75-1.23,2.55c-3.58-0.54-7.12-0.54-10.63,0
                                        c-0.33-0.8-0.83-1.8-1.24-2.55c-3.37,0.58-6.59,1.61-9.6,3.02c-6.07,9.18-7.72,18.12-6.9,26.94C5.97,39.97,9.87,41.8,13.71,43
                                        c0.95-1.3,1.79-2.69,2.52-4.15c-1.39-0.53-2.71-1.18-3.97-1.93c0.33-0.25,0.66-0.5,0.97-0.77c7.65,3.58,15.97,3.58,23.53,0
                                        c0.32,0.27,0.64,0.52,0.97,0.77c-1.26,0.76-2.59,1.41-3.98,1.94c0.73,1.46,1.57,2.85,2.52,4.15c3.84-1.2,7.75-3.02,11.77-6.03
                                        C49.02,26.74,46.41,17.88,41.14,10.01z M17.27,31.54c-2.3,0-4.18-2.14-4.18-4.76s1.84-4.76,4.18-4.76c2.34,0,4.22,2.14,4.18,4.76
                                        C21.46,29.4,19.61,31.54,17.27,31.54z M32.73,31.54c-2.3,0-4.18-2.14-4.18-4.76s1.84-4.76,4.18-4.76c2.34,0,4.22,2.14,4.18,4.76
                                        C36.91,29.4,35.06,31.54,32.73,31.54z"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="mt-12 lg:grid grid-cols-3 gap-2 col-span-2 space-y-10 lg:space-y-0">
                    <div>
                        <h3 className="font-bold text-white tracking-wider">
                            Products
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    GatherSwap AMM
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Analytics
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Commerce
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Insights
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white tracking-wider">
                            Support
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Tutorials
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Documentation
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Discord Community
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Forum
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white tracking-wider">
                            Protocol
                        </h3>
                        <ul role="list" className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Vote
                                </a>
                            </li>
            
                            <li>
                                <a href="#" className="tex-white hover:text-violet-500">
                                    Create a Pair
                                </a>
                            </li>
            
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-indigo-900 pt-6 lg:flex items-center justify-between">
                <p className="">
                &copy; 2022 GatherSwap
                </p>
                <div>
                    <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    </>
  )
}

Landing.Layout = LandingLayout('landing-page')
export default Landing