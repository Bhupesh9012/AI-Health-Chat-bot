
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


// eslint-disable-next-line react-refresh/only-export-components
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
    
    // Map of conditions and their keywords
    const conditionKeywords: Record<string, string[]> = {
      'Headache': ['headache', 'migraine', 'head pain', 'tension headache'],
      'Fever': ['fever', 'high temperature', 'flu', 'chills'],
      'Cough': ['cough', 'coughing', 'throat', 'cold', 'respiratory'],
      'Digestive Issues': ['stomach', 'digestive', 'nausea', 'vomiting', 'diarrhea'],
      'Chest Pain': ['chest pain', 'chest', 'heart', 'cardiac'],
      'Allergies': ['allergy', 'allergic', 'sneezing', 'itchy', 'rash'],
      'Back Pain': ['back pain', 'back', 'spine', 'posture'],
      'Insomnia': ['sleep', 'insomnia', 'can\'t sleep', 'trouble sleeping', 'sleepless'],
      'Anxiety': ['anxiety', 'anxious', 'panic', 'stress', 'worried'],
      'Depression': ['depression', 'depressed', 'sad', 'low mood', 'hopeless'],
      'Piles': ['piles', 'hemorrhoids', 'piles pain', 'swollen veins', 'anal discomfort']
      // 'High Blood Pressure': ['hypertension', 'high blood pressure', 'elevated BP', 'blood pressure'],
      // 'Diabetes': ['diabetes', 'high blood sugar', 'hyperglycemia', 'insulin'],
      // 'Obesity': ['obesity', 'overweight', 'BMI', 'weight gain'],
      // 'Heart Disease': ['heart disease', 'cardiovascular', 'coronary artery', 'heart attack'],
      // 'High Cholesterol': ['high cholesterol', 'LDL', 'HDL', 'triglycerides'],
      // 'Sleep Apnea': ['sleep apnea', 'snoring', 'breathing during sleep', 'obstructive sleep apnea'],
      // 'Asthma': ['asthma', 'wheezing', 'shortness of breath', 'bronchospasm'],
      // 'Arthritis': ['arthritis', 'joint pain', 'inflammation', 'stiffness'],
      // 'Skin Rash': ['skin rash', 'dermatitis', 'eczema', 'hives'],
      // 'Fatigue': ['fatigue', 'tiredness', 'exhaustion', 'low energy']
    };
    
    // Check each condition's keywords against the content
    for (const [condition, keywords] of Object.entries(conditionKeywords)) {
      if (keywords.some(keyword => contentLower.includes(keyword))) {
        // We found a matching condition
        generateRecommendationForCondition(condition);
        return;
      }
    }
    
    // If no specific condition is detected
    setCurrentRecommendation(null);
  };
  
  const generateRecommendationForCondition = (condition: string) => {
    // Predefined recommendations for common conditions
    const recommendations: Record<string, HealthRecommendation> = {
      'Headache': {
        condition: 'Headache Relief',
        medications: [
          { name: 'Acetaminophen', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', notes: 'Do not exceed 4000mg per day' },
          { name: 'Ibuprofen', dosage: '200-400mg', frequency: 'Every 4-6 hours with food', notes: 'Avoid if you have stomach ulcers' },
          { name: 'Aspirin', dosage: '325-650mg', frequency: 'Every 4-6 hours as needed', notes: 'Not recommended for children under 12' }
        ],
        diet: [
          { meal: 'General', description: 'Stay hydrated with 8-10 glasses of water daily' },
          { meal: 'Foods to include', description: 'Magnesium-rich foods (spinach, nuts, seeds), Omega-3 fatty acids (fish)' },
          { meal: 'Foods to avoid', description: 'Caffeine, alcohol, aged cheeses, processed meats (potential triggers)' },
          { meal: 'Drinks', description: 'Herbal teas like peppermint or ginger can help with tension headaches' }
        ],
        workout: [
          { name: 'Gentle Stretching', duration: '5-10 minutes', frequency: 'As needed during headache', description: 'Focus on neck and shoulder stretches' },
          { name: 'Regular Exercise', duration: '30 minutes', frequency: '5 times per week', description: 'Moderate aerobic activity like walking or swimming' },
          { name: 'Yoga', duration: '15-30 minutes', frequency: '3-4 times per week', description: 'Poses that reduce tension and promote relaxation' }
        ]
      },
      'Fever': {
        condition: 'Fever & Flu Care',
        medications: [
          { name: 'Acetaminophen', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', notes: 'For fever reduction' },
          { name: 'Ibuprofen', dosage: '200-400mg', frequency: 'Every 4-6 hours with food', notes: 'Helps reduce fever and body aches' },
          { name: 'Decongestant', dosage: 'As directed', frequency: 'As needed', notes: 'For nasal congestion if present' }
        ],
        diet: [
          { meal: 'Fluids', description: 'Clear broths, water, electrolyte drinks to prevent dehydration' },
          { meal: 'Light Foods', description: 'Toast, rice, bananas, applesauce when appetite returns' },
          { meal: 'Vitamins', description: 'Vitamin C rich foods like citrus fruits and leafy greens' },
          { meal: 'Honey & Lemon', description: 'Warm water with honey and lemon can soothe throat and provide hydration' }
        ],
        workout: [
          { name: 'Rest', duration: 'As much as possible', frequency: 'During acute illness', description: 'Allow your body to heal' },
          { name: 'Light Movement', duration: '5-10 minutes', frequency: 'When feeling better', description: 'Gentle stretching or short walks inside' },
          { name: 'Return to Activity', duration: 'Gradual increase', frequency: 'After fever resolves', description: 'Start with light activity and gradually increase' }
        ]
      },
      'Cough': {
        condition: 'Cough Management',
        medications: [
          { name: 'Dextromethorphan', dosage: 'As directed on package', frequency: 'Every 6-8 hours', notes: 'Cough suppressant for dry cough' },
          { name: 'Guaifenesin', dosage: 'As directed on package', frequency: 'Every 4 hours', notes: 'Expectorant for productive cough' },
          { name: 'Honey', dosage: '1-2 teaspoons', frequency: 'As needed', notes: 'Natural cough reliever (not for children under 1 year)' }
        ],
        diet: [
          { meal: 'Fluids', description: 'Warm tea with honey (if over 1 year old), clear broths, water' },
          { meal: 'Soothing Foods', description: 'Smooth foods like yogurt, applesauce, warm soup' },
          { meal: 'Throat Soothing', description: 'Warm saltwater gargle can help with throat irritation' },
          { meal: 'Avoid', description: 'Cold drinks, dairy products, and spicy foods that may increase mucus' }
        ],
        workout: [
          { name: 'Breathing Exercises', duration: '5 minutes', frequency: '3-4 times daily', description: 'Deep breathing to clear airways' },
          { name: 'Rest', duration: 'As needed', frequency: 'Until cough improves', description: 'Avoid strenuous exercise' },
          { name: 'Steam Inhalation', duration: '5-10 minutes', frequency: '2-3 times daily', description: 'Inhale steam from hot water to loosen congestion' }
        ]
      },
      'Digestive Issues': {
        condition: 'Digestive Health',
        medications: [
          { name: 'Antacids', dosage: 'As directed', frequency: 'After meals and at bedtime', notes: 'For heartburn or indigestion' },
          { name: 'Probiotics', dosage: '1 capsule', frequency: 'Daily', notes: 'For gut health support' },
          { name: 'Loperamide', dosage: 'As directed', frequency: 'For diarrhea', notes: 'Not for children under 12 without medical advice' }
        ],
        diet: [
          { meal: 'BRAT Diet', description: 'Bananas, Rice, Applesauce, Toast for upset stomach' },
          { meal: 'Hydration', description: 'Clear liquids, herbal teas, electrolyte solutions' },
          { meal: 'Foods to Avoid', description: 'Spicy, fatty, acidic foods, caffeine, alcohol' },
          { meal: 'Small Meals', description: 'Eat smaller portions more frequently rather than large meals' }
        ],
        workout: [
          { name: 'Walking', duration: '15-20 minutes', frequency: 'Daily', description: 'Aids digestion after meals' },
          { name: 'Core Strengthening', duration: '10 minutes', frequency: '3 times weekly', description: 'Gentle exercises for abdominal muscles' },
          { name: 'Yoga', duration: '20 minutes', frequency: '3-4 times weekly', description: 'Poses that aid digestion and reduce bloating' }
        ]
      },
      'Chest Pain': {
        condition: 'Chest Pain - Seek Medical Help',
        medications: [
          { name: 'Aspirin', dosage: '325mg', frequency: 'Once (if advised by medical professional)', notes: 'Only if directed by healthcare provider' }
        ],
        diet: [
          { meal: 'Heart-Healthy Diet', description: 'Low in saturated fats, with plenty of fruits, vegetables, and whole grains' },
          { meal: 'Sodium Reduction', description: 'Limit salt intake to help control blood pressure' },
          { meal: 'Avoid Triggers', description: 'Identify and avoid foods that may trigger symptoms' }
        ],
        workout: [
          { name: 'Medical Clearance', duration: 'N/A', frequency: 'N/A', description: 'Consult a doctor before beginning any exercise program' },
          { name: 'Cardiac Rehab', duration: 'As prescribed', frequency: 'As prescribed', description: 'Follow a medically supervised program if recommended' }
        ]
      },
      'Allergies': {
        condition: 'Allergy Management',
        medications: [
          { name: 'Antihistamines', dosage: 'As directed', frequency: 'Daily or as needed', notes: 'For symptom relief' },
          { name: 'Nasal Spray', dosage: '1-2 sprays per nostril', frequency: 'As directed', notes: 'For nasal congestion' },
          { name: 'Eye Drops', dosage: '1-2 drops', frequency: 'As needed', notes: 'For itchy, watery eyes' }
        ],
        diet: [
          { meal: 'Identify Triggers', description: 'Keep a food diary to track potential food allergens' },
          { meal: 'Anti-inflammatory Foods', description: 'Fruits, vegetables, fatty fish, and nuts can help reduce inflammation' },
          { meal: 'Hydration', description: 'Stay well-hydrated to help thin mucus secretions' }
        ],
        workout: [
          { name: 'Indoor Exercise', duration: '30 minutes', frequency: 'During high pollen days', description: 'Exercise indoors when allergens are high outdoors' },
          { name: 'Swimming', duration: '30 minutes', frequency: '3-4 times weekly', description: 'Can help clear nasal passages and improve breathing' },
          { name: 'Post-Exercise Shower', duration: 'Immediately after outdoor exercise', frequency: 'Always', description: 'Rinse off allergens after being outdoors' }
        ]
      },
      'Back Pain': {
        condition: 'Back Pain Management',
        medications: [
          { name: 'Ibuprofen', dosage: '200-400mg', frequency: 'Every 4-6 hours with food', notes: 'For pain and inflammation' },
          { name: 'Acetaminophen', dosage: '500-1000mg', frequency: 'Every 4-6 hours as needed', notes: 'For pain relief' },
          { name: 'Muscle Relaxants', dosage: 'As prescribed', frequency: 'As prescribed', notes: 'Only when prescribed by a doctor' }
        ],
        diet: [
          { meal: 'Anti-inflammatory Foods', description: 'Fruits, vegetables, fatty fish, and nuts' },
          { meal: 'Calcium-Rich Foods', description: 'For bone health - dairy, fortified plant milks, leafy greens' },
          { meal: 'Weight Management', description: 'Maintain healthy weight to reduce stress on the spine' }
        ],
        workout: [
          { name: 'Core Strengthening', duration: '10-15 minutes', frequency: '3-4 times weekly', description: 'Focus on abdominal and back muscles' },
          { name: 'Gentle Stretching', duration: '5-10 minutes', frequency: 'Daily', description: 'Focus on lower back and hamstrings' },
          { name: 'Walking', duration: '20-30 minutes', frequency: 'Daily', description: 'Low-impact exercise to maintain mobility' }
        ]
      },
      'Insomnia': {
        condition: 'Sleep Improvement',
        medications: [
          { name: 'Melatonin', dosage: '1-3mg', frequency: '30-60 minutes before bedtime', notes: 'Short-term use only' },
          { name: 'Herbal Supplements', dosage: 'As directed', frequency: 'Before bedtime', notes: 'Valerian root, chamomile, or lavender' }
        ],
        diet: [
          { meal: 'Evening Habits', description: 'Avoid caffeine, alcohol, and heavy meals close to bedtime' },
          { meal: 'Calming Foods', description: 'Tart cherries, kiwi, fatty fish, nuts, and rice can promote sleep' },
          { meal: 'Hydration', description: 'Stay hydrated during the day but limit fluids before bed' }
        ],
        workout: [
          { name: 'Regular Exercise', duration: '30 minutes', frequency: 'Daily', description: 'But not within 2-3 hours of bedtime' },
          { name: 'Relaxation Techniques', duration: '10-15 minutes', frequency: 'Before bed', description: 'Progressive muscle relaxation, deep breathing' },
          { name: 'Yoga', duration: '15-20 minutes', frequency: 'Before bed', description: 'Gentle, restorative poses to promote relaxation' }
        ]
      },
      'Anxiety': {
        condition: 'Anxiety Management',
        medications: [
          { name: 'Herbal Supplements', dosage: 'As directed', frequency: 'As directed', notes: 'Valerian, chamomile, or lavender (consult healthcare provider)' }
        ],
        diet: [
          { meal: 'Complex Carbohydrates', description: 'Whole grains, oats, and sweet potatoes can boost serotonin' },
          { meal: 'Omega-3 Foods', description: 'Fatty fish, flaxseeds, and walnuts may help reduce anxiety' },
          { meal: 'Limit', description: 'Reduce caffeine, alcohol, and added sugars which can worsen anxiety' }
        ],
        workout: [
          { name: 'Aerobic Exercise', duration: '30 minutes', frequency: '5 times weekly', description: 'Walking, swimming, or cycling' },
          { name: 'Mindfulness Meditation', duration: '10-20 minutes', frequency: 'Daily', description: 'Focus on breathing and present moment' },
          { name: 'Yoga', duration: '30 minutes', frequency: '3-4 times weekly', description: 'Combines physical movement with breathwork' }
        ]
      },
      'Depression': {
        condition: 'Mood Support',
        medications: [
          { name: 'Consult Healthcare Provider', dosage: 'N/A', frequency: 'N/A', notes: 'Depression often requires professional treatment' }
        ],
        diet: [
          { meal: 'Mediterranean Diet', description: 'Focus on fruits, vegetables, whole grains, lean proteins, and healthy fats' },
          { meal: 'Omega-3 Foods', description: 'Fatty fish, flaxseeds, and walnuts may help improve mood' },
          { meal: 'Vitamin D', description: 'Fortified foods or safe sun exposure can help with mood regulation' }
        ],
        workout: [
          { name: 'Regular Exercise', duration: '30 minutes', frequency: '5 times weekly', description: 'Helps release endorphins and improve mood' },
          { name: 'Social Activities', duration: 'Varies', frequency: 'Several times weekly', description: 'Group exercise classes or team sports' },
          { name: 'Nature Walks', duration: '30-60 minutes', frequency: '3-4 times weekly', description: 'Combining exercise with nature exposure' }
        ]
      },
      'Piles': {
    condition: 'Piles (Hemorrhoids) Relief',
    medications: [
        {
            name: 'Hydrocortisone Cream',
            dosage: 'Apply thin layer',
            frequency: '2-4 times daily',
            notes: 'Do not use for more than 7 days unless directed by a doctor'
        },
        {
            name: 'Witch Hazel Pads',
            dosage: 'Apply as needed',
            frequency: '3-4 times daily',
            notes: 'Helps soothe itching and inflammation'
        },
        {
            name: 'Stool Softeners (Docusate Sodium)',
            dosage: '50-300mg',
            frequency: 'Once or twice daily',
            notes: 'Prevents straining during bowel movements'
        }
    ],
    diet: [
        {
            meal: 'General',
            description: 'High-fiber diet (25-30g per day) to prevent constipation'
        },
        {
            meal: 'Foods to include',
            description: 'Whole grains, fruits (berries, prunes), vegetables (broccoli, carrots), legumes (lentils, beans)'
        },
        {
            meal: 'Foods to avoid',
            description: 'Spicy foods, processed foods, excessive dairy, alcohol (can worsen symptoms)'
        },
        {
            meal: 'Drinks',
            description: 'Plenty of water (8-10 glasses/day), herbal teas (chamomile, aloe vera juice)'
        }
    ],
    workout: [
        {
            name: 'Kegel Exercises',
            duration: '5-10 minutes',
            frequency: 'Daily',
            description: 'Strengthens pelvic floor muscles and improves blood flow'
        },
        {
            name: 'Walking',
            duration: '20-30 minutes',
            frequency: 'Daily',
            description: 'Promotes digestion and reduces pressure on rectal veins'
        },
        {
            name: 'Yoga (Pelvic Relaxation Poses)',
            duration: '15-20 minutes',
            frequency: '3-4 times per week',
            description: 'Poses like Child’s Pose and Legs-Up-the-Wall help circulation'
        }
    ]
}
      
    };
    
    // Set the recommendation based on the condition
    setCurrentRecommendation(recommendations[condition] || null);
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
