
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatContext } from '@/contexts/ChatContext';
import { analyzeSymptoms } from '@/services/chatService';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, setIsTyping } = useChatContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '' || isSubmitting) return;
    
    const userMessage = input.trim();
    setInput('');
    setIsSubmitting(true);
    
    // Add user message to the chat
    addMessage('user', userMessage);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Send request to analyze symptoms
      const response = await analyzeSymptoms({
        symptoms: userMessage,
        // In a real app, we would extract more structured data here
      });
      
      // Generate assistant response
      let assistantResponse = response.analysis;
      
      if (response.possibleConditions && response.possibleConditions.length > 0) {
        assistantResponse += "\n\nPossible conditions to consider:\n";
        response.possibleConditions.forEach((condition, index) => {
          assistantResponse += `• ${condition}\n`;
        });
      }
      
      if (response.recommendations && response.recommendations.length > 0) {
        assistantResponse += "\n\nRecommendations:\n";
        response.recommendations.forEach((rec, index) => {
          assistantResponse += `• ${rec}\n`;
        });
      }
      
      if (response.shouldConsultDoctor) {
        assistantResponse += "\n\nBased on what you've shared, I'd recommend consulting with a healthcare provider for proper evaluation.";
      }
      
      // Add assistant response to the chat
      addMessage('assistant', assistantResponse);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      addMessage('assistant', "I'm sorry, I encountered an error while processing your request. Please try again later.");
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-2">
        <Textarea
          placeholder="Describe your symptoms..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none min-h-[60px] flex-1"
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          disabled={isSubmitting || input.trim() === ''}
          className="self-end h-10 px-5"
        >
          Send
        </Button>
      </div>
    </form>
  );
};
