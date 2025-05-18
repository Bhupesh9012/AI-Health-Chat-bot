
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pill, Utensils, Dumbbell, Info, AlertTriangle, Heart } from "lucide-react";

interface HealthRecommendationsProps {
  condition?: string;
  recommendations?: {
    medications?: Array<{name: string, dosage: string, frequency: string, notes?: string}>;
    diet?: Array<{meal: string, description: string}>;
    workout?: Array<{name: string, duration: string, frequency: string, description: string}>;
  };
}

export const HealthRecommendations: React.FC<HealthRecommendationsProps> = ({ 
  condition = "General Health", 
  recommendations = {
    medications: [
      { name: "Vitamin D", dosage: "1000 IU", frequency: "Daily", notes: "With food for better absorption" },
      { name: "Multivitamin", dosage: "1 tablet", frequency: "Daily", notes: "Morning after breakfast" }
    ],
    diet: [
      { meal: "Breakfast", description: "Whole grain cereal with low-fat milk and fresh fruit" },
      { meal: "Lunch", description: "Lean protein (chicken or fish) with vegetables and whole grains" },
      { meal: "Dinner", description: "Vegetable soup with a side salad and whole grain bread" },
      { meal: "Snacks", description: "Nuts, yogurt, or fresh fruit" }
    ],
    workout: [
      { name: "Walking", duration: "30 minutes", frequency: "Daily", description: "Moderate pace, preferably outdoors" },
      { name: "Strength Training", duration: "20-30 minutes", frequency: "2-3 times per week", description: "Focus on major muscle groups with light weights" },
      { name: "Stretching", duration: "10 minutes", frequency: "Daily", description: "Gentle stretches for flexibility and stress relief" }
    ]
  } 
}) => {
  return (
    <div className="w-full my-4">
      <Tabs defaultValue="disease" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList className="bg-transparent grid grid-cols-3 gap-2">
            <TabsTrigger 
              value="disease" 
              className="rounded-md bg-gradient-to-r from-orange-400 to-orange-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span>Disease</span>
            </TabsTrigger>
            <TabsTrigger 
              value="description" 
              className="rounded-md bg-gradient-to-r from-blue-400 to-blue-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <Info className="h-4 w-4 mr-2" />
              <span>Description</span>
            </TabsTrigger>
            <TabsTrigger 
              value="precaution" 
              className="rounded-md bg-gradient-to-r from-purple-400 to-purple-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Precaution</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex justify-center mb-6">
          <TabsList className="bg-transparent grid grid-cols-3 gap-2">
            <TabsTrigger 
              value="medications" 
              className="rounded-md bg-gradient-to-r from-red-400 to-red-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <Pill className="h-4 w-4 mr-2" />
              <span>Medications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="workout" 
              className="rounded-md bg-gradient-to-r from-green-400 to-green-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <Dumbbell className="h-4 w-4 mr-2" />
              <span>Workouts</span>
            </TabsTrigger>
            <TabsTrigger 
              value="diet" 
              className="rounded-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold hover:opacity-90 px-6 py-2 border-none shadow-lg"
            >
              <Utensils className="h-4 w-4 mr-2" />
              <span>Diets</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="disease">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-orange-400 to-red-400">{condition}</CardTitle>
              <CardDescription>Details about the condition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">Information about {condition} and general guidance for managing this condition.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="description">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-blue-400 to-blue-600">Condition Description</CardTitle>
              <CardDescription>Understanding your condition</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">{condition} is a health condition that may affect your daily life. This section provides detailed information about what you might experience and how the condition typically progresses.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="precaution">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-purple-400 to-purple-600">Precautions</CardTitle>
              <CardDescription>Important steps to take</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200">For {condition}, it's recommended to follow these general precautions to help manage your symptoms and prevent complications.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-red-400 to-red-600">Recommended Medications</CardTitle>
              <CardDescription>Always consult with your doctor before taking any medication</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.medications && recommendations.medications.length > 0 ? (
                  recommendations.medications.map((med, idx) => (
                    <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800 border-gray-700 shadow-md hover:border-red-400 transition-colors">
                      <h4 className="font-semibold text-white">{med.name}</h4>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Dosage:</span> {med.dosage}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Frequency:</span> {med.frequency}
                      </p>
                      {med.notes && (
                        <p className="text-sm text-gray-300 mt-1 italic">
                          {med.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">No specific medication recommendations available for this condition.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diet">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-yellow-400 to-yellow-600">Diet Recommendations</CardTitle>
              <CardDescription>Nutritional guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.diet && recommendations.diet.length > 0 ? (
                  recommendations.diet.map((item, idx) => (
                    <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800 border-gray-700 shadow-md hover:border-yellow-400 transition-colors">
                      <h4 className="font-semibold text-white">{item.meal}</h4>
                      <p className="text-sm text-gray-300">{item.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">No specific diet recommendations available for this condition.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workout">
          <Card className="bg-gray-900 text-white border border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gradient-to-r from-green-400 to-green-600">Exercise Recommendations</CardTitle>
              <CardDescription>Physical activity plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.workout && recommendations.workout.length > 0 ? (
                  recommendations.workout.map((exercise, idx) => (
                    <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800 border-gray-700 shadow-md hover:border-green-400 transition-colors">
                      <h4 className="font-semibold text-white">{exercise.name}</h4>
                      <p className="text-sm text-gray-300">
                        <span className="font-medium">Duration:</span> {exercise.duration} | 
                        <span className="font-medium ml-1">Frequency:</span> {exercise.frequency}
                      </p>
                      <p className="text-sm mt-1 text-gray-300">{exercise.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 py-8">No specific workout recommendations available for this condition.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
