'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Overview', 'Projects', 'Feedback'];

export default function EmployeeTabs() {
  const [active, setActive] = useState('Overview');

  const renderContent = () => {
    switch (active) {
      case 'Overview':
        return (
          <p>
            This employee consistently meets goals and maintains a high standard of work.
          </p>
        );
      case 'Projects':
        return (
          <ul className="list-disc pl-5">
            <li>Attendance Management System</li>
            <li>Employee Self-Service Portal</li>
            <li>HR Chatbot Integration</li>
          </ul>
        );
      case 'Feedback':
        return (
          <ul className="list-disc pl-5">
            <li>Very punctual and detail-oriented. ⭐⭐⭐⭐</li>
            <li>Great team collaborator. ⭐⭐⭐⭐⭐</li>
            <li>Needs to improve meeting deadlines. ⭐⭐⭐</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex gap-4 border-b mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-2 font-semibold ${
              active === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
