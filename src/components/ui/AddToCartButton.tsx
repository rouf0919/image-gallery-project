import { ArrowPathIcon } from '@heroicons/react/24/outline';

interface AddToCartButtonProps {
  inStock: boolean;
  loading: boolean;
  onClick: () => void;
}

export default function AddToCartButton({
  inStock,
  loading,
  onClick,
}: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
        !inStock || loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={!inStock || loading}
    >
      {loading ? (
        <>
          <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          Adding...
        </>
      ) : inStock ? 'Add to cart' : 'Out of stock'}
    </button>
  );
}