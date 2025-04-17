import { SizeOption } from "@/types/product";
import { MinusIcon } from "@heroicons/react/24/outline";

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: SizeOption;
  onSelectSize: (size: SizeOption) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-gray-600">Size</h3>
        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Size guide
        </a>
      </div>
      <fieldset className="mt-2">
        <legend className="sr-only">Choose a size</legend>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {sizes.map((size) => (
            <label
              key={size.name}
              className={`relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none ${
                size.inStock
                  ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                  : 'cursor-not-allowed bg-gray-50 text-gray-200'
              } ${
                selectedSize.name === size.name ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <input
                type="radio"
                name="size-choice"
                value={size.name}
                checked={selectedSize.name === size.name}
                onChange={() => onSelectSize(size)}
                disabled={!size.inStock}
                className="sr-only"
                aria-labelledby={`size-${size.name}-label`}
              />
              <span id={`size-${size.name}-label`}>
                {size.name}
                {!size.inStock && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md border-2 border-gray-200 pointer-events-none"
                  >
                    <MinusIcon className="absolute inset-0 h-full w-full text-gray-200 transform rotate-45" />
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}