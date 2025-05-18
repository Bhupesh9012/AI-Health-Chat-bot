
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface HealthRecommendation {
  condition?: string;
  medications?: Array<{name: string, dosage: string, frequency: string, notes?: string}>;
  diet?: Array<{meal: string, description: string}>;
  workout?: Array<{name: string, duration: string, frequency: string, description: string}>;
  images?: Array<{url: string, description: string}>;
}

interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  currentRecommendation: HealthRecommendation | null;
  addMessage: (role: 'user' | 'assistant' | 'system', content: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  clearMessages: () => void;
  setCurrentRecommendation: (recommendation: HealthRecommendation | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm your health assistant. Please describe your symptoms, and I'll try to help you understand what might be happening.",
      timestamp: new Date(),
    },
  ]);
  
  const [isTyping, setIsTyping] = useState(false);
  const [currentRecommendation, setCurrentRecommendation] = useState<HealthRecommendation | null>(null);

  const addMessage = (role: 'user' | 'assistant' | 'system', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    // Generate recommendations based on keywords in the messages
    if (role === 'assistant') {
      generateRecommendationsFromContent(content);
    }
  };

  const generateRecommendationsFromContent = (content: string) => {
    const contentLower = content.toLowerCase();
    
    // Simple keyword matching to generate recommendations
    if (contentLower.includes('headache')) {
      setCurrentRecommendation({
        condition: 'Headache Relief',
        medications: [
          { name: 'Acetaminophen', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', notes: 'Do not exceed 4000mg per day' },
          { name: 'Ibuprofen', dosage: '200-400mg', frequency: 'Every 4-6 hours with food', notes: 'Avoid if you have stomach ulcers' }
        ],
        diet: [
          { meal: 'General', description: 'Stay hydrated with 8-10 glasses of water daily' },
          { meal: 'Foods to include', description: 'Magnesium-rich foods (spinach, nuts, seeds), Omega-3 fatty acids (fish)' },
          { meal: 'Foods to avoid', description: 'Caffeine, alcohol, aged cheeses, processed meats (potential triggers)' }
        ],
        workout: [
          { name: 'Gentle Stretching', duration: '5-10 minutes', frequency: 'As needed during headache', description: 'Focus on neck and shoulder stretches' },
          { name: 'Regular Exercise', duration: '30 minutes', frequency: '5 times per week', description: 'Moderate aerobic activity like walking or swimming' }
        ],
        images: [
          { url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843', description: 'Relaxation technique visualization' },
          { url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9', description: 'Calming imagery for stress reduction' }
        ]
      });
    } else if (contentLower.includes('fever') || contentLower.includes('flu')) {
      setCurrentRecommendation({
        condition: 'Fever & Flu Care',
        medications: [
          { name: 'Acetaminophen', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', notes: 'For fever reduction' },
          { name: 'Decongestant', dosage: 'As directed', frequency: 'As needed', notes: 'For nasal congestion' }
        ],
        diet: [
          { meal: 'Fluids', description: 'Clear broths, water, electrolyte drinks to prevent dehydration' },
          { meal: 'Light Foods', description: 'Toast, rice, bananas, applesauce when appetite returns' },
          { meal: 'Vitamins', description: 'Vitamin C rich foods like citrus fruits and leafy greens' }
        ],
        workout: [
          { name: 'Rest', duration: 'As much as possible', frequency: 'During acute illness', description: 'Allow your body to heal' },
          { name: 'Light Movement', duration: '5-10 minutes', frequency: 'When feeling better', description: 'Gentle stretching or short walks inside' }
        ],
        images: [
          { url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07', description: 'Calming imagery for rest' },
          { url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', description: 'Home care visualization' }
        ]
      });
    } else if (contentLower.includes('cough')) {
      setCurrentRecommendation({
        condition: 'Cough Management',
        medications: [
          { name: 'Dextromethorphan', dosage: 'As directed on package', frequency: 'Every 6-8 hours', notes: 'Cough suppressant for dry cough' },
          { name: 'Guaifenesin', dosage: 'As directed on package', frequency: 'Every 4 hours', notes: 'Expectorant for productive cough' }
        ],
        diet: [
          { meal: 'Fluids', description: 'Warm tea with honey (if over 1 year old), clear broths, water' },
          { meal: 'Soothing Foods', description: 'Smooth foods like yogurt, applesauce, warm soup' }
        ],
        workout: [
          { name: 'Breathing Exercises', duration: '5 minutes', frequency: '3-4 times daily', description: 'Deep breathing to clear airways' },
          { name: 'Rest', duration: 'As needed', frequency: 'Until cough improves', description: 'Avoid strenuous exercise' }
        ],
        images: [
          { url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', description: 'Rest and recovery' }
        ]
      });
    } else if (contentLower.includes('stomach') || contentLower.includes('digestive')) {
      setCurrentRecommendation({
        condition: 'Digestive Health',
        medications: [
          { name: 'Antacids', dosage: 'As directed', frequency: 'After meals and at bedtime', notes: 'For heartburn or indigestion' },
          { name: 'Probiotics', dosage: '1 capsule', frequency: 'Daily', notes: 'For gut health support' }
        ],
        diet: [
          { meal: 'BRAT Diet', description: 'Bananas, Rice, Applesauce, Toast for upset stomach' },
          { meal: 'Hydration', description: 'Clear liquids, herbal teas, electrolyte solutions' },
          { meal: 'Foods to Avoid', description: 'Spicy, fatty, acidic foods, caffeine, alcohol' }
        ],
        workout: [
          { name: 'Walking', duration: '15-20 minutes', frequency: 'Daily', description: 'Aids digestion after meals' },
          { name: 'Core Strengthening', duration: '10 minutes', frequency: '3 times weekly', description: 'Gentle exercises for abdominal muscles' }
        ],
        images: [
          { url: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04', description: 'Digestive comfort visualization' }
        ]
      });
    } else {
      // Default to null if no specific condition is detected
      setCurrentRecommendation(null);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: "Hello! I'm your health assistant. Please describe your symptoms, and I'll try to help you understand what might be happening.",
        timestamp: new Date(),
      },
    ]);
    setCurrentRecommendation(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        currentRecommendation,
        addMessage,
        setIsTyping,
        clearMessages,
        setCurrentRecommendation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
