
import React, { useState } from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import { Header } from '@/components/Header';
import { ChatContainer } from '@/components/ChatContainer';
import { ChatInput } from '@/components/ChatInput';
import { DoctorRecommendations } from '@/components/DoctorRecommendations';
import { InfoCard } from '@/components/InfoCard';
import { PrivacyNotice } from '@/components/PrivacyNotice';

const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  if (showPrivacyNotice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PrivacyNotice onDismiss={() => setShowPrivacyNotice(false)} />
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex flex-1 overflow-hidden">
          {/* Chat Section */}
          <div className="flex flex-col flex-1 h-full">
            <div className="flex-1 overflow-hidden">
              <ChatContainer />
            </div>
            <div className="p-4 border-t">
              <ChatInput />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="hidden md:block w-96 border-l overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              <InfoCard 
                title="How to use HealthChat" 
                description="Get the most out of your consultation"
              >
                <ul className="text-sm space-y-2">
                  <li>• Be specific about your symptoms</li>
                  <li>• Mention when symptoms started</li>
                  <li>• Note any medications you're taking</li>
                  <li>• Share relevant medical history</li>
                </ul>
              </InfoCard>
              
              <DoctorRecommendations />
              
              <InfoCard 
                title="Medical Disclaimer"
              >
                <p className="text-sm text-muted-foreground">
                  This AI assistant provides general information only and is not a substitute for professional medical advice. Always consult a healthcare provider for medical concerns.
                </p>
              </InfoCard>
            </div>
          </div>
        </main>
      </div>
    </ChatProvider>
  );
};

export default Index;
