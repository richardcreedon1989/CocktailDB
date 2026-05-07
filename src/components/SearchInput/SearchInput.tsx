import { useState } from "react";
import "./SearchInput.scss";

const className = "c-SearchInput";

type SearchInputProps = {
  initialValue: string;
  onSearch: (searchTerm: string) => void;
};

const SearchInput = ({ initialValue, onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const isSearchDisabled = searchTerm.trim().length === 0;

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(searchTerm);
      }}
    >
      <input
        className={`${className}__input`}
        type="text"
        placeholder="Search for cocktails..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        className={`${className}__button`}
        type="submit"
        disabled={isSearchDisabled}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
