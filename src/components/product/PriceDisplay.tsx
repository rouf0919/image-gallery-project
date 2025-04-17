interface PriceDisplayProps {
  price: number;
}

export default function PriceDisplay({ price }: PriceDisplayProps) {
  return (
    <div className="mt-3">
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl text-gray-900">${price.toFixed(2)}</p>
    </div>
  );
}