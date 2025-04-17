import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

export default function ExpandableSection({
  title,
  children,
  expanded,
  onToggle,
}: ExpandableSectionProps) {
  return (
    <div className="py-4">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full text-left focus:outline-none"
        aria-expanded={expanded}
      >
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        {expanded ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {expanded && (
        <div className="mt-2 text-sm text-gray-600 transition-all duration-200">
          {children}
        </div>
      )}
    </div>
  );
}