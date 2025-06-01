import { Link } from "@tanstack/react-router";

type BookCardProps = {
  id: number;
  title: string;
  quoteCount: number;
};

export default function QuoteCard({ id, title, quoteCount }: BookCardProps) {
  return (
    <Link
      to={`/book/${id}`}
      className="border rounded-lg p-4 shadow hover:bg-gray-50 transition"
    >
      <h3 className="font-bold text-gray-600 text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{quoteCount} quotes</p>
    </Link>
  );
}
