import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Header: React.FC = () => {
  const { user } = useStore();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="h-16 glass-card rounded-none border-b border-glass-border px-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome back, {user?.name}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-button p-2 relative"
        >
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-button p-2"
        >
          <MessageSquare size={20} className="text-gray-600" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass-button p-2"
        >
          <HelpCircle size={20} className="text-gray-600" />
        </motion.button>

        <div className="flex items-center gap-3 glass-button px-3 py-2 cursor-pointer">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-left">
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role.replace('_', ' ')}</p>
          </div>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
