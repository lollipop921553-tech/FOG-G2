import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { Transaction } from '../types';
import { getTransactions } from '../services/mockDataService';
import { WalletIcon, ArrowDownIcon, ArrowUpIcon, CryptoIcon, BankIcon, EasypaisaIcon, JazzcashIcon, CheckBadgeIcon, ZapIcon } from '../components/Icons';
import BackButton from '../components/BackButton';

const WalletPage: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('withdraw');
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        getTransactions().then(setTransactions);
    }, []);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'deposit':
                return <DepositSection />;
            case 'withdraw':
                return <WithdrawSection balance={user.usdBalance} />;
            case 'redeem':
                return <RedeemSection points={user.points} />;
            case 'history':
                return <HistorySection transactions={transactions} />;
            default:
                return null;
        }
    };

    return (
        <div className="animate-fade-in space-y-8 max-w-5xl mx-auto">
            <BackButton />
            <header className="text-center">
                <h1 className="text-4xl font-extrabold text-fog-dark dark:text-fog-light">My Wallet</h1>
                <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Manage your funds, rewards, and transactions.</p>
            </header>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-fog-accent to-blue-700 text-white p-8 rounded-2xl shadow-lg dark:shadow-2xl-dark flex flex-col justify-between">
                    <div>
                        <p className="text-lg text-blue-200">Available USD Balance</p>
                        <p className="text-5xl font-bold mt-2">${user.usdBalance.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button onClick={() => setActiveTab('withdraw')} className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition">Withdraw</button>
                        <button onClick={() => setActiveTab('deposit')} className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition">Deposit</button>
                    </div>
                </div>
                <div className="bg-gradient-to-br from-fog-secondary to-teal-600 text-white p-8 rounded-2xl shadow-lg dark:shadow-2xl-dark flex flex-col justify-between">
                    <div>
                        <p className="text-lg text-teal-100">FOG Points Balance</p>
                        <p className="text-5xl font-bold mt-2">{user.points.toLocaleString()}</p>
                    </div>
                     <button onClick={() => setActiveTab('redeem')} className="mt-4 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition">Redeem Points</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-fog-white dark:bg-fog-mid-dark rounded-2xl shadow-xl dark:shadow-2xl-dark">
                <div className="border-b border-gray-200 dark:border-slate-700">
                    <nav className="flex space-x-2 p-2">
                        <TabButton label="Withdraw" icon={<ArrowUpIcon className="w-5 h-5"/>} active={activeTab === 'withdraw'} onClick={() => setActiveTab('withdraw')} />
                        <TabButton label="Deposit" icon={<ArrowDownIcon className="w-5 h-5"/>} active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')} />
                        <TabButton label="Redeem Points" icon={<ZapIcon className="w-5 h-5"/>} active={activeTab === 'redeem'} onClick={() => setActiveTab('redeem')} />
                        <TabButton label="History" icon={<WalletIcon className="w-5 h-5"/>} active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
                    </nav>
                </div>
                <div className="p-6 md:p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{label:string, icon: React.ReactNode, active: boolean, onClick: () => void}> = ({ label, icon, active, onClick }) => (
    <button onClick={onClick} className={`flex-1 flex justify-center items-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors text-sm sm:text-base ${active ? 'bg-fog-accent/10 text-fog-accent' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
        {icon} {label}
    </button>
);

const PaymentMethod: React.FC<{title: string; description: string; icon: React.ReactNode; children: React.ReactNode}> = ({ title, description, icon, children}) => (
    <div className="bg-fog-light dark:bg-fog-dark p-6 rounded-xl">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-200 dark:bg-slate-700 rounded-full">{icon}</div>
            <div>
                <h4 className="font-bold text-lg text-fog-dark dark:text-fog-light">{title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>
        <div className="mt-4 pl-16">
            {children}
        </div>
    </div>
);


const DepositSection = () => (
    <div>
        <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-6">Deposit Funds</h2>
        <div className="space-y-4">
            <PaymentMethod title="Crypto Deposit" description="BTC, ETH, USDT" icon={<CryptoIcon />}>
                <form className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your unique deposit address will be shown here. For demo purposes, this is just a placeholder.</p>
                    <div className="p-3 bg-gray-100 dark:bg-slate-700 rounded-md font-mono text-sm">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</div>
                    <button type="submit" className="w-full sm:w-auto px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors">Copy Address</button>
                </form>
            </PaymentMethod>
            <PaymentMethod title="Bank Transfer" description="Local & International" icon={<BankIcon />}>
                <form className="space-y-4 sm:flex sm:items-end sm:gap-4">
                     <div className="flex-grow">
                        <label htmlFor="deposit-amount" className="sr-only">Amount</label>
                        <input type="number" id="deposit-amount" placeholder="Amount (USD)" className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-fog-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-fog-accent"/>
                    </div>
                    <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-fog-accent text-white font-bold rounded-lg shadow-md hover:bg-fog-accent-hover transition-colors">Continue</button>
                </form>
            </PaymentMethod>
        </div>
    </div>
);

const WithdrawSection: React.FC<{balance: number}> = ({ balance }) => {
    const [amount, setAmount] = useState('');
    return (
      <div>
        <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-2">Withdraw Earnings</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Standard withdrawal fees may apply.</p>
        <div className="space-y-2 mb-8">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Amount to Withdraw (USD)</label>
            <div className="relative max-w-sm">
                <input type="number" id="amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full pl-4 pr-16 py-3 border border-gray-300 dark:border-slate-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-fog-accent bg-fog-white dark:bg-slate-800" placeholder="e.g., 50.00" />
                <button onClick={() => setAmount(String(balance))} className="absolute inset-y-0 right-0 px-4 text-sm font-semibold text-fog-accent hover:underline">Max</button>
            </div>
        </div>
        <div className="space-y-4">
            <PaymentMethod title="Easypaisa" description="Pakistan | 1-2 hours" icon={<EasypaisaIcon className="text-green-500" />}>
                 <form className="flex items-end gap-2">
                    <input type="tel" placeholder="Your Easypaisa Account Number" className="flex-grow px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-fog-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-fog-accent"/>
                    <button type="submit" className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors">Withdraw</button>
                </form>
            </PaymentMethod>
            <PaymentMethod title="Jazzcash" description="Pakistan | 1-2 hours" icon={<JazzcashIcon className="text-red-500" />}>
                 <form className="flex items-end gap-2">
                    <input type="tel" placeholder="Your Jazzcash Account Number" className="flex-grow px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-fog-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-fog-accent"/>
                    <button type="submit" className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors">Withdraw</button>
                </form>
            </PaymentMethod>
            <PaymentMethod title="Bank Transfer" description="International | 3-5 days" icon={<BankIcon />}>
                 <form className="flex items-end gap-2">
                    <input type="text" placeholder="Your IBAN" className="flex-grow px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-fog-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-fog-accent"/>
                    <button type="submit" className="px-4 py-2 bg-fog-accent text-white font-semibold rounded-lg shadow-sm hover:bg-fog-accent-hover transition-colors">Withdraw</button>
                </form>
            </PaymentMethod>
        </div>
      </div>
    );
};

const RedeemSection: React.FC<{points: number}> = ({ points }) => {
    const redeemOptions = [
        { points: 500, benefit: "$5 off Platform Fees", description: "Get a $5 discount on your next service fee." },
        { points: 1000, benefit: "Sponsor a Job Post", description: "Boost your job post visibility for 24 hours." },
        { points: 2500, benefit: "1 Month Premium", description: "Unlock Premium features for 30 days." },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-2">Redeem Your FOG Points</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Turn your points into valuable platform perks.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {redeemOptions.map(option => (
                    <div key={option.points} className="bg-fog-light dark:bg-fog-dark p-6 rounded-xl border border-transparent dark:border-slate-800 hover:border-fog-secondary transition-all flex flex-col justify-between">
                        <div>
                            <p className="text-2xl font-bold text-fog-secondary">{option.points.toLocaleString()} PTS</p>
                            <h3 className="text-xl font-bold text-fog-dark dark:text-fog-light mt-2">{option.benefit}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 h-10">{option.description}</p>
                        </div>
                        <button 
                            disabled={points < option.points}
                            className="w-full mt-4 px-4 py-2 bg-fog-secondary text-white font-bold rounded-lg shadow-md hover:bg-teal-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            Redeem
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};

const HistorySection: React.FC<{transactions: Transaction[]}> = ({ transactions }) => (
    <div>
        <h2 className="text-2xl font-bold text-fog-dark dark:text-fog-light mb-6">Transaction History</h2>
        <ul className="space-y-3">
             {transactions.map(tx => (
                <li key={tx.id} className="p-4 flex items-center justify-between bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${tx.amount.startsWith('+') ? 'bg-green-100 dark:bg-green-900/20 text-green-500' : 'bg-red-100 dark:bg-red-900/20 text-red-500'}`}>
                           {tx.amount.startsWith('+') ? <ArrowDownIcon className="w-5 h-5"/> : <ArrowUpIcon className="w-5 h-5"/>}
                        </div>
                         <div>
                            <p className="font-semibold text-fog-dark dark:text-fog-light">{tx.description}</p>
                            <p className="text-sm text-gray-500">{tx.date} &middot; {tx.type}</p>
                        </div>
                    </div>
                   <div className="text-right">
                        <p className={`font-bold text-lg ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {tx.amount}
                        </p>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            tx.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                            tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                        }`}>{tx.status}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);


export default WalletPage;