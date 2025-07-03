import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, Shield, ExternalLink, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const RequestDetailPage: React.FC = () => {
  const { id } = useParams();
  const { isConnected, address } = useWallet();
  const [donationAmount, setDonationAmount] = useState('');
  const [isDonating, setIsDonating] = useState(false);
  const [showDonationSuccess, setShowDonationSuccess] = useState(false);

  // Mock data - in real app this would be fetched based on ID
  const request = {
    id: parseInt(id || '1'),
    title: 'Emergency Food Supplies - Turkey Earthquake',
    description: `Providing emergency food supplies for 500 families affected by the recent 7.8 magnitude earthquake in southern Turkey. The earthquake has caused widespread destruction, leaving thousands of families without access to basic necessities.

Our team is working directly with local relief organizations to distribute:
- Rice and grain packages (10kg per family)
- Canned goods and preserved foods
- Baby formula and food for infants
- Clean drinking water (50L per family)
- Basic cooking supplies and utensils

All funds will be used transparently for purchasing and distributing these essential supplies. We have established distribution centers in Kahramanmaras and surrounding affected areas.

Local partnerships have been established with verified relief organizations who have been working in the region for years. Every donation will be tracked and documented with receipts and distribution photos.`,
    category: 'emergency',
    location: 'Kahramanmaras, Turkey',
    target: '15.0',
    raised: '12.3',
    contributors: 42,
    daysLeft: 5,
    urgent: true,
    verified: true,
    createdAt: '2025-01-09',
    creator: '0x1234567890abcdef1234567890abcdef12345678',
    reputation: 4.8,
    previousRequests: 3,
    contactInfo: 'relief@turkeyearthquake.org',
    proofDocuments: 'QmX7Y8Z9...abc123 (IPFS)',
    updates: [
      {
        date: '2025-01-10',
        title: 'Distribution Center Established',
        content: 'We have successfully established our main distribution center in Kahramanmaras. Local volunteers are helping coordinate the effort.'
      },
      {
        date: '2025-01-09',
        title: 'Request Created',
        content: 'Emergency aid request created for earthquake victims. Initial assessment shows 500 families in immediate need.'
      }
    ],
    donations: [
      { address: '0xabcd...ef12', amount: '2.5', timestamp: '2025-01-10 14:30' },
      { address: '0x1234...5678', amount: '1.8', timestamp: '2025-01-10 12:15' },
      { address: '0x9876...cdef', amount: '3.2', timestamp: '2025-01-10 09:45' },
      { address: '0xfedc...ba98', amount: '1.0', timestamp: '2025-01-09 22:30' },
      { address: '0x5555...aaaa', amount: '2.1', timestamp: '2025-01-09 18:20' }
    ]
  };

  const handleDonation = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    setIsDonating(true);
    
    // Simulate transaction delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsDonating(false);
    setShowDonationSuccess(true);
    setDonationAmount('');
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowDonationSuccess(false);
    }, 5000);
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const progressPercentage = Math.min((parseFloat(request.raised) / parseFloat(request.target)) * 100, 100);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/requests"
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Requests
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.urgent 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {request.urgent ? 'URGENT' : request.category.toUpperCase()}
                  </span>
                  {request.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      VERIFIED
                    </span>
                  )}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {request.daysLeft} days left
                </div>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 mb-4">
                {request.title}
              </h1>

              <div className="flex items-center text-slate-600 text-sm mb-6">
                <MapPin className="h-4 w-4 mr-1" />
                {request.location}
              </div>

              <div className="prose max-w-none">
                {request.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-slate-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Creator Information */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Creator Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">Wallet Address</label>
                  <p className="text-slate-900 font-mono text-sm">{formatAddress(request.creator)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Reputation Score</label>
                  <p className="text-slate-900">⭐ {request.reputation}/5.0</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Previous Requests</label>
                  <p className="text-slate-900">{request.previousRequests} completed</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Contact</label>
                  <p className="text-slate-900">{request.contactInfo}</p>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Supporting Documentation</h2>
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-slate-500" />
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  {request.proofDocuments}
                </a>
                <span className="text-slate-500 text-sm">(IPFS)</span>
              </div>
              <p className="text-slate-600 text-sm mt-2">
                Click to view supporting images and documentation stored on IPFS
              </p>
            </div>

            {/* Updates */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Updates</h2>
              <div className="space-y-4">
                {request.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-slate-900">{update.title}</h3>
                      <span className="text-sm text-slate-500">{update.date}</span>
                    </div>
                    <p className="text-slate-600 text-sm">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Success Message */}
            {showDonationSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-green-800 font-medium">Donation Successful!</h3>
                    <p className="text-green-700 text-sm mt-1">
                      Your donation has been recorded on the blockchain. Thank you for your support!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Donation Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Support This Request</h2>
              
              {/* Progress */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-2xl font-bold text-slate-900">{request.raised} ETH</span>
                  <span className="text-slate-600">of {request.target} ETH</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{Math.round(progressPercentage)}% funded</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {request.contributors} contributors
                  </div>
                </div>
              </div>

              {/* Donation Form */}
              {isConnected ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Donation Amount (ETH)
                    </label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="0.1"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleDonation}
                    disabled={isDonating || !donationAmount}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {isDonating ? 'Processing...' : 'Donate Now'}
                  </button>
                  <p className="text-xs text-slate-500 text-center">
                    Funds are sent directly to the creator's wallet
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                  <p className="text-slate-600 text-sm mb-4">
                    Connect your wallet to donate to this request
                  </p>
                  <button className="w-full px-4 py-3 bg-slate-100 text-slate-500 rounded-lg cursor-not-allowed">
                    Connect Wallet to Donate
                  </button>
                </div>
              )}
            </div>

            {/* Recent Donations */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Donations</h3>
              <div className="space-y-3">
                {request.donations.slice(0, 5).map((donation, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 font-mono">
                      {formatAddress(donation.address)}
                    </span>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{donation.amount} ETH</div>
                      <div className="text-xs text-slate-500">{donation.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Donations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;