import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    targetAmount: '',
    urgency: 'normal',
    contactInfo: '',
    proofDocuments: ''
  });

  const categories = [
    { value: 'emergency', label: 'Emergency Relief' },
    { value: 'medical', label: 'Medical Aid' },
    { value: 'housing', label: 'Housing & Shelter' },
    { value: 'food', label: 'Food & Water' },
    { value: 'education', label: 'Education' },
    { value: 'infrastructure', label: 'Infrastructure Repair' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form and redirect after success message
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        targetAmount: '',
        urgency: 'normal',
        contactInfo: '',
        proofDocuments: ''
      });
      navigate('/requests');
    }, 3000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Wallet Connection Required
            </h2>
            <p className="text-slate-600 mb-6">
              You need to connect your wallet to create aid requests. This ensures all requests are verified and tied to a blockchain address.
            </p>
            <p className="text-sm text-slate-500 mb-6">
              Your wallet address will be used to verify your identity and manage your requests.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium"
            >
              Connect Wallet to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200 text-center">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Request Created Successfully!
            </h2>
            <p className="text-slate-600 mb-6">
              Your aid request has been submitted to the blockchain and is now live for the community to support.
            </p>
            <div className="text-sm text-slate-500 space-y-1">
              <p>Transaction ID: 0x1234567890abcdef...</p>
              <p>Gas Fee: 0.003 ETH</p>
              <p>Status: Confirmed on Sepolia Testnet</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Create Aid Request
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Submit a verified request for disaster aid. All requests are recorded on-chain for full transparency.
          </p>
        </div>

        {/* Connected Wallet Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Wallet Connected:</span>
            <span className="text-green-700 ml-2">{address}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Request Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                  Request Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Emergency food supplies for earthquake victims"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-slate-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  required
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Target Amount */}
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-slate-700 mb-2">
                  Target Amount (ETH) *
                </label>
                <input
                  type="number"
                  id="targetAmount"
                  name="targetAmount"
                  required
                  min="0.1"
                  step="0.1"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  placeholder="10.0"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={6}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of the aid needed, including specific items, quantities, and how the funds will be used..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2">
                <label htmlFor="contactInfo" className="block text-sm font-medium text-slate-700 mb-2">
                  Contact Information *
                </label>
                <input
                  type="text"
                  id="contactInfo"
                  name="contactInfo"
                  required
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  placeholder="Email or telegram for verification purposes"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Verification Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Verification & Documentation</h2>
            
            <div className="space-y-6">
              {/* Proof Documents */}
              <div>
                <label htmlFor="proofDocuments" className="block text-sm font-medium text-slate-700 mb-2">
                  Supporting Documentation
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-2">Upload photos, documents, or links to news articles</p>
                  <p className="text-xs text-slate-500">Images will be stored on IPFS for transparency</p>
                  <input
                    type="text"
                    id="proofDocuments"
                    name="proofDocuments"
                    value={formData.proofDocuments}
                    onChange={handleInputChange}
                    placeholder="IPFS hash or external link to documentation"
                    className="w-full mt-4 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Verification Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div className="text-sm">
                    <p className="text-blue-800 font-medium mb-1">Verification Process</p>
                    <p className="text-blue-700">
                      All requests undergo community verification. Providing detailed documentation 
                      and contact information helps establish credibility and increases funding success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fee Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
              <div className="text-sm">
                <p className="text-amber-800 font-medium mb-1">Transaction Fees</p>
                <p className="text-amber-700">
                  Creating a request requires a small gas fee (~0.003 ETH) to record it on the blockchain. 
                  This ensures immutability and transparency of all aid requests.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Request...' : 'Create Aid Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestPage;