import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import CyberBackground from './components/CyberBackground';
import StepZero from './components/StepZero';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import StepFiveMedieval from './components/StepFiveMedieval';
import StepSix from './components/StepSix';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [experimentResult, setExperimentResult] = useState(null);

  // URL Hash Routing Listener - REMOVED for Production

  const handleRecordResult = (result) => {
    setExperimentResult(result);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setExperimentResult(null);
  };

  return (
    <>
      {currentStep !== 6 && (
        <>
          <CyberBackground />
          <div className="scanlines" />
          <div className="vignette" />
        </>
      )}

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Simple Dev Menu - PERSISTENT */}
        <div className="absolute top-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
          <select
            value={currentStep}
            onChange={(e) => setCurrentStep(Number(e.target.value))}
            className="bg-black text-cyan-500 border border-cyan-500 text-xs p-1"
          >
            <option value={0}>Step 0: Evolution (Intro)</option>
            <option value={1}>Step 1: Agent Briefing</option>
            <option value={2}>Step 2: Dark Patterns</option>
            <option value={3}>Step 3: Experiment</option>
            <option value={4}>Step 4: Result</option>
            <option value={5}>Step 5: Medieval Cafe</option>
            <option value={6}>Step 6: UI/UX Anatomy</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <StepZero
              key="step0"
              onNext={() => setCurrentStep(1)}
            />
          )}

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
              onNext={() => setCurrentStep(5)}
            />
          )}

          {currentStep === 5 && (
            <StepFiveMedieval
              key="step5"
              onNext={() => setCurrentStep(6)}
            />
          )}

          {currentStep === 6 && (
            <StepSix
              key="step6"
              onNext={() => alert("모든 과정 완료!")}
            />
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
