import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
}

export const ErrorState = ({ message = "An error occurred. Please try again." }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-red-400 bg-red-950/20 rounded-xl border border-red-900/50 my-4 w-full max-w-2xl mx-auto">
      <AlertTriangle className="w-12 h-12 mb-4" />
      <p className="text-lg font-medium text-center">{message}</p>
    </div>
  );
};
