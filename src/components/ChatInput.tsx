
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatContext } from '@/contexts/ChatContext';
import { analyzeSymptoms } from '@/services/chatService';
import { Mic, MicOff, Send } from 'lucide-react';
import { toast } from 'sonner';
import axios from "axios";
import ReactMarkdown from 'react-markdown';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, setIsTyping } = useChatContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPermissionDenied, setIsPermissionDenied] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [response, setResponse] = useState("");
  const [loading,setloading]=useState(false);
  const [conversationContext, setConversationContext] = useState<{role: string, content: string}[]>([]);
  const [awaitingFollowUp, setAwaitingFollowUp] = useState(false);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

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
      // Focus back on textarea after submission
      textareaRef.current?.focus();
    }
  };

  const apiKey= import.meta.env.VITE_GEMINI_API_KEY;
  console.log("thisis the api", apiKey)

  const handleSend = async () => {
  if (!input.trim()) return;
  setloading(true);
  
  const patientInput = input.trim();
  addMessage('user', patientInput);
  setConversationContext(prev => [...prev, { role: 'user', content: patientInput }]);
  setInput("");

  // Build full prompt with history
  const historyText = conversationContext.map(msg => `${msg.role === 'user' ? "Patient" : "Doctor"}: ${msg.content}`).join('\n');

  const prompt = `
You are Dr. Nova, a smart, caring virtual doctor.
Respond with both:
1. An empathetic, medically correct response to the symptoms.
2. One or two relevant follow-up questions if needed.

Avoid redundant intros like "Based on your symptoms..."
Avoid disclaimers like "I am an AI..."
Speak as a real human doctor would.

${historyText}
Patient: ${patientInput}
Doctor:
  `;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = res.data.candidates[0]?.content?.parts[0]?.text || "No response.";
    
    addMessage("assistant", reply);
    setConversationContext(prev => [...prev, { role: 'assistant', content: reply }]);
    setResponse(reply);

    // If reply contains follow-up question(s), set flag
    if (/(\?)/.test(reply)) {
      setAwaitingFollowUp(true);
    } else {
      setAwaitingFollowUp(false);
    }
  } catch (error) {
    console.error("Gemini error:", error);
    const errMsg = "Sorry, I couldn't connect right now.";
    setResponse(errMsg);
    addMessage("assistant", errMsg);
  }

  setloading(false);
};


  const toggleVoiceInput = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        // Request microphone permission first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsPermissionDenied(false);
        startRecording();
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setIsPermissionDenied(true);
        toast.error("Microphone access denied. Please enable microphone access in your browser settings.");
      }
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
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
        
      setInput(transcript);
      
      // If final result
      if (event.results[0].isFinal) {
        stopRecording();
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        setIsPermissionDenied(true);
        toast.error('Microphone access denied. Please check your browser settings.');
      } else {
        toast.error(`Speech recognition error: ${event.error}`);
      }
      stopRecording();
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    try {
      recognition.start();
      setIsRecording(true);
      toast.info("Listening...", {
        description: "Speak clearly into your microphone"
      });
    } catch (err) {
      console.error("Error starting speech recognition:", err);
      toast.error("Failed to start voice recognition");
    }
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
    if (awaitingFollowUp) {
      handleSend(); // treat as follow-up answer
      setAwaitingFollowUp(false); // reset flag
    } else {
      handleSend(); // standard new input
    }
  }
};


  return (
    <div className="rounded-lg p-6 bg-gradient-to-b from-gray-900 to-black border border-gray-800 ">

      <h2 className="text-xl font-bold text-white text-center mb-4">Health Care Center</h2>
      
      <div className="mb-4 relative">
        <p className="text-gray-300 mb-2">Describe your symptoms:</p>
        <Textarea
          ref={textareaRef}
          placeholder="Type symptoms such as headache, fever, cough, etc."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="resize-none min-h-[80px] w-full bg-gray-800 text-white rounded-md mb-2 border-gray-700 focus:border-blue-500 transition-colors"
          disabled={isSubmitting}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <strong>Gemini:</strong>
         <div className='text-white' style={{ whiteSpace: "pre-wrap" }}>
    <ReactMarkdown>{response}</ReactMarkdown>
  </div>

      </div>

      <div className="flex space-x-3">
        <Button
          type="button"
          onClick={toggleVoiceInput}
          variant="outline"
          className={`${
            isRecording 
              ? 'bg-red-600 hover:bg-red-700 text-white border-red-500' 
              : isPermissionDenied
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border-gray-600'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
          } rounded-md px-4 py-2 flex-1`}
          disabled={isSubmitting}
        >
          {isRecording ? (
            <>
              <MicOff className="h-4 w-4 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              {isPermissionDenied ? "Microphone Denied" : "Start Voice Input"}
            </>
          )}
        </Button>

        <Button 
          onClick={handleSend}
          disabled={loading || input.trim() === ''}
          className="bg-green-600 hover:bg-green-700 text-white rounded-md px-8 py-2 flex-1 transition-colors flex items-center justify-center"
        >
          <Send className="h-4 w-4 mr-2" />
          Analyze Symptoms
        </Button>
      </div>
    </div>
  );
};
