import { useState } from "react";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Search quotes..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-2 border rounded text-[#0c1446]"
        style={{ borderColor: "#175873" }}
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-white rounded transition-colors"
        style={{ backgroundColor: "#2b7c85" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#0c1446")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#2b7c85")
        }
      >
        Search
      </button>
    </div>
  );
}
