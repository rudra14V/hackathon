import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, Clock, MapPin, TrendingUp } from 'lucide-react';

const RequestsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'medical', label: 'Medical' },
    { value: 'housing', label: 'Housing' },
    { value: 'food', label: 'Food & Water' },
    { value: 'education', label: 'Education' },
    { value: 'infrastructure', label: 'Infrastructure' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'urgent', label: 'Most Urgent' },
    { value: 'progress', label: 'Most Funded' },
    { value: 'ending', label: 'Ending Soon' }
  ];

  const requests = [
    {
      id: 1,
      title: 'Emergency Food Supplies - Turkey Earthquake',
      description: 'Providing emergency food supplies for 500 families affected by the recent earthquake in southern Turkey. This includes basic necessities like rice, bread, canned goods, and clean water for immediate relief.',
      category: 'emergency',
      location: 'Kahramanmaras, Turkey',
      target: '15.0',
      raised: '12.3',
      contributors: 42,
      daysLeft: 5,
      urgent: true,
      verified: true,
      createdAt: '2025-01-09',
      creator: '0x1234...5678'
    },
    {
      id: 2,
      title: 'Medical Equipment for Flood Victims',
      description: 'Medical supplies and equipment needed for flood-affected communities in Bangladesh. Including first aid kits, medicines, and portable medical equipment for field hospitals.',
      category: 'medical',
      location: 'Sylhet, Bangladesh',
      target: '8.5',
      raised: '6.2',
      contributors: 28,
      daysLeft: 12,
      urgent: false,
      verified: true,
      createdAt: '2025-01-08',
      creator: '0xabcd...efgh'
    },
    {
      id: 3,
      title: 'Temporary Shelter Construction',
      description: 'Building temporary shelters for families displaced by wildfire in California. Materials and labor costs for emergency housing construction.',
      category: 'housing',
      location: 'Northern California, USA',
      target: '25.0',
      raised: '18.7',
      contributors: 73,
      daysLeft: 20,
      urgent: true,
      verified: true,
      createdAt: '2025-01-07',
      creator: '0x9876...4321'
    },
    {
      id: 4,
      title: 'Clean Water Infrastructure Repair',
      description: 'Repairing damaged water infrastructure after hurricane damage in Puerto Rico. Installing new pumps and filtration systems.',
      category: 'infrastructure',
      location: 'San Juan, Puerto Rico',
      target: '12.0',
      raised: '4.8',
      contributors: 19,
      daysLeft: 30,
      urgent: false,
      verified: true,
      createdAt: '2025-01-06',
      creator: '0xfedc...ba98'
    },
    {
      id: 5,
      title: 'School Reconstruction - Typhoon Relief',
      description: 'Rebuilding classrooms destroyed by Typhoon Mawar in the Philippines. Educational materials and furniture included.',
      category: 'education',
      location: 'Luzon, Philippines',
      target: '18.5',
      raised: '11.2',
      contributors: 56,
      daysLeft: 45,
      urgent: false,
      verified: true,
      createdAt: '2025-01-05',
      creator: '0x5678...1234'
    },
    {
      id: 6,
      title: 'Emergency Food Distribution - Drought Relief',
      description: 'Providing food assistance to drought-affected communities in Kenya. Focus on nutritious food packages for children and elderly.',
      category: 'food',
      location: 'Turkana, Kenya',
      target: '9.2',
      raised: '7.8',
      contributors: 34,
      daysLeft: 15,
      urgent: true,
      verified: true,
      createdAt: '2025-01-04',
      creator: '0x2468...8642'
    }
  ];

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (sortBy) {
      case 'urgent':
        return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
      case 'progress':
        return (parseFloat(b.raised) / parseFloat(b.target)) - (parseFloat(a.raised) / parseFloat(a.target));
      case 'ending':
        return a.daysLeft - b.daysLeft;
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      emergency: 'bg-red-100 text-red-700',
      medical: 'bg-blue-100 text-blue-700',
      housing: 'bg-purple-100 text-purple-700',
      food: 'bg-green-100 text-green-700',
      education: 'bg-yellow-100 text-yellow-700',
      infrastructure: 'bg-gray-100 text-gray-700'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Browse Aid Requests
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Support verified disaster relief requests from communities around the world. 
            Every donation is tracked transparently on the blockchain.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600">
            Showing {sortedRequests.length} of {requests.length} requests
          </p>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.urgent 
                      ? 'bg-red-100 text-red-700' 
                      : getCategoryColor(request.category)
                  }`}>
                    {request.urgent ? 'URGENT' : request.category.toUpperCase()}
                  </span>
                  {request.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      VERIFIED
                    </span>
                  )}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {request.daysLeft}d left
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-2">
                {request.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                {request.description}
              </p>

              {/* Location */}
              <div className="flex items-center text-slate-500 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {request.location}
              </div>

              {/* Progress */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-medium text-slate-900">
                    {request.raised} / {request.target} ETH
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min((parseFloat(request.raised) / parseFloat(request.target)) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{Math.round((parseFloat(request.raised) / parseFloat(request.target)) * 100)}% funded</span>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {request.contributors} contributors
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  Created by {request.creator}
                </div>
                <Link
                  to={`/request/${request.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedRequests.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No requests found</h3>
            <p className="text-slate-600 mb-6">
              Try adjusting your search terms or filters to find more requests.
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-lg hover:from-blue-600 hover:to-emerald-600 transition-all duration-200 font-medium"
            >
              Create New Request
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;