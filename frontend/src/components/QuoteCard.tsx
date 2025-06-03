import { Link } from "@tanstack/react-router";

type QuoteCardProps = {
  id: number;
  text: string;
  author: string;
};

export default function QuoteCard({ id, text, author }: QuoteCardProps) {
  const preview = text.length > 50 ? text.slice(0, 50) + "..." : text;

  return (
    <Link to="/quote/$id" params={{ id: id.toString() }}>
      <div
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
        <p className="italic text-[#0c1446]">"{preview}"</p>
        <p className="text-sm text-[#0c1446] mt-2 font-medium">— {author}</p>
      </div>
    </Link>
  );
}