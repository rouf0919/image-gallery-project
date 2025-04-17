import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SuccessMessageProps {
  show: boolean;
}

export default function SuccessMessage({ show }: SuccessMessageProps) {
  if (!show) return null;
  
  return (
    <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
      <CheckCircleIcon className="h-4 w-4 mr-1" />
      Added to cart
    </div>
  );
}