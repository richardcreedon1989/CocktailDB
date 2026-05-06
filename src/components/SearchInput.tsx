import type { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  value: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
};

const SearchInput = ({ value, setSearchTerm, onSearch }: SearchInputProps) => {
  return (
    <form
      className="search-input"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        placeholder="Search for cocktails..."
        value={value}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchInput;
