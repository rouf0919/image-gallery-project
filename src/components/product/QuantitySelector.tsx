import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface QuantitySelectorProps {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

export default function QuantitySelector({
  quantity,
  onDecrement,
  onIncrement,
}: QuantitySelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm text-gray-600">Quantity</h3>
      <div className="mt-2 flex items-center">
        <button
          onClick={onDecrement}
          className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <span className="mx-2 text-gray-700 w-8 text-center" aria-live="polite">
          {quantity}
        </span>
        <button
          onClick={onIncrement}
          className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
          disabled={quantity >= 10}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}