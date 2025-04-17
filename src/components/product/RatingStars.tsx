import { StarIcon } from '@heroicons/react/24/solid';

export default function RatingStars({
  rating,
  reviewCount,
  onReviewsClick,
  expanded,
}: {
  rating: number;
  reviewCount: number;
  onReviewsClick: () => void;
  expanded: boolean;
}) {
  return (
    <div className="mt-3">
      <div className="flex items-center">
        <div className="flex items-center" aria-label={`Rated ${rating} out of 5 stars`}>
          {[0, 1, 2, 3, 4].map((star) => (
            <StarIcon
              key={star}
              className={`h-5 w-5 flex-shrink-0 ${
                star < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={onReviewsClick}
          className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          aria-expanded={expanded}
        >
          {reviewCount} reviews
        </button>
      </div>
    </div>
  );
}