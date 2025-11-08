import { LucideIcon } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: { title: string; icon: LucideIcon }[];
}

export default function StepIndicator({
  currentStep,
  steps,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-nowrap overflow-x-auto md:overflow-visible px-4 md:px-0 py-2 md:py-0 -mx-4 md:mx-0 mb-8 md:mb-12">
      <div className="flex items-center justify-center md:justify-center min-w-full">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? 'bg-peach-400 text-white scale-110 shadow-lg'
                      : isCompleted
                      ? 'bg-sage-500 text-white'
                      : 'bg-sage-100 text-sage-400'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`mt-2 text-sm font-medium transition-colors duration-500 whitespace-nowrap ${
                    isActive
                      ? 'text-peach-400'
                      : isCompleted
                      ? 'text-sage-500'
                      : 'text-sage-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-1 mx-2 md:mx-4 rounded transition-all duration-500 flex-shrink-0 ${
                    index < currentStep ? 'bg-sage-500' : 'bg-sage-100'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
