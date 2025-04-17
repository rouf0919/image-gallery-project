interface ProductDetailsProps {
  details: string[];
}

export default function ProductDetails({ details }: ProductDetailsProps) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-sm font-medium text-gray-900">Highlights</h2>
      <div className="mt-4 space-y-6">
        <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}