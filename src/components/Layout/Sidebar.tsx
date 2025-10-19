import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Search, 
  Target, 
  BarChart3,
  Lightbulb,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discovery', label: 'Problem Discovery', icon: Search },
    { id: 'opportunities', label: 'Opportunities', icon: Target },
    { id: 'guides', label: 'Practice Guides', icon: GraduationCap },
    { id: 'analytics', label: 'Discovery Analytics', icon: BarChart3 },
    { id: 'resources', label: 'Resources & Community', icon: BookOpen },
  ];

  const handleLogoClick = () => {
    onTabChange('landing');
  };

  return (
    <div className="w-64 bg-white/80 backdrop-blur-lg border-r border-white/20 h-screen sticky top-0">
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-3 mb-8 cursor-pointer group"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors">ProductMagic</h1>
            <p className="text-xs text-gray-600">Problem Discovery Platform</p>
          </div>
        </motion.div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
                whileHover={{ x: isActive ? 0 : 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass-card p-4">
          <h3 className="font-semibold text-gray-800 mb-2">💡 Pro Tip</h3>
          <p className="text-xs text-gray-600">
            Always validate problems with real user data before jumping to solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
