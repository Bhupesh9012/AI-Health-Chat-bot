
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatContext } from '@/contexts/ChatContext';
import { analyzeSymptoms } from '@/services/chatService';
import { Mic, MicOff, SendHorizonal } from 'lucide-react';
import { toast } from 'sonner';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, setIsTyping } = useChatContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

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
      });
      
      // Generate assistant response
      let assistantResponse = response.analysis;
      
      if (response.possibleConditions && response.possibleConditions.length > 0) {
        assistantResponse += "\n\nPossible conditions to consider:\n";
        response.possibleConditions.forEach((condition) => {
          assistantResponse += `• ${condition}\n`;
        });
      }
      
      if (response.recommendations && response.recommendations.length > 0) {
        assistantResponse += "\n\nRecommendations:\n";
        response.recommendations.forEach((rec) => {
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

  const toggleVoiceInput = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      toast.error("Voice recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setInput((prevInput) => prevInput + ' ' + speechResult.trim());
      stopRecording();
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      toast.error('Error recognizing voice. Please try again.');
      stopRecording();
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
    toast.info("Listening...", {
      description: "Speak clearly into your microphone"
    });
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
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
          className="resize-none min-h-[60px] flex-1 shadow-sm border-blue-100 dark:border-gray-700 focus-visible:ring-primary"
          disabled={isSubmitting}
        />
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={toggleVoiceInput}
            variant={isRecording ? "destructive" : "outline"}
            size="icon"
            className="self-end h-10 w-10 shadow-sm hover:shadow-md transition-shadow border-blue-100 dark:border-gray-700"
            disabled={isSubmitting}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || input.trim() === ''}
            className="self-end h-10 px-5 shadow-sm hover:shadow-md transition-shadow flex gap-2 items-center"
          >
            <span>Send</span>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};
