import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Brain, Palette, ExternalLink } from 'lucide-react';

const templates = [
  {
    id: 1,
    title: 'Study System OS',
    description: 'A Notion workspace for students with linked databases, revision tracker, and integrated GPT prompts.',
    link: 'https://notion.so/study-system-os',
    icon: FileText,
    tag: 'Student',
  },
  {
    id: 2,
    title: 'Creator Command Center',
    description: 'Manage your content pipeline, ideas, brand deals, and analytics. Built for creators with AI assistance.',
    link: 'https://notion.so/creator-command-center',
    icon: Palette,
    tag: 'Creator',
  },
  {
    id: 3,
    title: 'AI Content Planner',
    description: 'Plan, generate, and optimize posts across platforms using built-in GPT-4 prompts and workflows.',
    link: 'https://notion.so/ai-content-planner',
    icon: Brain,
    tag: 'Marketing',
  },
];

const Template = () => {
  return (
    <div className="min-h-screen pt-24 gradient-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-gradient">Notion Templates</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Curated productivity systems enhanced with AI prompts. One-click duplication, lifetime access.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-4">{template.description}</p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary-50 text-primary-600 rounded-full">
                    {template.tag}
                  </span>
                </div>
                <a
                  href={template.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center text-primary-600 font-semibold hover:underline"
                >
                  View Template <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Template;
