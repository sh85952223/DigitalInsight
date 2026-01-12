import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import CyberBackground from './components/CyberBackground';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [experimentResult, setExperimentResult] = useState(null);

  const handleRecordResult = (result) => {
    setExperimentResult(result);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setExperimentResult(null);
  };

  return (
    <>
      <CyberBackground />
      <div className="scanlines" />
      <div className="vignette" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepOne
              key="step1"
              onNext={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              key="step2"
              onNext={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              key="step3"
              onNext={() => setCurrentStep(4)}
              onRecordResult={handleRecordResult}
            />
          )}

          {currentStep === 4 && (
            <StepFour
              key="step4"
              result={experimentResult}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
