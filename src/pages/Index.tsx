
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <PrivacyNotice onDismiss={() => setShowPrivacyNotice(false)} />
      </div>
    );
  }

  return (
    <ChatProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <Header />
        
        <main className="flex flex-1 overflow-hidden">
          {/* Chat Section */}
          <div className="flex flex-col flex-1 h-full">
            <div className="flex-1 overflow-hidden">
              <ChatContainer />
            </div>
            <div className="p-4 border-t bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
              <ChatInput />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="hidden md:block w-96 border-l overflow-y-auto p-4 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
            <div className="space-y-4">
              <InfoCard 
                title="How to use HealthChat" 
                description="Get the most out of your consultation"
                className="shadow-md hover:shadow-lg transition-all border-blue-100 dark:border-gray-700"
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
                className="shadow-md hover:shadow-lg transition-all border-blue-100 dark:border-gray-700"
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
