
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
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4 bg-gradient-to-br from-white/70 to-blue-50/70 dark:from-gray-800/70 dark:to-gray-900/70 backdrop-blur-sm">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md p-6 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow-lg backdrop-blur-sm border border-blue-100 dark:border-gray-700">
              <h2 className="text-lg font-medium text-primary mb-2">Welcome to HealthChat</h2>
              <p className="text-muted-foreground text-sm">
                Describe your symptoms, and I'll provide health information and recommendations.
              </p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex w-full mb-4 justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted text-foreground rounded-bl-none shadow-sm">
              <TypingIndicator />
            </div>
          </div>
        )}
        
        {currentRecommendation && (
          <HealthRecommendations 
            condition={currentRecommendation.condition}
            recommendations={{
              medications: currentRecommendation.medications,
              diet: currentRecommendation.diet,
              workout: currentRecommendation.workout,
              images: currentRecommendation.images
            }}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
