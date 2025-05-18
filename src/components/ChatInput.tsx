
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatContext } from '@/contexts/ChatContext';
import { analyzeSymptoms } from '@/services/chatService';
import { Mic, MicOff } from 'lucide-react';
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
    <div className="rounded-lg p-6 bg-black">
      <h2 className="text-xl font-bold text-white text-center mb-4">Health Care Center</h2>
      
      <div className="mb-4">
        <p className="text-gray-300 mb-2">Select Symptoms:</p>
        <Textarea
          placeholder="type symptoms such as itching, sleeping, aching etc."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none min-h-[60px] w-full bg-white text-black rounded-md mb-2"
          disabled={isSubmitting}
        />
      </div>

      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={toggleVoiceInput}
          variant="default"
          className={`${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white rounded-md px-4 py-2`}
          disabled={isSubmitting}
        >
          {isRecording ? (
            <>
              <MicOff className="h-4 w-4 mr-2" />
              Stop Speech Recognition
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Start Speech Recognition
            </>
          )}
        </Button>

        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || input.trim() === ''}
          className="bg-red-500 hover:bg-red-600 text-white rounded-md px-8 py-2 w-full"
        >
          Predict
        </Button>
      </div>
    </div>
  );
};
