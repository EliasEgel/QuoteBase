import { Link } from "@tanstack/react-router";

type BookCardProps = {
  id: number;
  title: string;
  quoteCount: number;
};

export default function QuoteCard({ id, title, quoteCount }: BookCardProps) {
  return (
    <Link
      to="/book/$id"
      params={{ id: id.toString() }}
      className="rounded-lg p-4 shadow transition-colors"
        style={{
          backgroundColor: "#87aca3", // Seafoam background
          border: "1px solid #2b7c85", // Teal border
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#a6bfb7") // slightly lighter seafoam hover
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#87aca3")
        }
    >
      <h3 className="font-bold text-gray-600 text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{quoteCount} quotes</p>
    </Link>
  );
}
