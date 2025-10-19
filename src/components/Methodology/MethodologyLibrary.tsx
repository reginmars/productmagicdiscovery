import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ExternalLink, 
  Users, 
  Calendar, 
  Lightbulb, 
  Target, 
  TrendingUp,
  MessageSquare,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const MethodologyLibrary: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'resources' | 'events' | 'community'>('resources');

  const resources = [
    {
      id: 'ideo-design-kit',
      title: 'IDEO Design Kit',
      description: 'Human-centered design toolkit with methods, case studies, and resources for innovation. Learn design thinking from the pioneers.',
      url: 'https://www.designkit.org/',
      category: 'Design Thinking',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'blue',
      tags: ['Design Thinking', 'Innovation', 'User Research', 'Prototyping'],
      highlights: [
        '57 design methods and tools',
        'Real-world case studies',
        'Step-by-step guides',
        'Free online courses'
      ]
    },
    {
      id: 'makeit-toolkit',
      title: 'MakeIt Toolkit - 15 Strategies',
      description: 'Practical strategies for product development and innovation. Proven frameworks used by leading product teams worldwide.',
      url: 'https://www.makeit.com/toolkit',
      category: 'Product Strategy',
      icon: <Target className="w-6 h-6" />,
      color: 'purple',
      tags: ['Product Strategy', 'Innovation', 'Execution', 'Growth'],
      highlights: [
        '15 proven strategies',
        'Implementation templates',
        'Success metrics framework',
        'Team collaboration tools'
      ]
    },
    {
      id: 'singapore-agile-playbook',
      title: 'Singapore Government Agile Playbook',
      description: 'Comprehensive guide to agile delivery practices from Singapore\'s Government Technology Agency. Best practices for digital government services.',
      url: 'https://docs.developer.tech.gov.sg/docs/agile-playbook/agile-delivery?product=Agile+Way+of+Working',
      category: 'Agile Delivery',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'green',
      tags: ['Agile', 'Scrum', 'Delivery', 'Government', 'Best Practices'],
      highlights: [
        'Government-tested practices',
        'Agile ceremonies guide',
        'Team structure templates',
        'Metrics and reporting'
      ]
    }
  ];

  const upcomingEvents = [
    {
      id: 'event-1',
      title: 'Product Discovery Workshop',
      date: '2024-02-15',
      time: '2:00 PM - 5:00 PM SGT',
      type: 'Workshop',
      location: 'Online',
      description: 'Learn systematic approaches to problem discovery and validation',
      spots: 25,
      registered: 18
    },
    {
      id: 'event-2',
      title: 'Design Thinking Masterclass',
      date: '2024-02-22',
      time: '10:00 AM - 4:00 PM SGT',
      type: 'Masterclass',
      location: 'Hybrid',
      description: 'Deep dive into IDEO\'s design thinking methodology with hands-on exercises',
      spots: 30,
      registered: 22
    },
    {
      id: 'event-3',
      title: 'Agile Product Management Meetup',
      date: '2024-03-05',
      time: '6:30 PM - 8:30 PM SGT',
      type: 'Meetup',
      location: 'Singapore',
      description: 'Monthly gathering of product professionals to share insights and network',
      spots: 50,
      registered: 35
    }
  ];

  const communityInfo = {
    title: 'Singapore Computer Society',
    subtitle: 'Product Management Special Interest Group',
    description: 'Join Singapore\'s premier community of product management professionals. Connect with peers, share knowledge, and advance your product management career.',
    benefits: [
      'Access to exclusive workshops and masterclasses',
      'Networking with 500+ product professionals',
      'Monthly meetups and knowledge sharing sessions',
      'Career development resources and mentorship',
      'Industry insights and best practices',
      'Certification programs and training'
    ],
    stats: [
      { label: 'Active Members', value: '500+', icon: <Users className="w-5 h-5" /> },
      { label: 'Monthly Events', value: '4-6', icon: <Calendar className="w-5 h-5" /> },
      { label: 'Partner Companies', value: '50+', icon: <Award className="w-5 h-5" /> },
      { label: 'Years Active', value: '8+', icon: <TrendingUp className="w-5 h-5" /> }
    ],
    upcomingInitiatives: [
      {
        title: 'PM Certification Program',
        description: 'Comprehensive certification program launching Q2 2024',
        status: 'Coming Soon'
      },
      {
        title: 'Mentorship Network',
        description: 'Connect with experienced PMs for career guidance',
        status: 'Beta'
      },
      {
        title: 'Job Board',
        description: 'Exclusive product management opportunities in Singapore',
        status: 'Coming Soon'
      }
    ],
    contact: {
      website: 'https://www.scs.org.sg',
      email: 'pm-sig@scs.org.sg',
      linkedin: 'https://www.linkedin.com/company/singapore-computer-society'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="glass-card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Methodology Library</h1>
            <p className="text-gray-700 mb-4">
              Curated collection of proven frameworks, resources, and community connections to enhance your product discovery practice.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>External Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>Upcoming Events</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span>Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveCategory('resources')}
          className={`glass-button px-6 py-3 flex items-center gap-2 ${
            activeCategory === 'resources' ? 'bg-primary-600 text-white' : ''
          }`}
        >
          <BookOpen size={16} />
          Resources & Toolkits
        </button>
        <button
          onClick={() => setActiveCategory('events')}
          className={`glass-button px-6 py-3 flex items-center gap-2 ${
            activeCategory === 'events' ? 'bg-primary-600 text-white' : ''
          }`}
        >
          <Calendar size={16} />
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveCategory('community')}
          className={`glass-button px-6 py-3 flex items-center gap-2 ${
            activeCategory === 'community' ? 'bg-primary-600 text-white' : ''
          }`}
        >
          <Users size={16} />
          Community
        </button>
      </div>

      {/* Resources Section */}
      {activeCategory === 'resources' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-xl bg-${resource.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <div className={`text-${resource.color}-600`}>
                    {resource.icon}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {resource.title}
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full bg-${resource.color}-100 text-${resource.color}-700`}>
                        {resource.category}
                      </span>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-button bg-primary-600 text-white px-4 py-2 flex items-center gap-2 hover:bg-primary-700 transition-colors"
                    >
                      Visit Resource
                      <ExternalLink size={14} />
                    </a>
                  </div>

                  <p className="text-gray-700 mb-4">
                    {resource.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {resource.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className={`w-4 h-4 text-${resource.color}-600`} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Additional Resources CTA */}
          <div className="glass-card p-6 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Looking for more resources?</h3>
                <p className="text-sm text-gray-600">
                  We're constantly adding new frameworks and methodologies to help you succeed.
                </p>
              </div>
              <button className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2">
                Suggest a Resource
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Events Section */}
      {activeCategory === 'events' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Join workshops, masterclasses, and meetups to enhance your product management skills and network with peers.
            </p>
          </div>

          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      {event.type}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {event.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{event.registered}/{event.spots} registered</span>
                    </div>
                  </div>
                </div>
                <button className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2 ml-4">
                  Register
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${(event.registered / event.spots) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}

          <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Want to host an event?</h3>
                <p className="text-sm text-gray-600">
                  Share your expertise with the community. We're always looking for speakers and workshop facilitators.
                </p>
              </div>
              <button className="glass-button bg-green-600 text-white px-6 py-3 flex items-center gap-2">
                Propose Event
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Community Section */}
      {activeCategory === 'community' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* SCS PM SIG Header */}
          <div className="glass-card p-8 bg-gradient-to-r from-green-50 via-blue-50 to-purple-50">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {communityInfo.title}
                </h2>
                <h3 className="text-xl text-primary-600 font-semibold mb-3">
                  {communityInfo.subtitle}
                </h3>
                <p className="text-gray-700 mb-4">
                  {communityInfo.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={communityInfo.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button bg-primary-600 text-white px-6 py-2 flex items-center gap-2"
                  >
                    Visit Website
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={communityInfo.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-button px-6 py-2 flex items-center gap-2"
                  >
                    LinkedIn
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={`mailto:${communityInfo.contact.email}`}
                    className="glass-button px-6 py-2 flex items-center gap-2"
                  >
                    Contact Us
                    <MessageSquare size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {communityInfo.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="text-primary-600">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-green-600" />
              Member Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityInfo.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Upcoming Initiatives */}
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Upcoming Initiatives
            </h3>
            <div className="space-y-4">
              {communityInfo.upcomingInitiatives.map((initiative, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {initiative.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {initiative.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-4 ${
                    initiative.status === 'Beta' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {initiative.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Join CTA */}
          <div className="glass-card p-8 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Ready to Join the Community?</h3>
                <p className="text-white/90 mb-4">
                  Connect with Singapore's leading product management professionals and accelerate your career growth.
                </p>
                <ul className="space-y-2 text-sm text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free membership for first 3 months</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Access to all events and workshops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Exclusive job opportunities</span>
                  </li>
                </ul>
              </div>
              <button className="glass-button bg-white text-primary-600 px-8 py-4 text-lg font-semibold flex items-center gap-2 ml-6">
                Join Now
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MethodologyLibrary;
