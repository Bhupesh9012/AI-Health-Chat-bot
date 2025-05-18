
import React, { useState } from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import { Header } from '@/components/Header';
import { ChatContainer } from '@/components/ChatContainer';
import { ChatInput } from '@/components/ChatInput';
import { InfoCard } from '@/components/InfoCard';
import { PrivacyNotice } from '@/components/PrivacyNotice';

const Index = () => {
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);

  if (showPrivacyNotice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <PrivacyNotice onDismiss={() => setShowPrivacyNotice(false)} />
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-black">
        <Header />
        
        <main className="flex flex-1 overflow-hidden">
          {/* Chat Section */}
          <div className="flex flex-col flex-1 h-full">
            <div className="flex-1 overflow-hidden">
              <ChatContainer />
            </div>
            <div className="p-4 border-t bg-gray-900">
              <ChatInput />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="hidden md:block w-96 border-l overflow-y-auto p-4 bg-gray-900">
            <div className="space-y-4">
              <InfoCard 
                title="How to use Health Center" 
                description="Get the most out of your consultation"
              >
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Be specific about your symptoms
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Mention when symptoms started
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Note any medications you're taking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Share relevant medical history
                  </li>
                </ul>
              </InfoCard>
              
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
