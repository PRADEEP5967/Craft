
import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">PS</span>
              </div>
              <h3 className="text-xl font-bold">Notes App</h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              A modern, secure note-taking application designed to help you organize your thoughts and ideas efficiently.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="h-6 w-6 bg-gray-600 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <div className="h-6 w-6 bg-gray-600 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <div className="h-6 w-6 bg-gray-600 rounded"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#notes" className="text-gray-400 hover:text-white transition-colors">My Notes</a></li>
              <li><a href="#profile" className="text-gray-400 hover:text-white transition-colors">Profile</a></li>
              <li><a href="#settings" className="text-gray-400 hover:text-white transition-colors">Settings</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 flex items-center">
                Developed with <Heart className="h-4 w-4 text-red-500 mx-1" /> by{' '}
                <span className="font-semibold text-white ml-1">Er. Pradeep Sahani</span>
              </p>
              <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-sm text-gray-400">
                <a href="tel:8130885013" className="flex items-center hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mr-1" />
                  8130885013
                </a>
                <a href="mailto:pradeepsahanis130s@gmail.com" className="flex items-center hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mr-1" />
                  pradeepsahanis130s@gmail.com
                </a>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              © 2024 Notes App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
