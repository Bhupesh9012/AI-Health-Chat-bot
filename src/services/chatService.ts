
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
  medications?: {
    name: string;
    dosage: string;
    frequency: string;
    notes?: string;
  }[];
  diet?: {
    suggestions: string[];
    avoid: string[];
  };
  workout?: {
    type: string;
    duration: string;
    frequency: string;
    notes: string;
  }[];
}

const mockResponses: Record<string, ChatResponse> = {
  headache: {
    analysis: "Headaches can have many causes ranging from stress and dehydration to more serious conditions. Based on your description, this sounds like it might be a tension headache or possibly a migraine.",
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
      "Apply a cold or warm compress",
      "Practice relaxation techniques"
    ],
    shouldConsultDoctor: false,
    medications: [
      { name: "Acetaminophen", dosage: "500-1000mg", frequency: "Every 4-6 hours as needed", notes: "Do not exceed 4000mg per day" },
      { name: "Ibuprofen", dosage: "200-400mg", frequency: "Every 4-6 hours with food", notes: "Avoid if you have stomach ulcers" }
    ],
    diet: {
      suggestions: ["Magnesium-rich foods", "Water (at least 8 glasses per day)", "Ginger tea"],
      avoid: ["Caffeine", "Alcohol", "Processed foods", "Foods with MSG or nitrates"]
    },
    workout: [
      { type: "Neck stretches", duration: "5-10 minutes", frequency: "2-3 times daily", notes: "Gentle stretching to relieve tension" },
      { type: "Walking", duration: "20-30 minutes", frequency: "Daily", notes: "Light aerobic exercise can help reduce stress" }
    ]
  },
  fever: {
    analysis: "Fever is often a sign that your body is fighting an infection. The severity and duration are important factors to consider. Based on your description, this could be a viral infection like the flu.",
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
      "Monitor temperature regularly",
      "Use light clothing and bedding",
      "Take lukewarm baths if fever is high"
    ],
    shouldConsultDoctor: true,
    medications: [
      { name: "Acetaminophen", dosage: "500-1000mg", frequency: "Every 4-6 hours as needed", notes: "For fever reduction" },
      { name: "Ibuprofen", dosage: "200-400mg", frequency: "Every 4-6 hours with food", notes: "Alternate with acetaminophen if needed" }
    ],
    diet: {
      suggestions: ["Clear broths", "Water", "Electrolyte drinks", "Easy to digest foods when appetite returns"],
      avoid: ["Heavy, greasy foods", "Alcohol", "Caffeine"]
    },
    workout: [
      { type: "Rest", duration: "As needed", frequency: "Until fever resolves", notes: "Avoid exercise while feverish" },
      { type: "Light stretching", duration: "5 minutes", frequency: "As tolerated when fever is gone", notes: "Ease back into activity gradually" }
    ]
  },
  cough: {
    analysis: "A cough can be caused by various conditions affecting your respiratory system. Based on your description, this sounds like it could be an upper respiratory infection or possibly allergies.",
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
      "Avoid irritants like smoke",
      "Use cough drops for temporary relief"
    ],
    shouldConsultDoctor: false,
    medications: [
      { name: "Dextromethorphan", dosage: "As directed on package", frequency: "Every 6-8 hours", notes: "Cough suppressant for dry cough" },
      { name: "Guaifenesin", dosage: "As directed on package", frequency: "Every 4 hours", notes: "Expectorant for productive cough" }
    ],
    diet: {
      suggestions: ["Warm tea with honey", "Chicken soup", "Clear fluids", "Ginger tea"],
      avoid: ["Dairy products (can increase mucus production)", "Cold drinks"]
    },
    workout: [
      { type: "Deep breathing", duration: "5 minutes", frequency: "Several times daily", notes: "Helps clear airways" },
      { type: "Walking", duration: "10-15 minutes", frequency: "If feeling up to it", notes: "Light exercise if not feeling short of breath" }
    ]
  },
  "chest pain": {
    analysis: "Chest pain can be caused by various conditions, from minor issues to serious medical emergencies. It's important to take chest pain seriously. Based on your description, this requires immediate medical attention.",
    possibleConditions: [
      "Muscle strain",
      "Anxiety or panic attack",
      "Acid reflux",
      "Angina",
      "Myocardial infarction (heart attack)"
    ],
    recommendations: [
      "If severe, sudden, or accompanied by shortness of breath, seek emergency medical attention immediately",
      "Do not drive yourself to the hospital",
      "Chew an aspirin if advised by emergency services and not allergic"
    ],
    shouldConsultDoctor: true,
    medications: [
      { name: "Aspirin", dosage: "325mg", frequency: "Once (in emergency if advised)", notes: "Only if directed by healthcare provider" }
    ],
    diet: {
      suggestions: ["Heart-healthy diet if chronic", "Low-sodium foods", "Fruits and vegetables"],
      avoid: ["Fatty foods", "Excessive alcohol", "Caffeine"]
    },
    workout: [
      { type: "Rest", duration: "Until evaluated by doctor", frequency: "N/A", notes: "Avoid exercise until cleared by healthcare provider" }
    ]
  },
  "stomach pain": {
    analysis: "Abdominal pain can be caused by many conditions, from temporary digestive issues to more serious problems. Based on your description, this could be indigestion or possibly a mild stomach virus.",
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
      "Use a heating pad for comfort",
      "Try over-the-counter antacids if appropriate",
      "Monitor for worsening symptoms"
    ],
    shouldConsultDoctor: false,
    medications: [
      { name: "Antacid", dosage: "As directed on package", frequency: "After meals and at bedtime", notes: "For heartburn or indigestion" },
      { name: "Bismuth subsalicylate", dosage: "As directed on package", frequency: "Every 4 hours", notes: "For diarrhea or upset stomach" }
    ],
    diet: {
      suggestions: ["BRAT diet (bananas, rice, applesauce, toast)", "Clear broths", "Ginger ale or ginger tea"],
      avoid: ["Spicy foods", "Fatty foods", "Dairy", "Caffeine", "Alcohol"]
    },
    workout: [
      { type: "Rest", duration: "Until symptoms improve", frequency: "N/A", notes: "Avoid exercise during acute symptoms" },
      { type: "Walking", duration: "10 minutes", frequency: "After feeling better", notes: "Gentle movement can help digestive system" }
    ]
  },
  piles: {
  analysis: "Piles (hemorrhoids) are swollen veins in the lower rectum/anus caused by increased pressure. Common triggers include constipation, straining during bowel movements, pregnancy, or prolonged sitting.",
  possibleConditions: [
    "Internal hemorrhoids (usually painless but may bleed)",
    "External hemorrhoids (painful, itchy, may thrombose)",
    "Anal fissure (can mimic hemorrhoid symptoms)",
    "Rectal prolapse",
    "Rarely: Colorectal conditions needing medical evaluation"
  ],
  recommendations: [
    "Increase fiber intake to soften stools",
    "Use over-the-counter hemorrhoid creams for symptom relief",
    "Take warm sitz baths 2-3 times daily",
    "Avoid straining during bowel movements",
    "Keep the anal area clean (use moist wipes instead of dry toilet paper)"
  ],
  shouldConsultDoctor:false, 
  medications: [
    { 
      name: "Hydrocortisone cream (1%)", 
      dosage: "Apply thin layer", 
      frequency: "2-4 times daily", 
      notes: "Max 7 days unless directed by doctor" 
    },
    { 
      name: "Witch hazel pads (Tucks)", 
      dosage: "Apply as needed", 
      frequency: "3-4 times daily", 
      notes: "Natural astringent to reduce swelling" 
    },
    { 
      name: "Psyllium husk (Metamucil)", 
      dosage: "1-2 teaspoons", 
      frequency: "1-3 times daily with water", 
      notes: "Fiber supplement to prevent constipation" 
    }
  ],
  diet: {
    suggestions: [
      "High-fiber foods (whole grains, fruits, vegetables)",
      "Prunes or prune juice (natural laxative)",
      "Water (minimum 8 glasses/day)",
      "Flaxseeds or chia seeds"
    ],
    avoid: [
      "Spicy foods",
      "Alcohol (dehydrating)",
      "Processed foods low in fiber",
      "Excessive dairy (can cause constipation)"
    ]
  },
  workout: [
    { 
      type: "Kegel exercises", 
      duration: "5-10 minutes", 
      frequency: "Daily", 
      notes: "Strengthens pelvic floor muscles" 
    },
    { 
      type: "Walking", 
      duration: "20-30 minutes", 
      frequency: "Daily", 
      notes: "Promotes bowel regularity" 
    },
    { 
      type: "Yoga (Child's Pose, Legs-Up-the-Wall)", 
      duration: "10-15 minutes", 
      frequency: "3-4 times weekly", 
      notes: "Improves circulation to rectal area" 
    }
  ]
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
