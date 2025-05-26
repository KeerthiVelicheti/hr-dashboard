type Props = { rating: number };

export default function RatingStars({ rating }: Props) {
  return (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < rating ? '★' : '☆'}</span>
      ))}
    </div>
  );
}
