import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Heart, Clock, Users, Shield, Edit, Trash2, ExternalLink } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const DashboardPage: React.FC = () => {
  const { isConnected, address, balance } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isConnected) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200 text-center">
            <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-slate-600 mb-6">
              Access your personal dashboard by connecting your wallet. View your requests, donations, and reputation.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Donated', value: '5.7 ETH', change: '+23%', icon: Heart, color: 'text-emerald-600' },
    { label: 'Requests Created', value: '3', change: '+1 this month', icon: Plus, color: 'text-blue-600' },
    { label: 'Reputation Score', value: '4.8/5', change: '⭐ Top 10%', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Communities Helped', value: '12', change: '+2 recent', icon: Users, color: 'text-orange-600' }
  ];

  const myRequests = [
    {
      id: 1,
      title: 'Emergency Medical Supplies - Flood Relief',
      status: 'active',
      target: '10.0',
      raised: '7.3',
      contributors: 28,
      daysLeft: 12,
      created: '2025-01-08'
    },
    {
      id: 2,
      title: 'School Supplies for Hurricane Victims',
      status: 'completed',
      target: '5.0',
      raised: '5.0',
      contributors: 15,
      daysLeft: 0,
      created: '2024-12-15'
    },
    {
      id: 3,
      title: 'Emergency Food Distribution',
      status: 'completed',
      target: '8.5',
      raised: '8.5',
      contributors: 34,
      daysLeft: 0,
      created: '2024-11-20'
    }
  ];

  const myDonations = [
    {
      id: 1,
      title: 'Emergency Food Supplies - Turkey Earthquake',
      amount: '2.5',
      date: '2025-01-10',
      status: 'confirmed',
      recipient: '0x1234...5678'
    },
    {
      id: 2,
      title: 'Medical Equipment for Flood Victims',
      amount: '1.2',
      date: '2025-01-09',
      status: 'confirmed',
      recipient: '0xabcd...efgh'
    },
    {
      id: 3,
      title: 'Temporary Shelter Construction',
      amount: '2.0',
      date: '2025-01-08',
      status: 'confirmed',
      recipient: '0x9876...4321'
    }
  ];

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">
            Welcome back, {formatAddress(address!)} • Balance: {balance} ETH
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 hover:border-blue-300 transition-all duration-200">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-xs text-slate-500">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200 mb-8">
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'requests', label: 'My Requests' },
                { id: 'donations', label: 'My Donations' },
                { id: 'settings', label: 'Settings' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <Heart className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Donated 2.5 ETH</p>
                          <p className="text-xs text-slate-500">Turkey Earthquake Relief • 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Request funded 73%</p>
                          <p className="text-xs text-slate-500">Medical Supplies Request • 1 day ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <Plus className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium text-slate-900">Created new request</p>
                          <p className="text-xs text-slate-500">Flood Relief Supplies • 3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Summary */}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Impact</h3>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900 mb-1">47 people</div>
                        <div className="text-sm text-slate-600">directly helped through your donations</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900 mb-1">3 communities</div>
                        <div className="text-sm text-slate-600">supported through your requests</div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-slate-900 mb-1">100% transparency</div>
                        <div className="text-sm text-slate-600">all transactions on blockchain</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">My Aid Requests</h3>
                  <Link
                    to="/create"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Request
                  </Link>
                </div>

                <div className="space-y-4">
                  {myRequests.map((request) => (
                    <div key={request.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-medium text-slate-900 mb-2">{request.title}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/request/${request.id}`}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="text-xs text-slate-500">Target</label>
                          <p className="font-medium text-slate-900">{request.target} ETH</p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Raised</label>
                          <p className="font-medium text-slate-900">{request.raised} ETH</p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Contributors</label>
                          <p className="font-medium text-slate-900">{request.contributors}</p>
                        </div>
                        <div>
                          <label className="text-xs text-slate-500">Days Left</label>
                          <p className="font-medium text-slate-900">
                            {request.daysLeft > 0 ? `${request.daysLeft} days` : 'Completed'}
                          </p>
                        </div>
                      </div>

                      {request.status === 'active' && (
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                            style={{ width: `${Math.min((parseFloat(request.raised) / parseFloat(request.target)) * 100, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Donations Tab */}
            {activeTab === 'donations' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">My Donations</h3>
                
                <div className="space-y-4">
                  {myDonations.map((donation) => (
                    <div key={donation.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium text-slate-900 mb-2">{donation.title}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <label className="text-xs text-slate-500">Amount</label>
                              <p className="font-medium text-slate-900">{donation.amount} ETH</p>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500">Date</label>
                              <p className="font-medium text-slate-900">{donation.date}</p>
                            </div>
                            <div>
                              <label className="text-xs text-slate-500">Recipient</label>
                              <p className="font-medium text-slate-900 font-mono">{donation.recipient}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {donation.status.toUpperCase()}
                          </span>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Account Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Wallet Address
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={address!}
                          readOnly
                          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 font-mono text-sm"
                        />
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Display Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter display name (optional)"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        Notification Preferences
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                          <span className="text-sm text-slate-700">Email notifications for donations</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                          <span className="text-sm text-slate-700">Updates on requests I've donated to</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" />
                          <span className="text-sm text-slate-700">Weekly impact reports</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Privacy Settings
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" />
                          <span className="text-sm text-slate-700">Make donations public</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                          <span className="text-sm text-slate-700">Show on leaderboards</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-6 border-t border-slate-200">
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium">
                    Save Changes
                  </button>
                  <button className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;