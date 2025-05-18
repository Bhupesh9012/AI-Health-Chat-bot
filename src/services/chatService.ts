
// This is a mock service that simulates responses from OpenAI
// In a real implementation, this would make actual API calls to your backend
// which would then interact with OpenAI

import { sleep } from '@/lib/utils';

export interface SymptomRequest {
  symptoms: string;
  duration?: string;
  severity?: string;
  additionalInfo?: string;
}

export interface ChatResponse {
  analysis: string;
  possibleConditions?: string[];
  recommendations?: string[];
  shouldConsultDoctor: boolean;
}

const mockResponses: Record<string, ChatResponse> = {
  headache: {
    analysis: "Headaches can have many causes ranging from stress and dehydration to more serious conditions.",
    possibleConditions: [
      "Tension headache",
      "Migraine",
      "Dehydration",
      "Eye strain",
      "Sinus infection"
    ],
    recommendations: [
      "Rest in a quiet, dark room",
      "Stay hydrated",
      "Try over-the-counter pain relievers if appropriate",
      "Apply a cold or warm compress"
    ],
    shouldConsultDoctor: false
  },
  fever: {
    analysis: "Fever is often a sign that your body is fighting an infection. The severity and duration are important factors to consider.",
    possibleConditions: [
      "Common cold",
      "Flu",
      "COVID-19",
      "Urinary tract infection",
      "Strep throat"
    ],
    recommendations: [
      "Rest and stay hydrated",
      "Take acetaminophen or ibuprofen as directed to reduce fever",
      "Monitor temperature regularly"
    ],
    shouldConsultDoctor: true
  },
  cough: {
    analysis: "A cough can be caused by various conditions affecting your respiratory system.",
    possibleConditions: [
      "Common cold",
      "Allergies",
      "Bronchitis",
      "Asthma",
      "Post-nasal drip"
    ],
    recommendations: [
      "Stay hydrated",
      "Use a humidifier",
      "Try honey for soothing (if over 1 year old)",
      "Avoid irritants like smoke"
    ],
    shouldConsultDoctor: false
  },
  "chest pain": {
    analysis: "Chest pain can be caused by various conditions, from minor issues to serious medical emergencies. It's important to take chest pain seriously.",
    possibleConditions: [
      "Muscle strain",
      "Anxiety or panic attack",
      "Acid reflux",
      "Angina",
      "Myocardial infarction (heart attack)"
    ],
    recommendations: [
      "If severe, sudden, or accompanied by shortness of breath, seek emergency medical attention immediately"
    ],
    shouldConsultDoctor: true
  },
  "stomach pain": {
    analysis: "Abdominal pain can be caused by many conditions, from temporary digestive issues to more serious problems.",
    possibleConditions: [
      "Indigestion",
      "Gas or bloating",
      "Constipation",
      "Stomach virus",
      "Food poisoning",
      "Appendicitis"
    ],
    recommendations: [
      "Try to rest and avoid solid foods temporarily",
      "Stay hydrated",
      "Use a heating pad for comfort"
    ],
    shouldConsultDoctor: false
  }
};

export const analyzeSymptoms = async (request: SymptomRequest): Promise<ChatResponse> => {
  // Simulate API delay
  await sleep(2000);
  
  // Simple keyword matching for the mock
  const symptomLower = request.symptoms.toLowerCase();
  
  // Check if any key words match in our mock database
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (symptomLower.includes(keyword)) {
      return {
        ...response,
        // Add more context based on duration if provided
        analysis: request.duration 
          ? `${response.analysis} You've mentioned experiencing this for ${request.duration}, which is ${
              request.duration.includes("week") || request.duration.includes("month") 
                ? "a significant duration and might require medical attention."
                : "relatively recent. Monitor your symptoms for any changes."
            }`
          : response.analysis
      };
    }
  }
  
  // Default response if no matching symptoms
  return {
    analysis: "Based on the symptoms you've described, I don't have enough information to provide specific guidance. It's always best to consult with a healthcare professional for a proper diagnosis.",
    possibleConditions: [],
    recommendations: [
      "Keep track of your symptoms and when they occur",
      "Note any factors that seem to worsen or improve your condition",
      "Consider consulting with a healthcare provider for proper evaluation"
    ],
    shouldConsultDoctor: true
  };
};

// List of available doctors (mock data)
export const getDoctors = async () => {
  await sleep(1000);
  
  return [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Practice',
      location: 'City Medical Center',
      availability: 'Today',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Internal Medicine',
      location: 'Westside Health Clinic',
      availability: 'Tomorrow',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      location: 'Children\'s Health Center',
      availability: 'Today',
      image: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Dr. James Wilson',
      specialty: 'Cardiology',
      location: 'Heart & Vascular Institute',
      availability: 'Next Week',
      image: '/placeholder.svg'
    }
  ];
};
