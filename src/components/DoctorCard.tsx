
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    location: string;
    availability: string;
    image?: string;
  };
  onConnect: (doctorId: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onConnect }) => {
  // Get initials for the avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={doctor.image} alt={doctor.name} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(doctor.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{doctor.name}</CardTitle>
          <CardDescription>{doctor.specialty}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-1">
          <span className="font-medium text-foreground">Location:</span> {doctor.location}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Available:</span>{' '}
          <span className="text-green-600 dark:text-green-400">{doctor.availability}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onConnect(doctor.id)} 
          variant="outline" 
          className="w-full"
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};
