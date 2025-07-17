import React, { useState } from 'react';
import { ChatBubbleIcon, XIcon, AIIcon } from './Icons';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[28rem] bg-fog-white dark:bg-fog-mid-dark rounded-xl shadow-2xl dark:shadow-2xl-dark flex flex-col animate-fade-in-up">
          <header className="flex items-center justify-between p-4 bg-fog-accent text-white rounded-t-xl">
            <div className="flex items-center gap-2">
              <AIIcon className="w-6 h-6" />
              <h3 className="font-bold">AI Customer Service</h3>
            </div>
            <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/20">
              <XIcon />
            </button>
          </header>
          <div className="flex-grow p-4 space-y-4 overflow-y-auto">
            {/* AI Welcome Message */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-fog-accent flex items-center justify-center text-white flex-shrink-0"><AIIcon className="w-5 h-5"/></div>
              <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg rounded-tl-none">
                <p className="text-sm text-fog-dark dark:text-fog-light">Hello! How can I assist you today? Here are some common questions:</p>
              </div>
            </div>
            {/* Quick Actions */}
            <div className="flex flex-col items-start gap-2 pl-10">
                <button className="text-sm text-fog-accent border border-fog-accent/50 rounded-full px-3 py-1 hover:bg-fog-accent/10 transition-colors">How do I post a job?</button>
                <button className="text-sm text-fog-accent border border-fog-accent/50 rounded-full px-3 py-1 hover:bg-fog-accent/10 transition-colors">How do I get paid?</button>
                <button className="text-sm text-fog-accent border border-fog-accent/50 rounded-full px-3 py-1 hover:bg-fog-accent/10 transition-colors">Contact human support</button>
            </div>
          </div>
          <footer className="p-4 border-t border-gray-200 dark:border-slate-700">
            <input
              type="text"
              placeholder="Ask a question..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-fog-accent bg-fog-white dark:bg-slate-800"
            />
          </footer>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={toggleChat}
        className="bg-fog-accent text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-fog-accent-hover transition-all transform hover:scale-110 focus:outline-none overflow-hidden"
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <XIcon /> : <ChatBubbleIcon />}
      </button>
    </div>
  );
};

export default ChatWidget;