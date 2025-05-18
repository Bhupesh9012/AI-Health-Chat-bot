
import React, { useEffect, useState } from 'react';
import { DoctorCard } from '@/components/DoctorCard';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useChatContext } from '@/contexts/ChatContext';
import { getDoctors } from '@/services/chatService';
import { toast } from 'sonner';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  availability: string;
  image?: string;
}

export const DoctorRecommendations: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { addMessage } = useChatContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleConnect = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      addMessage('system', `You've requested to connect with ${doctor.name}. In a real application, this would initiate a consultation request.`);
      toast.success(`Request sent to ${doctor.name}`, {
        description: "We'll notify you when they respond."
      });
    }
  };

  return (
    <div className="py-4">
      <h2 className="text-lg font-semibold mb-4">Recommended Doctors</h2>
      <Separator className="mb-4" />
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading doctors...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onConnect={handleConnect}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            These are example doctors. In a real application, recommendations would be based on your symptoms and location.
          </p>
        </>
      )}
    </div>
  );
};
