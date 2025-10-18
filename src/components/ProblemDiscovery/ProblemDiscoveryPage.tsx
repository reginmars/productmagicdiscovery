import React from 'react';
import ConversationalDiscovery from './ConversationalDiscovery';
import { ProblemDiscovery } from '../../types';

interface ProblemDiscoveryPageProps {
  onBack: () => void;
  onProceedToAnalysis: (discovery: ProblemDiscovery) => void;
}

const ProblemDiscoveryPage: React.FC<ProblemDiscoveryPageProps> = ({ 
  onBack, 
  onProceedToAnalysis 
}) => {
  return (
    <ConversationalDiscovery 
      onBack={onBack}
      onProceedToAnalysis={onProceedToAnalysis}
    />
  );
};

export default ProblemDiscoveryPage;
