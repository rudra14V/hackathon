import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Globe, Shield, Users, Zap } from 'lucide-react';

const Footer: React.FC = () => {
  const features = [
    { icon: Shield, text: 'Blockchain Security' },
    { icon: Users, text: 'Community Driven' },
    { icon: Zap, text: 'Instant Transfers' }
  ];

  return (
    <footer className="bg-slate-900/90 backdrop-blur-xl border-t border-slate-700/50 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DeCRiCo Lite
              </span>
            </motion.div>
            <p className="text-slate-300 mb-6 max-w-md">
              Decentralized disaster relief coordination platform built on Ethereum. 
              Transparent, trustless, and community-driven disaster response.
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700"
                >
                  <feature.icon className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Globe, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-slate-800/50 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-700/50 transition-all duration-200 border border-slate-700"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Browse Requests', href: '/requests' },
                { name: 'Create Request', href: '/create' },
                { name: 'Dashboard', href: '/dashboard' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Resources</h3>
            <ul className="space-y-2">
              {[
                'Documentation',
                'Smart Contracts',
                'API Reference',
                'Community'
              ].map((resource, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href="#"
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {resource}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="border-t border-slate-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-slate-400 text-sm">
            © 2025 DeCRiCo Lite. Built for Ethereum Hackathon.
          </p>
          <p className="text-slate-400 text-sm mt-2 sm:mt-0">
            Made with ❤️ for transparent disaster relief
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;