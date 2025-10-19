import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  BookOpen, 
  Users, 
  Calendar,
  FileText,
  Lightbulb,
  Target,
  Award,
  Mail,
  CheckCircle
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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email collection backend
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Resources & Community</h1>
        <p className="text-gray-600">
          Curated tools, frameworks, and communities to enhance your problem discovery practice.
        </p>
      </div>

      {/* Toolkits Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Toolkits & Frameworks</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ResourceCard
            title="SCS PM SIG Resources"
            description="Curated resources, templates, and best practices from Singapore Computer Society's PM community."
            url="https://www.scs.org.sg/special-interest-groups/product-management/resources"
            icon={<Award className="w-6 h-6 text-white" />}
            category="Resources"
          />
          <ResourceCard
            title="IDEO Design Kit"
            description="Human-centered design methods and case studies for problem discovery and solution design."
            url="https://www.designkit.org/"
            icon={<Lightbulb className="w-6 h-6 text-white" />}
            category="Toolkit"
          />
          <ResourceCard
            title="MakeIt Toolkit"
            description="Practical tools and templates for product discovery and validation from Thoughtworks."
            url="https://www.thoughtworks.com/en-sg/insights/blog/makeit-toolkit"
            icon={<Target className="w-6 h-6 text-white" />}
            category="Toolkit"
          />
          <ResourceCard
            title="Singapore Government Design System"
            description="Design principles and resources for building government digital services."
            url="https://www.designsystem.tech.gov.sg/"
            icon={<FileText className="w-6 h-6 text-white" />}
            category="Government"
          />
        </div>
      </section>

      {/* Learn from Experienced Practitioners Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="glass-card p-8 bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
              Learn from Experienced Practitioners
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              Connect with Singapore's leading product management community to accelerate your learning and growth.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-white/40">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">Singapore Computer Society - Product Management SIG</h3>
            </div>
            <p className="text-gray-700 mb-4">
              The Product Management Special Interest Group (PM SIG) brings together experienced product managers, 
              product owners, and business analysts from across Singapore. Learn proven methodologies, share challenges, 
              and gain insights from practitioners who have successfully navigated complex product discovery and delivery.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Events Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Events</h2>
        </div>
        
        <motion.a
          href="https://www.scs.org.sg/communities/product-management-sig/events"
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card p-6 hover:shadow-lg transition-all group block"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  SCS Product Management SIG Events
                </h3>
                <ExternalLink size={16} className="text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Join workshops, panel discussions, and networking sessions with Singapore's product management community. 
                Learn from experienced practitioners and stay updated on the latest trends and methodologies.
              </p>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                Events & Workshops
              </span>
            </div>
          </div>
        </motion.a>
      </section>

      {/* Communities Section - Coming Soon */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Community</h2>
        </div>
        
        <div className="glass-card p-8 bg-gradient-to-br from-secondary-50 to-primary-50 border-2 border-secondary-200">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              SCS Product Management (PDM) Special Interest Group Community
            </h3>
            <p className="text-gray-600 mb-6">
              We're building a dedicated online community platform for SCS PDM members. Connect, collaborate, 
              and share insights with fellow product managers, product owners, and business analysts. 
              Be the first to know when we launch and get exclusive early access.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all font-medium whitespace-nowrap inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Notify Me
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 text-green-600 font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Thanks! We'll notify you when we launch.
              </motion.div>
            )}

            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Info Card */}
      <motion.div
        className="glass-card p-6 bg-gradient-to-r from-primary-50 to-secondary-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-gray-800 mb-2">💡 Continuous Learning</h3>
        <p className="text-sm text-gray-600">
          These external resources complement your problem discovery workflow. Explore different methodologies 
          and connect with the product management community to continuously improve your practice.
        </p>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;
