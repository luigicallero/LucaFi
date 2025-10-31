import { WalletConnect } from "@/components/WalletConnect";
import { DepositCard } from "@/components/DepositCard";
import { NetworkSwitcher } from "@/components/NetworkSwitcher";
import { TestnetFaucet } from "@/components/TestnetFaucet";
import { TestnetWrapper } from "@/components/TestnetWrapper";

export default function Home() {
  return (
    <TestnetWrapper>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 testnet-mode:bg-gradient-to-br testnet-mode:from-gray-100 testnet-mode:via-gray-200 testnet-mode:to-gray-300 testnet-mode:dark:from-gray-900 testnet-mode:dark:via-gray-800 testnet-mode:dark:to-gray-900 transition-colors duration-500" suppressHydrationWarning>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-white">L</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LucaFi
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Decentralized Finance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <NetworkSwitcher />
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">5% Weekly</span>
              </div>
              <a 
                href="https://metamask.io/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Get MetaMask
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
              💎 Earn Passive Income with DeFi
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Deposit USDC,
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Earn 5% Weekly
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Earn 5% on your deposits after 7 days. Withdraw capital anytime,
            profits available after the lock period.
          </p>
        </div>

        {/* Network Switcher (Mobile) */}
        <div className="md:hidden mb-8">
          <NetworkSwitcher />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Wallet Connection & Faucet */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-8 space-y-6">
              <WalletConnect />
              <TestnetFaucet />
            </div>
          </div>

          {/* Right Column - Deposit Interface */}
          <div className="lg:col-span-2">
            <DepositCard />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Why Choose LucaFi?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">5% Weekly Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn consistent 5% weekly returns on your USDC deposits with automatic compounding
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">7-Day Profit Lock</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn 5% on your deposits after 7 days, with flexible withdrawal options
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔓</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Flexible Withdrawals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Withdraw your capital anytime. After 7 days, withdraw profits or everything
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Secure & Transparent</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built on BSC with audited smart contracts for maximum security
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Connect Wallet</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Connect your MetaMask wallet to BSC network and ensure you have USDC
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Deposit USDC</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose your deposit amount and confirm the transaction
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">Earn & Withdraw</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                After 7 days, earn 5% and choose how to withdraw your funds
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold mb-1">5%</div>
            <div className="text-sm opacity-90">Weekly Returns</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold mb-1">7</div>
            <div className="text-sm opacity-90">Days to Unlock</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-red-600 p-6 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold mb-1">3</div>
            <div className="text-sm opacity-90">Withdrawal Options</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white text-center shadow-lg">
            <div className="text-3xl md:text-4xl font-bold mb-1">0</div>
            <div className="text-sm opacity-90">Capital Lock</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              <span className="font-semibold">LucaFi</span> - Decentralized Finance on BSC
            </p>
            <p className="text-xs">
              Built with Next.js, Wagmi, and Viem • 2025
            </p>
            <p className="text-xs mt-2 text-yellow-600 dark:text-yellow-400">
              ⚠️ Demo Mode: Currently storing deposits locally for testing
            </p>
          </div>
        </div>
      </footer>
      </div>
    </TestnetWrapper>
  );
}
