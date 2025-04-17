import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ReviewsSectionProps {
  reviews?: [];
  reviewCount: number;
}

export default function ReviewsSection({
  reviews = [],
  reviewCount,
}: ReviewsSectionProps) {
  const displayedReviews = reviews.length > 0 ? reviews : [
    {
      rating: 5,
      title: "Most comfortable shoes ever!",
      content: "I've worn these shoes every day for a month and they're still as comfortable as the first day.",
      author: "Sarah J.",
      date: "August 12, 2023"
    },
  ];

  return (
    <div className="py-4">
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
        <div className="mt-4 space-y-6">
          {displayedReviews.map((review, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIconSolid
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm text-gray-700">{review.rating} stars</span>
              </div>
              <h4 className="mt-2 text-sm font-medium text-gray-900">{review.title}</h4>
              <p className="mt-2 text-sm text-gray-600">{review.content}</p>
              <p className="mt-2 text-sm text-gray-500">Posted by {review.author} on {review.date}</p>
            </div>
          ))}
          <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
            See all {reviewCount} reviews
          </button>
        </div>
      </div>
    </div>
  );
}