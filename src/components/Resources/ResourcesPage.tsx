import React from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  BookOpen, 
  Users, 
  Calendar,
  FileText,
  Lightbulb,
  Target,
  TrendingUp,
  GraduationCap,
  Award
} from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ title, description, url, icon, category }) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card p-6 hover:shadow-lg transition-all group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
          </div>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
      </div>
    </motion.a>
  );
};

const ResourcesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resources & Community</h1>
        <p className="text-gray-600">
          Curated tools, frameworks, and communities to enhance your problem discovery practice.
        </p>
      </div>

      {/* Learn from Experienced Practitioners Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glass-card p-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Learn from Experienced Practitioners</h2>
              <p className="text-gray-700 mb-4">
                Connect with Singapore's leading product management community to accelerate your learning and growth.
              </p>
            