
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PrivacyNoticeProps {
  onDismiss: () => void;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ onDismiss }) => {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Important Health Notice</CardTitle>
        <CardDescription>Please read before using HealthChat</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          This AI health assistant is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
        </p>
        <p className="text-sm">
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        <p className="text-sm font-semibold">
          For medical emergencies, please call your local emergency services immediately.
        </p>
        <Button onClick={onDismiss} className="w-full">
          I understand
        </Button>
      </CardContent>
    </Card>
  );
};
