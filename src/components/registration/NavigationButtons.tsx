import { ChevronLeft, ChevronRight, CreditCard, Send } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  handleNext: () => void;
  isSubmitting: boolean;
  acceptedTerms: boolean;
  canProceedToNext: boolean;
}

export default function NavigationButtons({
  currentStep,
  handleBack,
  handleNext,
  isSubmitting,
  acceptedTerms,
  canProceedToNext,
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 px-6 py-3 bg-sage-100 text-sage-600 rounded-xl hover:bg-sage-200 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      )}

      {currentStep < 1 ? (
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceedToNext}
          className="ml-auto flex items-center gap-2 px-6 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={isSubmitting || !acceptedTerms}
          className="ml-auto flex items-center gap-2 px-8 py-3 bg-peach-400 text-white rounded-xl hover:bg-peach-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-display text-lg uppercase tracking-wider"
        >
          {isSubmitting ? 'Processing...' : 'Submit'}
          <Send className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
