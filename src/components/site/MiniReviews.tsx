import { CMSReview } from '@/types/cms';

type MiniReviewsProps = {
  reviews: CMSReview[];
};

export function MiniReviews({ reviews }: MiniReviewsProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mini-reviews">
      <p className="mini-reviews-label">O que quem comprou diz</p>
      {reviews.slice(0, 3).map((review) => (
        <div key={review.id} className="mini-review-item">
          <span className="rating mini-stars">{'★'.repeat(review.rating)}</span>
          <p className="mini-review-text">&ldquo;{review.text}&rdquo;</p>
          <p className="muted mini-review-author">— {review.author}</p>
        </div>
      ))}
    </div>
  );
}
