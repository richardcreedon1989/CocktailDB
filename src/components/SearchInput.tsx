import type { Dispatch, SetStateAction } from "react";

type SearchInputProps = {
  value: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const SearchInput = ({ value, setSearchTerm }: SearchInputProps) => {
  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Search for cocktails..."
        value={value}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </div>
  );
};

export default SearchInput;
