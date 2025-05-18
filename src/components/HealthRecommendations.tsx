
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, Dumbbell, Pill, Utensils } from "lucide-react";

interface HealthRecommendationsProps {
  condition?: string;
  recommendations?: {
    medications?: Array<{name: string, dosage: string, frequency: string, notes?: string}>;
    diet?: Array<{meal: string, description: string}>;
    workout?: Array<{name: string, duration: string, frequency: string, description: string}>;
    images?: Array<{url: string, description: string}>;
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
    ],
    images: [
      { url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07", description: "Calming nature imagery" },
      { url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843", description: "Relaxation technique visualization" }
    ]
  } 
}) => {
  return (
    <Card className="w-full my-4 shadow-lg border-blue-100 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-t-lg">
        <CardTitle className="text-lg text-primary">{condition} Recommendations</CardTitle>
        <CardDescription>Suggested care plan based on your symptoms</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="medications">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="medications" className="data-[state=active]:shadow-md transition-all">
              <Pill className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="diet" className="data-[state=active]:shadow-md transition-all">
              <Utensils className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Diet</span>
            </TabsTrigger>
            <TabsTrigger value="workout" className="data-[state=active]:shadow-md transition-all">
              <Dumbbell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Exercise</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="data-[state=active]:shadow-md transition-all">
              <CalendarIcon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="medications" className="mt-4">
            <ScrollArea className="h-[280px] pr-4">
              {recommendations.medications && recommendations.medications.map((med, idx) => (
                <div key={idx} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary">{med.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Dosage:</span> {med.dosage}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Frequency:</span> {med.frequency}
                  </p>
                  {med.notes && (
                    <p className="text-sm text-muted-foreground mt-1 italic">
                      {med.notes}
                    </p>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                These medication recommendations are for informational purposes only. 
                Always consult with a healthcare provider before starting any medication.
              </p>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="diet" className="mt-4">
            <ScrollArea className="h-[280px] pr-4">
              {recommendations.diet && recommendations.diet.map((item, idx) => (
                <div key={idx} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary">{item.meal}</h4>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                This diet plan is a general recommendation. Individual dietary needs may vary
                based on personal health conditions and requirements.
              </p>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="workout" className="mt-4">
            <ScrollArea className="h-[280px] pr-4">
              {recommendations.workout && recommendations.workout.map((exercise, idx) => (
                <div key={idx} className="mb-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition-all bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                  <h4 className="font-semibold text-primary">{exercise.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Duration:</span> {exercise.duration} | 
                    <span className="font-medium ml-1">Frequency:</span> {exercise.frequency}
                  </p>
                  <p className="text-sm mt-1">{exercise.description}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-4">
                Start with light exercise and gradually increase intensity. 
                Consult a healthcare provider before beginning any new exercise program.
              </p>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="images" className="mt-4">
            <ScrollArea className="h-[280px] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.images && recommendations.images.map((image, idx) => (
                  <div key={idx} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                    <img 
                      src={image.url} 
                      alt={image.description}
                      className="w-full h-40 object-cover" 
                    />
                    <div className="p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                      <p className="text-xs text-muted-foreground">{image.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
