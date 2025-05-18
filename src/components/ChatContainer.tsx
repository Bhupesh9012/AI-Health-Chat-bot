
import React, { useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/ChatBubble';
import { TypingIndicator } from '@/components/TypingIndicator';
import { useChatContext } from '@/contexts/ChatContext';
import { HealthRecommendations } from '@/components/HealthRecommendations';

export const ChatContainer: React.FC = () => {
  const { messages, isTyping, currentRecommendation } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change or typing indicator appears/disappears
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, currentRecommendation]);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 bg-black text-white">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md p-6 rounded-lg bg-gray-900 shadow-lg border border-gray-700">
              <h2 className="text-lg font-medium text-white mb-2">Health Care Center</h2>
              <p className="text-gray-300 text-sm">
                Describe your symptoms, and our AI system will provide health information and recommendations.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex w-full mb-4 justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-800 text-white rounded-bl-none shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        
        {currentRecommendation && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center mb-6">Our AI System Results</h2>
            <HealthRecommendations 
              condition={currentRecommendation.condition}
              recommendations={{
                medications: currentRecommendation.medications,
                diet: currentRecommendation.diet,
                workout: currentRecommendation.workout
              }}
            />
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
