import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-6 bg-red-50/90 backdrop-blur-md border-2 border-red-200 rounded-xl flex items-start gap-3 my-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5 animate-pulse" />
      <div>
        <h4 className="font-medium text-red-800">Registration Error</h4>
        <p className="text-red-600 text-sm">{message}</p>
      </div>
    </div>
  );
}
