import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Clock, 
  Eye, 
  MapPin, 
  Chrome,
  X,
  RefreshCw,
  Trash2,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import { visitorTracker, VisitorData } from '../utils/visitorTracking';

interface VisitorAnalyticsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VisitorAnalytics({ isOpen, onClose }: VisitorAnalyticsProps) {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [analytics, setAnalytics] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'visitors' | 'analytics'>('overview');

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const visitorData = visitorTracker.getStoredVisitors();
    const analyticsData = visitorTracker.getAnalyticsSummary();
    setVisitors(visitorData);
    setAnalytics(analyticsData);
  };

  const clearData = () => {
    visitorTracker.clearAnalytics();
    loadData();
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case 'chrome': return <Chrome className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Visitor Analytics</h2>
                <p className="text-gray-400 text-sm">Track and analyze site visitors</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={loadData}
                className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={clearData}
                className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700/50">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'visitors', label: 'Visitors', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Visitors', value: analytics.totalVisitors || 0, icon: Users, color: 'blue' },
                  { label: 'Unique IPs', value: analytics.uniqueIPs || 0, icon: Globe, color: 'green' },
                  { label: 'Returning', value: analytics.returningVisitors || 0, icon: RefreshCw, color: 'purple' },
                  { label: 'Avg. Session', value: formatDuration(analytics.averageSessionDuration || 0), icon: Clock, color: 'orange' }
                ].map(({ label, value, icon: Icon, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl bg-gradient-to-br from-${color}-500/10 to-${color}-600/5 border border-${color}-500/20`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-8 h-8 text-${color}-400`} />
                      <span className={`text-2xl font-bold text-${color}-400`}>{value}</span>
                    </div>
                    <p className="text-gray-300 font-medium">{label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'visitors' && (
              <div className="space-y-4">
                {visitors.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No visitors tracked yet</p>
                  </div>
                ) : (
                  visitors.map((visitor, index) => (
                    <motion.div
                      key={visitor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/30"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-blue-400" />
                            <span className="text-white font-medium">
                              {visitor.location.city}, {visitor.location.country}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">IP: {visitor.ipAddress}</p>
                          <p className="text-gray-400 text-sm">
                            {new Date(visitor.timestamp).toLocaleString()}
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            {getBrowserIcon(visitor.browserInfo.name)}
                            <span className="text-white">
                              {visitor.browserInfo.name} {visitor.browserInfo.version}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getDeviceIcon(visitor.deviceInfo.type)}
                            <span className="text-gray-400 text-sm capitalize">
                              {visitor.deviceInfo.type} ({visitor.deviceInfo.screenWidth}x{visitor.deviceInfo.screenHeight})
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <Eye className="w-4 h-4 text-green-400" />
                            <span className="text-white">{visitor.pageViews.length} pages</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-orange-400" />
                            <span className="text-gray-400 text-sm">
                              {formatDuration(visitor.sessionDuration)}
                            </span>
                          </div>
                          {visitor.isReturning && (
                            <span className="inline-block mt-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                              Returning
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Countries */}
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-400" />
                    Countries
                  </h3>
                  <div className="space-y-2">
                    {analytics.countries?.map((country: string, index: number) => (
                      <div key={country} className="flex justify-between items-center">
                        <span className="text-gray-300">{country}</span>
                        <span className="text-blue-400 font-medium">
                          {visitors.filter(v => v.location.country === country).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Browsers */}
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Chrome className="w-5 h-5 mr-2 text-green-400" />
                    Browsers
                  </h3>
                  <div className="space-y-2">
                    {analytics.browsers?.map((browser: string, index: number) => (
                      <div key={browser} className="flex justify-between items-center">
                        <span className="text-gray-300">{browser}</span>
                        <span className="text-green-400 font-medium">
                          {visitors.filter(v => v.browserInfo.name === browser).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Devices */}
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-purple-400" />
                    Devices
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(analytics.devices || {}).map(([device, count]) => (
                      <div key={device} className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          {getDeviceIcon(device)}
                          <span className="text-gray-300 capitalize">{device}</span>
                        </div>
                        <span className="text-purple-400 font-medium">{count as number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Recent Activity
                  </h3>
                  <div className="space-y-2">
                    {visitors.slice(-5).reverse().map((visitor) => (
                      <div key={visitor.id} className="text-sm">
                        <span className="text-gray-300">
                          {visitor.location.city} visited
                        </span>
                        <span className="text-orange-400 ml-2">
                          {new Date(visitor.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}