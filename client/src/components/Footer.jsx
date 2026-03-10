import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Responsive Grid: 1 column on mobile, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">
                Study<span className="text-[#2563eb]">Flow</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering students to organize their academic life and achieve their goals with ease.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/tasks" className="hover:text-[#2563eb] transition-colors">Task Manager</Link></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Study Planner</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Templates</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#2563eb] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-xs">
            © {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* Simple Social Icons Placeholder */}
            <div className="w-5 h-5 bg-slate-100 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-100 rounded-full"></div>
            <div className="w-5 h-5 bg-slate-100 rounded-full"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;