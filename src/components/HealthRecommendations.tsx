
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pill, Utensils, Dumbbell } from "lucide-react";

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
      <div className="flex justify-center space-x-4 mb-6">
        <TabsList className="bg-transparent grid grid-cols-4 gap-2">
          <TabsTrigger 
            value="disease" 
            className="rounded-md bg-orange-400 text-black font-bold hover:bg-orange-500 px-6 py-2 border-none"
          >
            Disease
          </TabsTrigger>
          <TabsTrigger 
            value="description" 
            className="rounded-md bg-blue-400 text-black font-bold hover:bg-blue-500 px-6 py-2 border-none"
          >
            Description
          </TabsTrigger>
          <TabsTrigger 
            value="precaution" 
            className="rounded-md bg-purple-400 text-black font-bold hover:bg-purple-500 px-6 py-2 border-none"
          >
            Precaution
          </TabsTrigger>
          <TabsTrigger 
            value="medications" 
            className="rounded-md bg-red-400 text-black font-bold hover:bg-red-500 px-6 py-2 border-none"
          >
            <Pill className="h-4 w-4 mr-2" />
            <span>Medications</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="flex justify-center space-x-4">
        <TabsTrigger 
          value="workout" 
          className="rounded-md bg-green-400 text-black font-bold hover:bg-green-500 px-6 py-2 border-none"
        >
          <Dumbbell className="h-4 w-4 mr-2" />
          <span>Workouts</span>
        </TabsTrigger>
        <TabsTrigger 
          value="diet" 
          className="rounded-md bg-yellow-400 text-black font-bold hover:bg-yellow-500 px-6 py-2 border-none"
        >
          <Utensils className="h-4 w-4 mr-2" />
          <span>Diets</span>
        </TabsTrigger>
      </div>

      <Tabs defaultValue="medications" className="mt-6">
        <TabsContent value="disease">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Disease Information</CardTitle>
              <CardDescription>Details about the condition</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{condition}</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="description">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Condition Description</CardTitle>
              <CardDescription>Understanding your condition</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Detailed description about {condition} would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="precaution">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Precautions</CardTitle>
              <CardDescription>Important steps to take</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recommended precautions for {condition} would appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="medications">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Recommended Medications</CardTitle>
              <CardDescription>Always consult with your doctor before taking any medication</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.medications && recommendations.medications.map((med, idx) => (
                  <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800">
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
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diet">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Diet Recommendations</CardTitle>
              <CardDescription>Nutritional guidance</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.diet && recommendations.diet.map((item, idx) => (
                  <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800">
                    <h4 className="font-semibold text-white">{item.meal}</h4>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workout">
          <Card className="bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Exercise Recommendations</CardTitle>
              <CardDescription>Physical activity plan</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[280px] pr-4">
                {recommendations.workout && recommendations.workout.map((exercise, idx) => (
                  <div key={idx} className="mb-4 p-4 border rounded-lg bg-gray-800">
                    <h4 className="font-semibold text-white">{exercise.name}</h4>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium">Duration:</span> {exercise.duration} | 
                      <span className="font-medium ml-1">Frequency:</span> {exercise.frequency}
                    </p>
                    <p className="text-sm mt-1 text-gray-300">{exercise.description}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
