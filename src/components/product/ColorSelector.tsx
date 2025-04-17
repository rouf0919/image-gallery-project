import { ColorOption } from '@/types/product';

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelectColor,
}: ColorSelectorProps) {
  return (
    <div className="mt-6">
      <h3 className="text-sm text-gray-600">Color</h3>
      <fieldset className="mt-2">
        <legend className="sr-only">Choose a color</legend>
        <div className="flex items-center space-x-3">
          {colors.map((color) => (
            <label
              key={color.name}
              className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-2 ${
                selectedColor.name === color.name
                  ? color.selectedClass
                  : 'ring-transparent'
              }`}
            >
              <input
                type="radio"
                name="color-choice"
                value={color.name}
                checked={selectedColor.name === color.name}
                onChange={() => onSelectColor(color)}
                className="sr-only"
              />
              <span
                className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${color.class}`}
              />
              <span className="sr-only">{color.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}