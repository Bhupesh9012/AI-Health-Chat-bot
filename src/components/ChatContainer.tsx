
import React, { useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/ChatBubble';
import { TypingIndicator } from '@/components/TypingIndicator';
import { useChatContext } from '@/contexts/ChatContext';

export const ChatContainer: React.FC = () => {
  const { messages, isTyping } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change or typing indicator appears/disappears
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-4 py-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex w-full mb-4 justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-muted text-foreground rounded-bl-none">
              <TypingIndicator />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
