import { Link } from "@tanstack/react-router";

type QuoteCardProps = {
  id: number;
  text: string;
  author: string;
};

export default function QuoteCard({ id, text, author }: QuoteCardProps) {
  return (
    <Link to="/quote/$id" params={{ id: id.toString() }}>
      <div className="border rounded-lg p-4 shadow hover:bg-gray-50 transition">
        <p className="italic text-gray-600">"{text}"</p>
        <p className="text-sm text-gray-600 mt-2">— {author}</p>
      </div>
    </Link>
  );
}
